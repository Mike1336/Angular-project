import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './inventory/components/items/items.component';
import { EmployeesComponent } from './staff/components/employees/employees.component';
import { EmployeeComponent } from './staff/components/employee/employee.component';
import { ItemComponent } from './inventory/components/item/item.component';
import { NotFoundComponent } from './layout/components/not-found/not-found.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeBackendService } from './backend/fake-backend.service';
import { SearchFieldComponent } from './layout/components/search-field/search-field.component';
import { NavbarLeftComponent } from './layout/components/navbar-left/navbar-left.component';
import { ItemWizardComponent } from './inventory/components/item-wizard/item-wizard.component';
import { ItemHistoryModalComponent } from './inventory/components/item-history-modal/item-history-modal.component';
import { ItemsEditModalComponent } from './inventory/components/items-edit-modal/items-edit-modal.component';
import { EmpWizardComponent } from './staff/components/emp-wizard/emp-wizard.component';
import { EmpsEditModalComponent } from './staff/components/emps-edit-modal/emps-edit-modal.component';
import { EmpItemsModalComponent } from './staff/components/emp-items-modal/emp-items-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    EmployeesComponent,
    EmployeeComponent,
    ItemComponent,
    NotFoundComponent,
    SearchFieldComponent,
    NavbarLeftComponent,
    ItemWizardComponent,
    ItemHistoryModalComponent,
    EmpWizardComponent,
    ItemsEditModalComponent,
    EmpsEditModalComponent,
    EmpItemsModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(FakeBackendService),
    ClarityModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
