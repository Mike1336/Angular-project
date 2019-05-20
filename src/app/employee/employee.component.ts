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
  public emp: any[];
  public contentReady = false;
  constructor(private empservice: EmpService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getItem();
  }
  getItem() {
    this.empservice.getEmpById(this.route.params.value.id).subscribe(data => {
      this.title = `${data.fio} (${data.dep})`;
      this.emp = data;
      this.contentReady = true;
    });
  }
}
