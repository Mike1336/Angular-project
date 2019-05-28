import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../item.service';
import { EmpService } from '../emp.service';
import { ClrWizard } from '@clr/angular';

@Component({
  selector: 'app-item-wizard',
  templateUrl: './item-wizard.component.html',
  styleUrls: ['./item-wizard.component.scss']
})
export class ItemWizardComponent implements OnInit {
@ViewChild('wizard') wizard: ClrWizard;
@Output() itemAdded = new EventEmitter<boolean>();
public show = false;
public newItem: IItem = {
    id: null,
    name: '',
    serNumber: null,
    category: '',
    categoryLabel: '',
    emp: {
      id: null,
      fio: '',
    },
    date: '',
    status: '',
  };
public emps: IEmps;
public categories: any;

constructor(private itemService: ItemService, private empservice: EmpService) { }

ngOnInit() {
  this.empservice.getStaff().subscribe(data => {
    this.emps = data;
  });
  this.itemService.getCategories().subscribe(data => {
    this.categories = data;
  });
}
public resetWizardData() {
  this.wizard.reset();
  this.newItem.name = '';
  this.newItem.serNumber = null;
  this.newItem.category = '';
  this.newItem.categoryLabel = '';
  this.newItem.emp.fio = '';
  this.newItem.date = '';
  this.newItem.status = '';
}
public checkFields() {
  if (this.newItem.emp.fio === '') {
    this.newItem.date = '-';
  } else {
  for (const key in this.emps) {
      if (this.emps[key].fio === this.newItem.emp.fio) {
        this.newItem.emp.id = this.emps[key].id;
    }
  }
  const now = new Date();
  // двузначный формат, добавление 0 к однозначным
  const dd = String(now.getDate()).padStart(2, '0');
  // январь - нулевой месяц
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  const today = `${dd}.${mm}.${yyyy}`;
  this.newItem.date = today;
}
  this.itemService.getCategoryByName(this.newItem.category).subscribe(data => {
    this.newItem.categoryLabel = data[0].label;
    if (data) {
      this.itemService.addItem(this.newItem).subscribe(item => {
        this.itemAdded.emit(true);
        this.resetWizardData();
      });
    }
  });
}
}
interface IItem {
  id: number;
  name: string;
  serNumber: number;
  category: string;
  categoryLabel: string;
  emp: {
    id: number,
    fio: string,
  };
  date: string;
  status: string;
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
    { type: string, model: string, date: string },
  ];
}
