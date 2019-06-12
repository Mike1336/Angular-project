import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpService } from '../../services/emp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpWizardComponent } from '../emp-wizard/emp-wizard.component';
import { EmpsEditModalComponent } from '../emps-edit-modal/emps-edit-modal.component';
import { ItemService } from '../../../inventory/services/item.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {
 public title = 'Сотрудники | Главная страница';
 public staff: any;
 public departments: any;
 public filterBy: string;
 public currentDep: string;
 public searchField = '';
 public delEmp: IEmp = {
    id: null,
    fio: '',
    pos: '',
    dep: '',
    depLabel: '',
    startWorking: '',
    cat: '',
    catLabel: '',
    items: [],
  };
 public showDelModal = false;
 public loading = false;
 public contentReady = false;
 @ViewChild('empWizard') empWizard: EmpWizardComponent;
 @ViewChild('editModal') modal: EmpsEditModalComponent;

  constructor(private empService: EmpService, private itemService: ItemService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.filterBy = params.dep;
      params.dep === 'all' ? this.currentDep = 'Все отделы' : this.getCurrentDepartment(params.dep);

      if (this.searchField !== '') {
        this.appendParam();
      }
      this.getEmpsOfCurrentDep();
    });
    this.route.queryParams.subscribe(params => {
      if (params.keyword) {
        this.loading = true;
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
    this.loading = true;
    this.empService.getStaff().subscribe(data => {
      this.staff = data;
      this.contentReady = true;
      this.loading = false;
    });
  }

  public getEmpsOfDep(dep: string) {
    this.loading = true;
    this.empService.getEmpsByDep(dep).subscribe(data => {
      this.staff = data;
      this.contentReady = true;
      this.loading = false;
    });
  }

  public getCurrentDepartment(depLabel: string) {
    this.empService.getDepByLabel(depLabel).subscribe(data => {
      this.currentDep = `Отдел: ${data[0].name}`;
    });
  }

  public searchEmps(queryString: string, department: string) {
    this.empService.getEmpsBySearchWord(queryString, department).subscribe(data => {
      this.staff = data;
      this.contentReady = true;
      this.loading = false;
    });
  }
  public editEmp(index: number) {
    this.itemService.getItemsByEmpId(this.staff[index].id).subscribe(data => {
      this.modal.empItems = data;
    });

    this.modal.oldEmpName = this.staff[index].fio;
    this.modal.oldDep = this.staff[index].dep;
    this.modal.oldPos = this.staff[index].pos;
    this.modal.oldDate = this.staff[index].startWorking;
    this.modal.oldCategory = this.staff[index].cat;

    this.modal.editingEmp = this.staff[index];
    this.modal.differentEmp = false;
    this.modal.show = true;
  }
  public showRemoveModal(emp: IEmp) {
    this.delEmp = emp;
    this.showDelModal = true;
  }
  public deleteEmp() {
    this.showDelModal = false;
    this.loading = true;
    this.removeEmpFromItems(this.delEmp.id);
    this.empService.removeEmp(this.delEmp.id).subscribe(data => {
      this.getEmpsOfCurrentDep();
      this.loading = false;
    });
  }
  public removeEmpFromItems(id: number) {
    this.itemService.getItemsByEmpId(id).subscribe( data => {
      data.forEach(element => {
        element.empId = null;
        element.empFio = '';
        element.date = '-';
        this.itemService.updateItem(element).subscribe();
      });
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
  items: any;
}
