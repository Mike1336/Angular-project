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
 public searchField = '';
 public contentReady = false;
 public emptyCategoryContent: boolean;
 public emptySearchResult: boolean;
  constructor(private itemSevice: ItemService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.getAllCategories();
    this.route.params.subscribe(params => {
      this.filterBy = params.cat;
      // сохранение гет-параметра при смене категории
      if (this.searchField !== '') {
        this.appendParam();
      }
      this.getItemsOfCurrentCategory();
    });
    this.route.queryParams.subscribe(params => {
      if (params.keyword) {
        this.searchField = params.keyword;
        this.searchItems(this.searchField, this.filterBy);
     } else {
       // если гет-параметр отсутствует - выводим содержимое категории
      this.getItemsOfCurrentCategory();
     }
    });
  }
  public search() {
    if (this.searchField === '') {
      this.removeParam();
      this.getItemsOfCurrentCategory();
    } else {
      setTimeout(() => {
        this.appendParam();
      }, 500);
    }
  }
  // занесение в гет-параметр данные из поля
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
  public removeParam() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        keyword: undefined,
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
      data.length !== 0 ? this.emptyCategoryContent = false : this.emptyCategoryContent = true;
      this.emptySearchResult = false;
      this.contentReady = true;
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
      data.length !== 0 ? this.emptyCategoryContent = false : this.emptyCategoryContent = true;
      this.emptySearchResult = false;
      this.contentReady = true;
    });
  }
  public searchItems(queryString: string, category: string) {
    this.itemSevice.getItemsBySearchWord(queryString, category).subscribe(data => {
        Object.keys(data).length !== 0 ? this.emptySearchResult = false : this.emptySearchResult = true;
        this.items = data;
        this.contentReady = true;
    });
  }
}
