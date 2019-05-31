import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpItemsModalComponent } from './emp-items-modal.component';

describe('EmpItemsModalComponent', () => {
  let component: EmpItemsModalComponent;
  let fixture: ComponentFixture<EmpItemsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpItemsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpItemsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
