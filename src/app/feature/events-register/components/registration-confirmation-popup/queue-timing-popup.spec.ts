import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueTimingPopupComponent } from './queue-timing-popup';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';

describe('QueueTimingPopupComponent', () => {
  let component: QueueTimingPopupComponent;
  let fixture: ComponentFixture<QueueTimingPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueueTimingPopupComponent, TextButtonComponent],
      imports: [SharedModule],
      providers: [NgbActiveModal]
    });
    fixture = TestBed.createComponent(QueueTimingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
