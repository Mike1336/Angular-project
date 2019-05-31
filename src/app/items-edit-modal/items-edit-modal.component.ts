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
    empId: null,
    empFio: '',
    date: '',
    status: '',
    history: [],
  };
  public emps: any;
  public categories: any;
  public itemName: string;

  constructor(private itemService: ItemService, private empService: EmpService) { }

  ngOnInit() {
    this.getEmps();
  }
  public getEmps() {
    this.empService.getStaff().subscribe(data => {
      this.emps = data;
    });
  }
  // метод, скрывающий уже выбранную категорию из списка выбора
  public displayCategories() {
    this.itemService.getCategories().subscribe(data => {
      this.categories = data;
      this.categories.forEach((element, index) => {
        if (element.name === this.editingItem.category) {
          this.categories.splice(index, 1);
        }
      });
    });
  }
  public editItem() {
    if (this.editingItem.empFio === '') {
      this.deleteItemFromEmp(this.editingItem.empId);
      this.editingItem.empId = null;
      this.editingItem.date = '-';
    } else {
    for (const key in this.emps) {
        if (this.emps[key].fio === this.editingItem.empFio) {
          this.editingItem.empId = this.emps[key].id;
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
    this.addItemToEmp(this.editingItem.empId);
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
  public deleteItemFromEmp(id: number) {
    this.empService.getEmpById(id).subscribe(data => {
      for (const key in data.items) {
          if (data.items[key].type === this.editingItem.type) {
            data.items[key].modelId = null;
            data.items[key].modelName = '-';
            data.items[key].date = '-';
          }
      }
      this.empService.updateEmp(data).subscribe(data => {
      });
    });
  }
  public addItemToEmp(id: number) {
    this.empService.getEmpById(id).subscribe(data => {
      for (const key in data.items) {
          if (data.items[key].type === this.editingItem.type) {
            data.items[key].modelId = this.editingItem.id;
            data.items[key].modelName = this.editingItem.name;
            data.items[key].date = this.editingItem.date;
          }
      }
      this.empService.updateEmp(data).subscribe(data => {
      });
    });
  }
  public checkEmps(category: string) {
    this.displayCategories();
    this.getEmps();
    this.itemService.getCategoryByName(category).subscribe(data => {
      // проход по сотрудникам
      this.emps.forEach((emp, empIndex) => {
      // проход по свойству единиц у итерируемого сотрудника
        emp.items.forEach(empItem => {
      // проверка есть ли у него уже единица из выбранной категории
          if (empItem.type === data[0].itemLabel && empItem.modelId !== null) {
      // удаление из списка выбора сотрудников для закрепления
          this.emps.splice(empIndex, 1);
          }
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
