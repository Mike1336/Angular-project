import { Component, OnInit } from '@angular/core';
import { EmpService } from '../emp.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
 public title = 'Сотрудники | Главная страница';
 public staff: any;
 public departments: any;
 public filterBy: string;
 public searchField = '';
 public contentReady = false;
  constructor(private empservice: EmpService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.getAllDeps();
    this.route.params.subscribe(params => {
      this.filterBy = params.dep;
      if (this.searchField !== '') {
        this.appendParam();
      }
      this.getEmpsOfCurrentDep();
    });
    this.route.queryParams.subscribe(params => {
      if (params.keyword) {
        this.searchField = params.keyword;
        this.searchEmps(params.keyword, this.filterBy);
     } else {
      this.getEmpsOfCurrentDep();
     }
    });
  }
  public search() {
    if (this.searchField === '') {
      this.removeParam();
      this.getEmpsOfCurrentDep();
    } else {
    setTimeout(() => {
      this.appendParam();
    }, 500);
    }
  }
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
  public getEmpsOfCurrentDep() {
    this.filterBy !== 'all' ? this.getEmpsOfDep(this.filterBy) : this.getAllEmps();
  }

  public getAllEmps() {
    this.empservice.getStaff().subscribe(data => {
      this.staff = data;
      this.contentReady = true;
    });
  }
  public getAllDeps() {
    this.empservice.getDepartments().subscribe(data => {
      this.departments = data;
      this.contentReady = true;
    });
  }
  public getEmpsOfDep(dep: string) {
    this.empservice.getEmpsByDep(dep).subscribe(data => {
      this.staff = data;
      this.contentReady = true;
    });
  }
  public searchEmps(queryString: string, department: string) {
    this.empservice.getEmpsBySearchWord(queryString, department).subscribe(data => {
      this.staff = data;
      this.contentReady = true;
    });
  }
}
