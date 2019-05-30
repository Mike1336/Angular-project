import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsEditModalComponent } from './emps-edit-modal.component';

describe('EmpsEditModalComponent', () => {
  let component: EmpsEditModalComponent;
  let fixture: ComponentFixture<EmpsEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpsEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpsEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
