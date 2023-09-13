import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRegisterInviteComponent } from './group-register-invite.component';

describe('GroupRegisterInviteComponent', () => {
  let component: GroupRegisterInviteComponent;
  let fixture: ComponentFixture<GroupRegisterInviteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupRegisterInviteComponent]
    });
    fixture = TestBed.createComponent(GroupRegisterInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
