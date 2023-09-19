import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRegistrationComponent } from './group-registration.component';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { GroupRegisterInviteComponent } from '../../components/group-register-invite/group-register-invite.component';
import { InputFieldComponent } from 'src/app/shared/components/input-field/input-field.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('GroupRegistrationComponent', () => {
  let component: GroupRegistrationComponent;
  let fixture: ComponentFixture<GroupRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupRegistrationComponent, TextButtonComponent, HeaderComponent, GroupRegisterInviteComponent, InputFieldComponent],
      imports: [SharedModule]
    });
    fixture = TestBed.createComponent(GroupRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
