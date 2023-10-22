import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { QueueTimingsComponent } from './queue-timings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('QueueTimingsComponent', () => {
  let component: QueueTimingsComponent;
  let fixture: ComponentFixture<QueueTimingsComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        QueueTimingsComponent,
        HeaderComponent,
      ],
      imports: [
        DropdownModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        SharedModule,
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(QueueTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
