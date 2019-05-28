import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpWizardComponent } from './emp-wizard.component';

describe('EmpWizardComponent', () => {
  let component: EmpWizardComponent;
  let fixture: ComponentFixture<EmpWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
