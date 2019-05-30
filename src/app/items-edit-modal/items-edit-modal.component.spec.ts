import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsEditModalComponent } from './items-edit-modal.component';

describe('ItemsEditModalComponent', () => {
  let component: ItemsEditModalComponent;
  let fixture: ComponentFixture<ItemsEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
