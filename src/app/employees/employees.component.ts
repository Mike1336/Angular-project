import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpService } from '../emp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpWizardComponent } from '../emp-wizard/emp-wizard.component';
import { EmpsEditModalComponent } from '../emps-edit-modal/emps-edit-modal.component';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
 public title = 'Сотрудники | Главная страница';
 public staff: any;
 public departments: any;
 public filterBy: string;
 public currentDep: string;
 public searchField = '';
 public contentReady = false;
 @ViewChild('empWizard') empWizard: EmpWizardComponent;
 @ViewChild('editModal') modal: EmpsEditModalComponent;

  constructor(private empservice: EmpService, private itemService: ItemService, private route: ActivatedRoute, private router: Router) {}
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
    this.empservice.getStaff().subscribe(data => {
      this.staff = data;
      this.contentReady = true;
    });
  }

  public getEmpsOfDep(dep: string) {
    this.empservice.getEmpsByDep(dep).subscribe(data => {
      this.staff = data;
      this.contentReady = true;
    });
  }

  public getCurrentDepartment(depLabel: string) {
    this.empservice.getDepByLabel(depLabel).subscribe(data => {
      this.currentDep = `Отдел: ${data[0].name}`;
    });
  }

  public searchEmps(queryString: string, department: string) {
    this.empservice.getEmpsBySearchWord(queryString, department).subscribe(data => {
      this.staff = data;
      this.contentReady = true;
    });
  }
  public editEmp(index: number) {
    this.itemService.getItemsByEmpId(this.staff[index].id).subscribe(data => {
      this.modal.empItems = data;
    });
    this.modal.empName = this.staff[index].fio;
    this.modal.editingEmp = this.staff[index];
    this.modal.show = true;
  }
  public deleteEmp(id: number) {
    this.empservice.removeEmp(id).subscribe(data => {
      this.getEmpsOfCurrentDep();
    });
  }
}
