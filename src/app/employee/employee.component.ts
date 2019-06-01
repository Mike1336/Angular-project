import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpService } from '../emp.service';
import { ItemService } from '../item.service';
import { ActivatedRoute } from '@angular/router';
import { EmpItemsModalComponent } from '../emp-items-modal/emp-items-modal.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  public title = 'Сотрудник';
  public empId: number;
  public emp: IEmp;
  public items: any;
  public loading = false;
  public contentReady = false;
  @ViewChild('editModal') modal: EmpItemsModalComponent;
  constructor(private empService: EmpService, private itemService: ItemService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.empId = params.id;
    });
    this.getEmployee(this.empId);
  }
  public getEmployee(id: number) {
    this.loading = true;
    this.empService.getEmpById(id).subscribe(data => {
      this.title = `${data.fio} (${data.dep})`;
      this.emp = data;
      this.contentReady = true;
      this.loading = false;
    });
  }
  public showModal(item: any) {
    this.itemService.getItemsByType(item.type).subscribe( data => {
      this.items = data;
      this.items.forEach((element) => {
        if (element.name === item.modelName && element.empId === this.emp.id) {
          this.modal.currentItem = element;
        }
      });
    });
    this.modal.newEmpItem = item;
    this.modal.getItems(item.type);
    this.modal.empId = this.emp.id;
    this.modal.empFio = this.emp.fio;
    this.modal.show = true;
  }
  public editItem() {
    this.loading = true;
    const item = this.modal.newEmpItem;
    this.emp.items.forEach(element => {
      if (element.type === item.type) {
        element = item;
      }
    });
    this.empService.updateEmp(this.emp).subscribe(data => {
      this.getEmployee(this.empId);
      this.loading = false;
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
  items: [
    {
      type: string,
      modelId: number,
      modelName: string,
      date: string
    }
  ];
}
