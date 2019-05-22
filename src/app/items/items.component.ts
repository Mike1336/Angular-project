import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
 public title = 'Инвентарные единицы | Главная страница';
 public items: any;
 public categories: any;
 public filterBy: string;
 public contentReady = false;
 public emptyContent = false;
 public searchField = '';
//  public searchResult = true;
  constructor(private itemSevice: ItemService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.getAllCategories();
    this.route.params.subscribe(params => {
      this.filterBy = params.cat;
      if (this.searchField !== '') {
        this.appendParam();
      }
      this.getItemsOfCurrentCategory();
    });
    this.route.queryParams.subscribe(params => {
      if (params.keyword) {
        this.searchField = params.keyword;
        this.searchItems(params.keyword, this.filterBy);
     } else {
      // this.searchResult = true;
      this.getItemsOfCurrentCategory();
     }
    });
  }
  public search() {
    setTimeout(() => {
      this.appendParam();
    }, 500);
  }
  public appendParam() {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          keyword: this.searchField,
        },
        queryParamsHandling: 'merge',
        skipLocationChange: false,
        replaceUrl: false
      });
  }
  public getItemsOfCurrentCategory() {
    this.filterBy !== 'all' ? this.getItemsOfCategory(this.filterBy) : this.getAllItems();
  }
  public getAllItems() {
    this.itemSevice.getItems().subscribe(data => {
      this.items = data;
      this.contentReady = true;
      data.length !== 0 ? this.emptyContent = false : this.emptyContent = true;
    });
  }
  public getAllCategories() {
    this.itemSevice.getCategories().subscribe(data => {
      this.categories = data;
      this.contentReady = true;
    });
  }
  public getItemsOfCategory(category: string) {
    this.itemSevice.getItemsByCategory(category).subscribe(data => {
      this.items = data;
      data.length !== 0 ? this.emptyContent = false : this.emptyContent = true;
      this.contentReady = true;
    });
  }
  public searchItems(queryString: any, category?: string) {
    this.itemSevice.getItemsBySearchWord(queryString, category).subscribe(data => {
      this.items = data;
      this.contentReady = true;
      // this.items.length !== 0 ? this.searchResult = false : this.searchResult = true;
    });
  }
}
