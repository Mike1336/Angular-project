import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';

import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmpWizardComponent } from './components/emp-wizard/emp-wizard.component';
import { EmpsEditModalComponent } from './components/emps-edit-modal/emps-edit-modal.component';
import { EmpItemsModalComponent } from './components/emp-items-modal/emp-items-modal.component';

import { EmpService } from './services/emp.service';

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeComponent,
    EmpWizardComponent,
    EmpsEditModalComponent,
    EmpItemsModalComponent,
  ],

  exports: [
    EmployeesComponent,
    EmployeeComponent,
    EmpWizardComponent,
    EmpsEditModalComponent,
    EmpItemsModalComponent,
  ],

  imports: [
    AppRoutingModule,
    CommonModule,
    ClarityModule,
    FormsModule,
    LayoutModule,
  ],

  providers: [
    EmpService
  ],
})
export class StaffModule { }
