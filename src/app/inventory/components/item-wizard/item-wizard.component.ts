import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { EmpService } from '../../../staff/services/emp.service';
import { ClrWizard } from '@clr/angular';

@Component({
  selector: 'app-item-wizard',
  templateUrl: './item-wizard.component.html'
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
    type: '',
    empId: null,
    empFio: '',
    date: '',
    status: '',
    history: [],
  };
public emps: any;
public categories: any;
public itemId: number;

constructor(private itemService: ItemService, private empService: EmpService) { }

ngOnInit() {
  this.itemService.getCategories().subscribe(data => {
    this.categories = data;
  });
  this.itemService.getItems().subscribe(data => {
    this.itemId = data.length + 1;
  });
}
public resetWizardData() {
  this.wizard.reset();
  this.newItem.name = '';
  this.newItem.serNumber = null;
  this.newItem.category = '';
  this.newItem.categoryLabel = '';
  this.newItem.type = '';
  this.newItem.empId = null;
  this.newItem.empFio = '';
  this.newItem.date = '';
  this.newItem.status = '';
}
public checkFields() {
  if (this.newItem.empFio === '') {
    this.newItem.empId = null;
    this.newItem.date = '-';
  } else {
  for (const key in this.emps) {
      if (this.emps[key].fio === this.newItem.empFio) {
        this.newItem.empId = this.emps[key].id;
    }
  }
  const now = new Date();
  // двузначный формат, добавление 0 к однозначным
  const dd = String(now.getDate()).padStart(2, '0');
  // январь - нулевой месяц
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  const today = `${mm}/${dd}/${yyyy}`;
  this.newItem.date = today;
  this.addItemToEmp(this.newItem.empId);
}
  for (const key in this.categories) {
      if (this.categories[key].name === this.newItem.category) {
        this.newItem.categoryLabel = this.categories[key].label;
        this.newItem.type = this.categories[key].itemLabel;
    }
  }
  this.itemService.addItem(this.newItem).subscribe(data => {
    this.itemAdded.emit(true);
    this.resetWizardData();
  });
}
public addItemToEmp(id: number) {
  this.empService.getEmpById(id).subscribe(data => {
    for (const key in data.items) {
        if (data.items[key].type === this.newItem.type) {
          data.items[key].modelId = this.itemId;
          data.items[key].modelName = this.newItem.name;
          data.items[key].date = this.newItem.date;
        }
    }
    this.empService.updateEmp(data).subscribe();
  });
}
// при выборе категории исключаются сотрудники, у которых уже есть единицы данной категории,
// чтобы избежать переприсваиваний единиц сотрудникам
  public checkEmps(category: string) {
    this.empService.getStaff().subscribe(employees => {
      this.emps = [];
      this.itemService.getCategoryByName(category).subscribe(cat => {
        // проход по сотрудникам
        employees.forEach(emp => {
        // проход по свойству единиц у итерируемого сотрудника
            emp.items.forEach(empItem => {
        // проверка есть ли у него единица из выбранной категории
            if (empItem.type === cat[0].itemLabel && empItem.modelId === null) {
        // добавление в список выбора сотрудников
              this.emps.splice(this.emps.length, 0, emp);
            }
          });
        });
      });
    });
  }
}
interface IItem {
  id: number;
  name: string;
  serNumber: number;
  category: string;
  categoryLabel: string;
  type: string;
  empId: number;
  empFio: string;
  date: string;
  status: string;
  history: [];
}
