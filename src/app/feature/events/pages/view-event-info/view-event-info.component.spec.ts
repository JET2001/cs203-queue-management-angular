import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventInfoComponent } from './view-event-info.component';

describe('ViewEventInfoComponent', () => {
  let component: ViewEventInfoComponent;
  let fixture: ComponentFixture<ViewEventInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEventInfoComponent]
    });
    fixture = TestBed.createComponent(ViewEventInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
