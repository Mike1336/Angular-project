import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { EmpService } from '../../../staff/services/emp.service';

@Component({
  selector: 'app-items-edit-modal',
  templateUrl: './items-edit-modal.component.html'
})
export class ItemsEditModalComponent implements OnInit {
  @Output() itemEdited = new EventEmitter<boolean>();
  @Output() itemEditCanceled = new EventEmitter<boolean>();
  public show = false;
  public differentItem = false;
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
  public oldItemName: string;
  public oldItemNumber: number;
  public oldItemCategory: string;
  public oldItemType: string;
  public oldItemStatus: string;
  public oldEmpId: number;
  public oldEmpFio: string;
  public emps: any;
  public categories: any;
  constructor(private itemService: ItemService, private empService: EmpService) { }

  ngOnInit() {
    this.getEmps();
  }
  public getEmps() {
    this.empService.getStaff().subscribe(data => {
      this.emps = data;
    });
  }
  public displayCategories() {
    this.itemService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
  public editItem() {
        const now = new Date();
        // двузначный формат, добавление 0 к однозначным
        const dd = String(now.getDate()).padStart(2, '0');
        // январь - нулевой месяц
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const yyyy = now.getFullYear();
        const today = `${mm}/${dd}/${yyyy}`;
        // удаляем у единицы сведения о прошлом сотруднике если выбрано "не назначен" в селекторе единицы
        // иначе - меняем на сведения о новом сотруднике
        if (this.newItem.empFio === '') {
          if (this.oldEmpId !== null) {
            this.deleteItemFromEmp(this.oldEmpId);
          }
        } else {
          if (this.oldEmpId !== null && this.newItem.empFio !== this.oldEmpFio) {
            this.deleteItemFromEmp(this.oldEmpId);
          }
          this.emps.forEach(element => {
            if (element.fio === this.newItem.empFio) {
              this.newItem.empId = element.id;
              this.newItem.date = today;
              this.addItemToEmp(this.newItem.empId);
            }
          });
        }
        this.categories.forEach(element => {
          if (element.name === this.newItem.category) {
            this.newItem.categoryLabel = element.label;
            this.newItem.type = element.itemLabel;
          }
        });
        if (this.newItem.category !== this.oldItemCategory && this.oldEmpId !== null) {
          this.empService.getEmpById(this.oldEmpId).subscribe(emp => {
            emp.items.forEach(element => {
              if (element.type === this.oldItemType) {
                element.modelId = null;
                element.modelName = '-';
                element.date = '-';
              }
              if (element.type === this.newItem.type) {
                element.modelId = this.newItem.id;
                element.modelName = this.newItem.name;
                element.date = today;
              }
            });
            this.empService.updateEmp(emp).subscribe();
          });
        }
        this.itemService.updateItem(this.newItem).subscribe(data => {
        });
        this.itemEdited.emit(true);
        this.show = false;
  }
  public editCancel() {
    if (this.differentItem) {
      this.itemEditCanceled.emit(true);
      }
    this.show = false;
  }
  public addItemToEmp(id: number) {
    this.empService.getEmpById(id).subscribe(data => {
      data.items.forEach(element => {
        if (element.type === this.newItem.type) {
          element.modelId = this.newItem.id;
          element.modelName = this.newItem.name;
          element.date = this.newItem.date;
        }
      });
      this.empService.updateEmp(data).subscribe();
    });
  }
  public deleteItemFromEmp(id: number) {
    this.newItem.empId = null;
    this.newItem.date = '-';
    this.empService.getEmpById(id).subscribe(data => {
      data.items.forEach(element => {
        if (element.type === this.newItem.type) {
          element.modelId = null;
          element.modelName = '-';
          element.date = '-';
        }
      });
      this.empService.updateEmp(data).subscribe();
    });
  }
  public checkEmps(category: string) {
    this.getEmps();
    this.itemService.getCategoryByName(category).subscribe(cat => {
      // проход по сотрудникам
      this.emps.forEach((emp, empIndex) => {
      // проход по свойству единиц у итерируемого сотрудника
          emp.items.forEach(empItem => {
      // проверка есть ли у него единица из выбранной категории
          if (empItem.type === cat[0].itemLabel && empItem.modelId !== null) {
      // удаление из списка выбора сотрудников для закрепления
            this.emps.splice(empIndex, 1);
          }
        });
      });
    });
  }
  public checkFormValues() {
    if (this.newItem.name !== this.oldItemName ||
      this.newItem.serNumber !== this.oldItemNumber ||
      this.newItem.category !== this.oldItemCategory ||
      this.newItem.status !== this.oldItemStatus ||
      this.newItem.empFio !== this.oldEmpFio
      ) {
        this.differentItem = true;
      } else {
        this.differentItem = false;
      }
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
