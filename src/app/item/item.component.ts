import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  public title = 'Инвентарная единица';
  public item: any[];
  public contentReady = false;

  constructor(private itemservice: ItemService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getItem();
  }
  getItem() {
    this.itemservice.getItemById(this.route.params.value.id).subscribe(data => {
      this.title = `${data.type} ${data.name}`;
      this.item = data;
      this.contentReady = true;
    });
  }
}
