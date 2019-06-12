import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../../../inventory/services/item.service';
import { EmpService } from '../../services/emp.service';

@Component({
  selector: 'app-emps-edit-modal',
  templateUrl: './emps-edit-modal.component.html'
})
export class EmpsEditModalComponent implements OnInit {

  @Output() empEdited = new EventEmitter<boolean>();
  @Output() empEditCanceled = new EventEmitter<boolean>();
  public show = false;
  public differentEmp = false;

  public editingEmp: IEmp = {
    id: null,
    fio: '',
    pos: '',
    dep: '',
    depLabel: '',
    startWorking: '',
    cat: '',
    catLabel: '',
  };

  public oldEmpName: string;
  public oldDep: string;
  public oldPos: string;
  public oldDate: string;
  public oldCategory: string;

  public departments: any;
  public categories: any;
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
      this.empService.updateEmp(this.editingEmp).subscribe();
      for (const key in this.empItems) {
        if (this.empItems.hasOwnProperty(key)) {
          this.itemService.updateItem(this.empItems[key]).subscribe();
        }
      }
      this.empEdited.emit(true);
      this.show = false;
  }
  public editCancel() {
    if (this.differentEmp) {
      this.empEditCanceled.emit(true);
    }
    this.show = false;
  }
  public checkFields() {
    if (this.editingEmp.fio !== this.oldEmpName ||
        this.editingEmp.dep !== this.oldDep ||
        this.editingEmp.pos !== this.oldPos ||
        this.editingEmp.startWorking !== this.oldDate ||
        this.editingEmp.cat !== this.oldCategory
      ) {
      this.differentEmp = true;
    } else {
      this.differentEmp = false;
    }
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
}
