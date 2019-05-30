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
  public emp: IEmp;
  public contentReady = false;
  constructor(private empService: EmpService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.empId = params.id;
    });
    this.getEmployee(this.empId);
  }
  getEmployee(id: number) {
    this.empService.getEmpById(id).subscribe(data => {
      this.title = `${data.fio} (${data.dep})`;
      this.emp = data;
      console.log(this.emp);
      this.contentReady = true;
    });
  }
}

interface IEmp {
  id: number;
  fio: string;
  pos: string;
  dep: string;
  depLabel: string;
  startWorking: string;
  cat: string;
  catLabel: string;
  img: string;
  items: [
    { type: string,
      model: string,
      date: string
    }
  ];
}
