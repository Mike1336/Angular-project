import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClrWizard } from '@clr/angular';

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
 public showWizard = false;
 @ViewChild('wizard') wizard: ClrWizard;

  newItem: IItem = {
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
  constructor(private itemSevice: ItemService, private route: ActivatedRoute, private router: Router) {}
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
        this.searchField = params.keyword;
        this.searchItems(this.searchField, this.filterBy);
     } else {
       // если гет-параметр отсутствует - выводим содержимое категории
      this.getItemsOfCurrentCategory();
     }
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
      const now = new Date();
      // двузначный формат, добавление 0 к однозначным
      const dd = String(now.getDate()).padStart(2, '0');
      // январь - нулевой месяц
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const yyyy = now.getFullYear();
      const today = `${dd}.${mm}.${yyyy}`;
      this.newItem.date = today;
    }
    this.itemSevice.getCategoryByName(this.newItem.category).subscribe(data => {
      this.newItem.categoryLabel = data[0].label;
      if (data) {
        this.itemSevice.addItem(this.newItem).subscribe(item => {
          this.getItemsOfCurrentCategory();
        });
        this.resetWizardData();
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
    this.itemSevice.getItems().subscribe(data => {
      this.items = data;
      this.contentReady = true;
    });
  }
  public getItemsOfCategory(category: string) {
    this.itemSevice.getItemsByCategory(category).subscribe(data => {
      this.items = data;
      this.contentReady = true;
    });
  }
  public getCurrentCategory(categoryLabel: string) {
    this.itemSevice.getCategoryByLabel(categoryLabel).subscribe(data => {
      this.currentCategory = `Категория: ${data[0].name}`;
    });
  }
  public searchItems(queryString: string, category: string) {
    this.itemSevice.getItemsBySearchWord(queryString, category).subscribe(data => {
        this.items = data;
        this.contentReady = true;
    });
  }
  public deleteItem(id: number) {
    this.itemSevice.removeItem(id).subscribe(data => {
      this.getItemsOfCurrentCategory();
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
