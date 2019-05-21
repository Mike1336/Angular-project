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
  public itemId: number;
  public item: {};
  public contentReady = false;

  constructor(private itemService: ItemService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = params.id;
    });
    this.getItem(this.itemId);
  }
  getItem(id: number) {
    this.itemService.getItemById(id).subscribe(data => {
      this.title = `${data.category} ${data.name}`;
      this.item = data;
      console.log(this.item);
      this.contentReady = true;
    });
  }
}
