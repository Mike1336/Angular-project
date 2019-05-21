import { Component, OnInit } from '@angular/core';
import { EmpService } from '../emp.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  public title = 'Сотрудник';
  public empId: number;
  public emp: {};
  public contentReady = false;
  constructor(private empService: EmpService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.empId = params.id;
    });
    this.getItem(this.empId);
  }
  getItem(id: number) {
    this.empService.getEmpById(id).subscribe(data => {
      this.title = `${data.fio} (${data.dep})`;
      this.emp = data;
      this.contentReady = true;
    });
  }
}
