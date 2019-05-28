import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWizardComponent } from './item-wizard.component';

describe('ItemWizardComponent', () => {
  let component: ItemWizardComponent;
  let fixture: ComponentFixture<ItemWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
