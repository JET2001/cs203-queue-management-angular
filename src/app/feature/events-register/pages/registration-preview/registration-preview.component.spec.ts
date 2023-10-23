import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RegistrationPreviewComponent } from './registration-preview.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';
import { MessagesModule } from 'primeng/messages';

describe('RegistrationPreviewComponent', () => {
  let component: RegistrationPreviewComponent;
  let fixture: ComponentFixture<RegistrationPreviewComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegistrationPreviewComponent,
        HeaderComponent,
        TextButtonComponent,
      ],
      imports: [HttpClientTestingModule, MessagesModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(RegistrationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
