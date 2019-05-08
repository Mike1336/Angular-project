import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { EmployeesComponent } from './employees/employees.component';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { ItemComponent } from './item/item.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: 'inventory', component: ItemsComponent},
  {path: 'staff', component: EmployeesComponent},
  {path: '', redirectTo: 'inventory', pathMatch: 'full'},
  {path: 'item', component: ItemComponent},
  {path: 'employee', component: EmployeeComponent},
  {path: '**', component: NotFoundComponent}
 ];

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    EmployeesComponent,
    EmployeeComponent,
    ItemComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
