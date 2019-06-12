import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../inventory/services/item.service';
import { EmpService } from '../../../staff/services/emp.service';


@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html'
})
export class NavbarLeftComponent implements OnInit {
  public categories: any;
  public departments: any;

  constructor(private itemSevice: ItemService, private empService: EmpService) { }

  ngOnInit() {
    this.getAllCategories();
    this.getAllDeps();
  }
  public getAllCategories() {
    this.itemSevice.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
  public getAllDeps() {
    this.empService.getDepartments().subscribe(data => {
      this.departments = data;
    });
  }
}
