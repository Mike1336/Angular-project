import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemWizardComponent } from '../item-wizard/item-wizard.component';
import { ItemsEditModalComponent } from '../items-edit-modal/items-edit-modal.component';
import { EmpService } from '../../../staff/services/emp.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html'
})
export class ItemsComponent implements OnInit {
 public title = 'Инвентарные единицы | Главная страница';
 public items: any;
 public filterBy: string;
 public currentCategory: string;
 public searchField = '';
 public delItem: IItem = {
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
 public contentReady = false;
 public loading = false;
 public showDelModal = false;
 @ViewChild('itemWizard') itemWizard: ItemWizardComponent;
 @ViewChild('editModal') modal: ItemsEditModalComponent;

  constructor(private itemService: ItemService, private empService: EmpService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.filterBy = params.cat;
      params.cat === 'all' ? this.currentCategory = 'Всё оборудование' : this.getCurrentCategory(params.cat);
      // сохранение гет-параметра при смене категории
      if (this.searchField !== '') {
        this.appendParam();
      }
      this.getItemsOfCurrentCategory();
    });
    this.route.queryParams.subscribe(params => {
      if (params.keyword) {
        this.loading = true;
        this.searchField = params.keyword;
        this.searchItems(this.searchField, this.filterBy);
     } else {
       // если гет-параметр отсутствует - выводим содержимое категории
      this.getItemsOfCurrentCategory();
     }
    });
  }
  public search() {
    if (this.searchField === '') {
      this.removeParam();
      this.getItemsOfCurrentCategory();
    } else {
      setTimeout(() => {
        this.appendParam();
      }, 500);
    }
  }
  // занесение в гет-параметр данные из поля
  public appendParam() {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          keyword: this.searchField,
        },
        queryParamsHandling: 'merge',
        skipLocationChange: false,
        replaceUrl: false
      });
  }
  public removeParam() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        keyword: undefined,
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false,
      replaceUrl: false
    });
  }
  public getItemsOfCurrentCategory() {
    this.filterBy !== 'all' ? this.getItemsOfCategory(this.filterBy) : this.getAllItems();
  }
  public getAllItems() {
    this.loading = true;
    this.itemService.getItems().subscribe(data => {
      this.items = data;
      this.contentReady = true;
      this.loading = false;
    });
  }
  public getItemsOfCategory(category: string) {
    this.loading = true;
    this.itemService.getItemsByCategory(category).subscribe(data => {
      this.items = data;
      this.contentReady = true;
      this.loading = false;
    });
  }
  public getCurrentCategory(categoryLabel: string) {
    this.itemService.getCategoryByLabel(categoryLabel).subscribe(data => {
      this.currentCategory = `Категория: ${data[0].name}`;
    });
  }
  public searchItems(queryString: string, category: string) {
    this.itemService.getItemsBySearchWord(queryString, category).subscribe(data => {
        this.items = data;
        this.contentReady = true;
        this.loading = false;
    });
  }
  public showEditModal(index: number) {
    this.modal.checkEmps(this.items[index].category);
    this.modal.displayCategories();

    this.modal.newItem = this.items[index];
    this.modal.differentItem = false;

    this.modal.oldItemName = this.items[index].name;
    this.modal.oldItemNumber = this.items[index].serNumber;
    this.modal.oldItemCategory = this.items[index].category;
    this.modal.oldItemType = this.items[index].type;
    this.modal.oldItemStatus = this.items[index].status;
    this.modal.oldEmpId = this.items[index].empId;
    this.modal.oldEmpFio = this.items[index].empFio;

    this.modal.show = true;
  }
  public showRemoveModal(item: any) {
    this.delItem = item;
    this.showDelModal = true;
  }
  public deleteItem() {
    this.showDelModal = false;
    this.loading = true;
    if (this.delItem.empId !== null) {
      this.deleteItemFromEmp(this.delItem.id);
    }
    this.itemService.removeItem(this.delItem.id).subscribe(data => {
      this.getItemsOfCurrentCategory();
      this.loading = false;
    });
  }
  public deleteItemFromEmp(itemId: number) {
    this.itemService.getItemById(itemId).subscribe( item => {
      this.empService.getEmpById(item.empId).subscribe(emps => {
        emps.items.forEach(element => {
          if (element.type === item.type) {
            element.modelId = null;
            element.modelName = '-';
            element.date = '-';
            this.empService.updateEmp(emps).subscribe();
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
