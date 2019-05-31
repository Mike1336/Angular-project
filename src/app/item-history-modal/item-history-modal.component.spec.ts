import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHistoryModalComponent } from './item-history-modal.component';

describe('ItemHistoryModalComponent', () => {
  let component: ItemHistoryModalComponent;
  let fixture: ComponentFixture<ItemHistoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemHistoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
