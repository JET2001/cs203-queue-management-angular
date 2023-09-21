import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPreviewComponent } from './registration-preview.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';

describe('RegistrationPreviewComponent', () => {
  let component: RegistrationPreviewComponent;
  let fixture: ComponentFixture<RegistrationPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationPreviewComponent, HeaderComponent, TextButtonComponent]
    });
    fixture = TestBed.createComponent(RegistrationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
