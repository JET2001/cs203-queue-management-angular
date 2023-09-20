import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueTimingsComponent } from './queue-timings.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('QueueTimingsComponent', () => {
  let component: QueueTimingsComponent;
  let fixture: ComponentFixture<QueueTimingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueueTimingsComponent],
      imports: [SharedModule]
    });
    fixture = TestBed.createComponent(QueueTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
