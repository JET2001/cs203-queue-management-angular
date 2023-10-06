import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AccountCreationComponent } from './account-creation.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';
import { InputFieldComponent } from 'src/app/shared/components/input-field/input-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from '@myndmanagement/text-mask';

describe('AccountCreationComponent', () => {
  let component: AccountCreationComponent;
  let fixture: ComponentFixture<AccountCreationComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccountCreationComponent,
        HeaderComponent,
        TextButtonComponent,
        InputFieldComponent,
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, TextMaskModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AccountCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
