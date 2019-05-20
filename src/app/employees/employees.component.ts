import { Component, OnInit } from '@angular/core';
import { EmpService } from '../emp.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
 public title = 'Сотрудники | Главная страница';
 public staff: any[];
 public contentReady = false;
  constructor(private empservice: EmpService) {}
  ngOnInit() {
    this.getAllEmps();
  }
  getAllEmps() {
    this.empservice.getStaff().subscribe(data => {
      this.staff = data;
      this.contentReady = true;
  });
}
}
