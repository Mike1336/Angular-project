import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss']
})
export class ItemModalComponent implements OnInit {
  public show = false;
  public create = false;
  public edit = false;
  public indexForEdit: number;
  public newItem: IItem;
  public newVisit = {
    reason: '',
    indate: '',
    outdate: '',
    serviceCenter: '',
  };

  @Output() itemAdded = new EventEmitter<boolean>();
  @Output() itemEdited = new EventEmitter<boolean>();
  @Output() itemEditCanceled = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public addItem() {
    const index = this.newItem.history.length;
    this.newItem.history.splice(index, 0, this.newVisit);
    this.itemAdded.emit(true);
    this.show = false;
  }
  public editItem() {
    this.newItem.history.splice(this.indexForEdit, 1, this.newVisit);
    this.itemEdited.emit(true);
    this.show = false;
  }
  public closeModal() {
    this.itemEditCanceled.emit(true);
    this.show = false;
    this.cleanForm();
  }
  public cleanForm() {
    this.newVisit = {
      reason: '',
      indate: '',
      outdate: '',
      serviceCenter: '',
    };
  }
  public showAction(action: string) {
    switch (action) {
      case 'create':
        this.create = true;
        this.edit = false;
        break;
      case 'edit':
        this.edit = true;
        this.create = false;
        break;
    }
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
