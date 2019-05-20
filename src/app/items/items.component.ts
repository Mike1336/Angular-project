import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
 public title = 'Инвентарные единицы | Главная страница';
 public items: any[];
 public contentReady = false;
  constructor(private itemservice: ItemService) {}

  ngOnInit() {
    this.getAllItems();
  }
  public getAllItems() {
    this.itemservice.getItems().subscribe(data => {
      this.items = data;
      this.contentReady = true;
    });
  }
}
