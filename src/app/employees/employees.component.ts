import { Component, OnInit } from '@angular/core';
import { EmpService } from '../emp.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
 public title = 'Сотрудники | Главная страница';
 public staff: any[];
 public departments: {};
 public filterBy: string;
 public contentReady = false;
  constructor(private empservice: EmpService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.getAllDeps();
    this.route.params.subscribe(params => {
      this.filterBy = params.dep;
      if (this.filterBy !== 'all') {
        this.getEmpsOfDep(this.filterBy);
      } else {
        this.getAllEmps();
      }
    });
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
}
