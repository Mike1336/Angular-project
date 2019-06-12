import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';

import { ItemsComponent } from './components/items/items.component';
import { ItemComponent } from './components/item/item.component';
import { ItemWizardComponent } from './components/item-wizard/item-wizard.component';
import { ItemsEditModalComponent } from './components/items-edit-modal/items-edit-modal.component';
import { ItemHistoryModalComponent } from './components/item-history-modal/item-history-modal.component';

import { ItemService } from './services/item.service';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemComponent,
    ItemWizardComponent,
    ItemsEditModalComponent,
    ItemHistoryModalComponent,
  ],

  exports: [
    ItemsComponent,
    ItemComponent,
    ItemWizardComponent,
    ItemsEditModalComponent,
    ItemHistoryModalComponent,
  ],

  imports: [
    AppRoutingModule,
    CommonModule,
    ClarityModule,
    FormsModule,
    LayoutModule,
  ],

  providers: [
    ItemService
  ],
})
export class InventoryModule { }
