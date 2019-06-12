import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InventoryModule } from './inventory/inventory.module';
import { StaffModule } from './staff/staff.module';
import { LayoutModule } from './layout/layout.module';

import { AppComponent } from './app.component';

import { FakeBackendService } from './backend/fake-backend.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(FakeBackendService),
    ClarityModule,
    InventoryModule,
    StaffModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
