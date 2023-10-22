import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ViewEventInfoComponent } from './view-event-info.component';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ViewShowsComponent } from '../../components/view-shows/view-shows.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { MessageService } from 'primeng/api';
import { RouterTestingModule } from '@angular/router/testing';
import { MessagesModule } from 'primeng/messages';

describe('ViewEventInfoComponent', () => {
  let component: ViewEventInfoComponent;
  let fixture: ComponentFixture<ViewEventInfoComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewEventInfoComponent,
        TextButtonComponent,
        HeaderComponent,
        ViewShowsComponent,
      ],
      imports: [
        TableModule,
        InputTextModule,
        StepsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MessagesModule
      ],
      providers: [MessageService],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ViewEventInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
