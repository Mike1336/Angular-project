import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { EmployeesComponent } from './employees/employees.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'inventory', component: ItemsComponent},
  {path: 'staff', component: EmployeesComponent},
  {path: '', redirectTo: 'inventory', pathMatch: 'full'},

  // {path: '**', component: LoginRouteComponent}
 ];

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    EmployeesComponent
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
