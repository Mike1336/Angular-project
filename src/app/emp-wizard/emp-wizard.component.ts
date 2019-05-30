import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { EmpService } from '../emp.service';
import { ClrWizard } from '@clr/angular';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-emp-wizard',
  templateUrl: './emp-wizard.component.html',
  styleUrls: ['./emp-wizard.component.scss']
})
export class EmpWizardComponent implements OnInit {
  @ViewChild('wizard') wizard: ClrWizard;
  @Output() empAdded = new EventEmitter<boolean>();
  public show = false;
  public newEmp: IEmp = {
    id: null,
    fio: '',
    pos: '',
    dep: '',
    depLabel: '',
    startWorking: '',
    cat: '',
    catLabel: '',
    img: 'assets/images/proger.jpg',
    items: [
      { type: 'Монитор', modelId: null, modelName: '-', date: '-' },
      { type: 'Моноблок', modelId: null, modelName: '-', date: '-' },
      { type: 'Ноутбук', modelId: null, modelName: '-', date: '-' },
      { type: 'Клавиатура', modelId: null, modelName: '-', date: '-' },
      { type: 'Мышь', modelId: null, modelName: '-', date: '-' },
      { type: 'Кресло', modelId: null, modelName: '-', date: '-' },
      { type: 'Стол', modelId: null, modelName: '-', date: '-' }
    ],
    };
  public departments: any;
  public categories: any;
  constructor(private empservice: EmpService, private itemService: ItemService) { }
  ngOnInit() {
    this.empservice.getDepartments().subscribe(data => {
      this.departments = data;
    });
    this.itemService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
  public resetWizardData() {
    this.wizard.reset();
    this.newEmp.fio = '';
    this.newEmp.pos = null;
    this.newEmp.dep = '';
    this.newEmp.depLabel = '';
    this.newEmp.startWorking = '';
    this.newEmp.cat = '';
    this.newEmp.catLabel = '';
  }
  public checkFields() {
    for (const key in this.departments) {
      if (this.departments[key].name === this.newEmp.dep) {
        this.newEmp.depLabel = this.departments[key].label;
    }
    }
    for (const key in this.categories) {
        if (this.categories[key].name === this.newEmp.cat) {
          this.newEmp.catLabel = this.categories[key].label;
      }
    }
    this.empservice.addEmp(this.newEmp).subscribe(data => {
      console.log(this.newEmp);
      this.empAdded.emit(true);
      this.resetWizardData();
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
  items: any;
}
