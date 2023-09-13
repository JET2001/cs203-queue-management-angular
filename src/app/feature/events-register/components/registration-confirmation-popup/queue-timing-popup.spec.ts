import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueTimingPopupComponent } from './queue-timing-popup';

describe('RegistrationConfirmationPopupComponent', () => {
  let component: QueueTimingPopupComponent;
  let fixture: ComponentFixture<QueueTimingPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueueTimingPopupComponent]
    });
    fixture = TestBed.createComponent(QueueTimingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
