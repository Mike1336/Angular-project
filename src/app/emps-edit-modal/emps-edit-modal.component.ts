import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../item.service';
import { EmpService } from '../emp.service';

@Component({
  selector: 'app-emps-edit-modal',
  templateUrl: './emps-edit-modal.component.html',
  styleUrls: ['./emps-edit-modal.component.scss']
})
export class EmpsEditModalComponent implements OnInit {

  @Output() empEdited = new EventEmitter<boolean>();
  @Output() empEditCanceled = new EventEmitter<boolean>();
  public show = false;
  public editingEmp: IEmp = {
    id: null,
    fio: '',
    pos: '',
    dep: '',
    depLabel: '',
    startWorking: '',
    cat: '',
    catLabel: '',
    img: 'assets/images/proger.jpg',
  };
  public departments: any;
  public categories: any;
  public empName: string;
  public empItems: any;
  constructor(private itemService: ItemService, private empService: EmpService) { }

  ngOnInit() {
    this.empService.getDepartments().subscribe(data => {
      this.departments = data;
    });
    this.itemService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
  public editEmp() {
      for (const key in this.departments) {
          if (this.departments[key].name === this.editingEmp.dep) {
            this.editingEmp.depLabel = this.departments[key].label;
        }
      }
      for (const key in this.categories) {
          if (this.categories[key].name === this.editingEmp.cat) {
            this.editingEmp.catLabel = this.categories[key].label;
        }
      }
      for (const key in this.empItems) {
        if (this.empItems.hasOwnProperty(key)) {
          this.empItems[key].empFio = this.editingEmp.fio;
        }
      }
      this.empService.updateEmp(this.editingEmp).subscribe(data => {
      this.empEdited.emit(true);
      });
      for (const key in this.empItems) {
        if (this.empItems.hasOwnProperty(key)) {
          this.itemService.updateItem(this.empItems[key]).subscribe(data => {
          });
        }
      }
      this.show = false;
  }
  public editCancel() {
    this.empEditCanceled.emit(true);
    this.show = false;
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
}
