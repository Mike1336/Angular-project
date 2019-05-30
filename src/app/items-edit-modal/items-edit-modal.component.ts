import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../item.service';
import { EmpService } from '../emp.service';

@Component({
  selector: 'app-items-edit-modal',
  templateUrl: './items-edit-modal.component.html',
  styleUrls: ['./items-edit-modal.component.scss']
})
export class ItemsEditModalComponent implements OnInit {
  @Output() itemEdited = new EventEmitter<boolean>();
  @Output() itemEditCanceled = new EventEmitter<boolean>();
  public show = false;
  public editingItem: IItem = {
    id: null,
    name: '',
    serNumber: null,
    category: '',
    categoryLabel: '',
    type: '',
    emp: {
      id: null,
      fio: '',
    },
    date: '',
    status: '',
    history: [],
  };
  public emps: IEmps;
  public categories: any;
  public itemName: string;

  constructor(private itemService: ItemService, private empservice: EmpService) { }

  ngOnInit() {
    this.empservice.getStaff().subscribe(data => {
      this.emps = data;
    });
    this.itemService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
  public editItem() {
    if (this.editingItem.emp.fio === '') {
      this.editingItem.emp.id = null;
      this.editingItem.date = '-';
    } else {
    for (const key in this.emps) {
        if (this.emps[key].fio === this.editingItem.emp.fio) {
          this.editingItem.emp.id = this.emps[key].id;
      }
    }
    const now = new Date();
    // двузначный формат, добавление 0 к однозначным
    const dd = String(now.getDate()).padStart(2, '0');
    // январь - нулевой месяц
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    const today = `${mm}/${dd}/${yyyy}`;
    this.editingItem.date = today;
  }
    for (const key in this.categories) {
        if (this.categories[key].name === this.editingItem.category) {
          this.editingItem.categoryLabel = this.categories[key].label;
          this.editingItem.type = this.categories[key].itemLabel;
      }
    }
    this.itemService.updateItem(this.editingItem).subscribe(data => {
      this.itemEdited.emit(true);
    });
    this.show = false;
  }
  public editCancel() {
    this.itemEditCanceled.emit(true);
    this.show = false;
  }

}
interface IItem {
  id: number;
  name: string;
  serNumber: number;
  category: string;
  categoryLabel: string;
  type: string;
  emp: {
    id: number,
    fio: string,
  };
  date: string;
  status: string;
  history: [];
}
interface IEmps {
  id: number;
  fio: string;
  pos: string;
  dep: string;
  depLabel: string;
  startWorking: string;
  cat: string;
  catLabel: string;
  img: string;
  items: [
    { type: string, model: string, date: string }
  ];
}
