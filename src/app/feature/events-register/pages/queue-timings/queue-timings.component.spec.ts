import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueTimingsComponent } from './queue-timings.component';

describe('QueueTimingsComponent', () => {
  let component: QueueTimingsComponent;
  let fixture: ComponentFixture<QueueTimingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueueTimingsComponent]
    });
    fixture = TestBed.createComponent(QueueTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
