import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueRegistrationComponent } from './queue-registration.component';

describe('QueueRegistrationComponent', () => {
  let component: QueueRegistrationComponent;
  let fixture: ComponentFixture<QueueRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueueRegistrationComponent]
    });
    fixture = TestBed.createComponent(QueueRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
