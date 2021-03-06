import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { ActivatedRoute } from '@angular/router';
import { ItemHistoryModalComponent } from '../item-history-modal/item-history-modal.component';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {
  public title = 'Инвентарная единица';
  public itemId: number;
  public item: IItem;
  public visitIndex: number;
  public delVisit = {
    reason: '',
    indate: '',
    outdate: '',
    serviceCenter: ''
  };
  public contentReady = false;
  public loading = false;
  public showDelVisit = false;

  @ViewChild('modal') itemModal: ItemHistoryModalComponent;

  constructor(private itemService: ItemService, private route: ActivatedRoute) {}
  ngOnInit() {
      this.route.params.subscribe(params => {
        this.itemId = params.id;
      });
      this.getItem(this.itemId);
    }
  public getItem(id: number) {
      this.loading = true;
      this.itemService.getItemById(id).subscribe(data => {
        this.title = `${data.type} ${data.name}`;
        this.item = data;
        this.contentReady = true;
        this.loading = false;
      });
    }
  public showCreateModal() {
    this.itemModal.newItem = this.item;
    this.itemModal.show = true;
    this.itemModal.showAction('create');
  }
  public createItem() {
    this.loading = true;
    this.itemService.updateItem(this.itemModal.newItem).subscribe( data => {
      this.getItem(this.itemId);
      this.itemModal.cleanForm();
      this.loading = false;
    });
  }
  public showEditModal(itemIndex: number) {
    this.itemModal.indexForEdit = itemIndex;
    this.itemModal.newItem = this.item;
    this.itemModal.showAction('edit');

    this.itemModal.newVisit = this.item.history[itemIndex];
    this.itemModal.oldReason = this.item.history[itemIndex].reason;
    this.itemModal.oldIndate = this.item.history[itemIndex].indate;
    this.itemModal.oldOutdate = this.item.history[itemIndex].outdate;
    this.itemModal.oldService = this.item.history[itemIndex].serviceCenter;

    this.itemModal.differentVisit = false;
    this.itemModal.show = true;
  }
  public saveEdit() {
    this.loading = true;
    this.itemService.updateItem(this.itemModal.newItem).subscribe( data => {
      this.getItem(this.itemId);
      this.itemModal.cleanForm();
      this.loading = false;
    });
  }
  public showDelVisitModal(index: number) {
    this.visitIndex = index;
    this.delVisit = this.item.history[index];
    this.showDelVisit = true;
  }
  public deleteVisit() {
    this.loading = true;
    this.item.history.splice(this.visitIndex, 1);
    this.itemService.updateItem(this.item).subscribe( data => {
      this.getItem(this.itemId);
      this.loading = false;
    });
    this.showDelVisit = false;
  }
}
interface IItem {
  id: number;
  name: string;
  serNumber: number;
  type: string;
  empId: number;
  empFio: string;
  categoryLabel: string;
  date: string;
  status: string;
  history: [
    {
      reason: string,
      indate: string,
      outdate: string,
      serviceCenter: string,
    }
  ];
}
