import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRegistrationComponent } from './group-registration.component';

describe('GroupRegistrationComponent', () => {
  let component: GroupRegistrationComponent;
  let fixture: ComponentFixture<GroupRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupRegistrationComponent]
    });
    fixture = TestBed.createComponent(GroupRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
