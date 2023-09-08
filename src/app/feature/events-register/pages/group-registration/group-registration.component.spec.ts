import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRegistrationComponent } from './group-registration.component';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';

describe('GroupRegistrationComponent', () => {
  let component: GroupRegistrationComponent;
  let fixture: ComponentFixture<GroupRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupRegistrationComponent, TextButtonComponent]
    });
    fixture = TestBed.createComponent(GroupRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
