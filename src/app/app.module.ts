import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employee/employee.component';
import { ItemComponent } from './item/item.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeBackendService } from './fake-backend.service';
import { SearchFieldComponent } from './search-field/search-field.component';
import { NavbarLeftComponent } from './navbar-left/navbar-left.component';
import { ItemWizardComponent } from './item-wizard/item-wizard.component';
import { EmpWizardComponent } from './emp-wizard/emp-wizard.component';
import { ItemModalComponent } from './item-modal/item-modal.component';
import { ItemsEditModalComponent } from './items-edit-modal/items-edit-modal.component';
import { EmpsEditModalComponent } from './emps-edit-modal/emps-edit-modal.component';

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
    EmpWizardComponent,
    ItemModalComponent,
    ItemsEditModalComponent,
    EmpsEditModalComponent,
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
