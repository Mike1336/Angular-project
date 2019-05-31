import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemWizardComponent } from '../item-wizard/item-wizard.component';
import { ItemsEditModalComponent } from '../items-edit-modal/items-edit-modal.component';
import { EmpService } from '../emp.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
 public title = 'Инвентарные единицы | Главная страница';
 public items: any;
 public filterBy: string;
 public currentCategory: string;
 public searchField = '';
 public contentReady = false;
 public loading = false;
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
  public editItem(index: number) {
    this.modal.itemName = this.items[index].name;
    this.modal.editingItem = this.items[index];
    this.modal.displayCategories();
    this.modal.checkEmps(this.items[index].category);
    this.modal.show = true;
  }
  public deleteItem(item: any) {
    this.loading = true;
    if (item.empId !== null) {
      this.deleteItemFromEmp(item.id);
    }
    this.itemService.removeItem(item.id).subscribe(data => {
      this.getItemsOfCurrentCategory();
    });
    this.loading = false;
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
