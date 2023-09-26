import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LandingPageComponent } from './landing-page.component';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { InputFieldComponent } from 'src/app/shared/components/input-field/input-field.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpcomingConcertsComponent } from '../../components/upcoming-concerts/upcoming-concerts.component';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingPageComponent, TextButtonComponent, CarouselComponent, InputFieldComponent, UpcomingConcertsComponent],
      imports: [SharedModule, HttpClientTestingModule, MessagesModule],
      providers: [MessageService]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
