import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueTimingsComponent } from './queue-timings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';

describe('QueueTimingsComponent', () => {
  let component: QueueTimingsComponent;
  let fixture: ComponentFixture<QueueTimingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueueTimingsComponent],
      imports: [SharedModule, DropdownModule]
    });
    fixture = TestBed.createComponent(QueueTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
