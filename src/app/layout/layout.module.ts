import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

import { NavbarLeftComponent } from './components/navbar-left/navbar-left.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchFieldComponent } from './components/search-field/search-field.component';

@NgModule({
  declarations: [
    NavbarLeftComponent,
    NotFoundComponent,
    SearchFieldComponent,
  ],
  exports: [
    NavbarLeftComponent,
    NotFoundComponent,
    SearchFieldComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    ClarityModule,
    FormsModule,
  ]
})
export class LayoutModule { }
