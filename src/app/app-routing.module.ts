import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsComponent } from './items/items.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employee/employee.component';
import { ItemComponent } from './item/item.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'inventory', component: ItemsComponent },
  { path: 'staff', component: EmployeesComponent },
  { path: '', redirectTo: 'inventory', pathMatch: 'full' },
  { path: 'item/:id', component: ItemComponent },
  { path: 'employee/:id', component: EmployeeComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
