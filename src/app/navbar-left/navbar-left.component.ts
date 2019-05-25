import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { EmpService } from '../emp.service';


@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.scss']
})
export class NavbarLeftComponent implements OnInit {
  public categories: any;
  public departments: any;

  constructor(private itemSevice: ItemService, private empservice: EmpService) { }

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
    this.empservice.getDepartments().subscribe(data => {
      this.departments = data;
    });
  }
}
