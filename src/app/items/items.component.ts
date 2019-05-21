import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
 public title = 'Инвентарные единицы | Главная страница';
 public items: any[];
 public categories: {};
 public filterBy: string;
 public contentReady = false;
 public emptyContent = false;
  constructor(private itemSevice: ItemService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getAllCategories();
    this.route.params.subscribe(params => {
      this.filterBy = params.cat;
      if (this.filterBy !== 'all') {
        this.getItemsOfCategory(this.filterBy);
      } else {
        this.getAllItems();
      }
    });
  }

  public getAllItems() {
    this.itemSevice.getItems().subscribe(data => {
      this.items = data;
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
      if (data.length !== 0) {
        this.emptyContent = false;
        this.items = data;
      } else {
        this.emptyContent = true;
      }
      this.contentReady = true;
    });
  }
}
