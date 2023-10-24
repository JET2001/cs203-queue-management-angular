import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';
import { GetEventInfoService } from 'src/app/shared/services/get-event-info/get-event-info-service';
import { GetRegistrationGroupService } from 'src/app/shared/services/get-registration-group/get-registration-group.service';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';
import { StoreRegistrationGroupInfoService } from 'src/app/shared/services/store-registration-group-info/store-registration-group-info.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { GroupMemberListComponent } from '../../components/group-member-list/group-member-list.component';
import { QueuesListComponent } from '../../components/queues-list/queues-list.component';
import { ViewShowsComponent } from '../../components/view-shows/view-shows.component';
import { RegStatus, RegStepper } from '../../constants/reg-status';
import { ViewEventInfoComponent } from './view-event-info.component';

describe('ViewEventInfoComponent', () => {
  let component: ViewEventInfoComponent;
  let fixture: ComponentFixture<ViewEventInfoComponent>;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;
  let storeEventInfoService: StoreEventInfoService;
  let router: Router;
  let getEventInfoService: GetEventInfoService;
  let getRegGroupService: GetRegistrationGroupService;
  let authService: AuthenticationService;
  let storeRegGroupService: StoreRegistrationGroupInfoService;
  let messageService: MessageService;

  describe('user has formed a group and signed up for queues', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          ViewEventInfoComponent,
          TextButtonComponent,
          HeaderComponent,
          ViewShowsComponent,
          GroupMemberListComponent,
          QueuesListComponent,
        ],
        imports: [
          SharedModule,
          TableModule,
          InputTextModule,
          StepsModule,
          HttpClientTestingModule,
          RouterTestingModule,
        ],
        providers: [MessageService],
      });

      // Inject services
      http = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      storeEventInfoService = TestBed.inject(StoreEventInfoService);
      router = TestBed.inject(Router);
      getEventInfoService = TestBed.inject(GetEventInfoService);
      getRegGroupService = TestBed.inject(GetRegistrationGroupService);
      authService = TestBed.inject(AuthenticationService);
      storeRegGroupService = TestBed.inject(StoreRegistrationGroupInfoService);
      messageService = TestBed.inject(MessageService);

      // Return mock data, mock every service
      spyOnProperty(storeEventInfoService, 'eventInfo', 'get').and.returnValue({
        eventID: 'TEST-EVENT-1',
        eventTitle: 'test-event',
        maxQueueable: 10,
      });
      spyOn(router, 'navigate').and.stub();
      spyOn(getEventInfoService, 'getEventInfo').and.returnValue(
        of({
          id: 'TEST-EVENT-1',
          name: 'test-event',
          maxQueueable: 10,
          description: 'I am a test event!',
          posterImagePath: 'taylor-swift.png',
          countries: null,
          highlighted: true,
        })
      );

      spyOnProperty(authService, 'userID', 'get').and.returnValue(
        'TEST-USER-0'
      );
      spyOnProperty(authService, 'isLoggedIn', 'get').and.returnValue(true);

      spyOn(getRegGroupService, 'getRegGroupOfUser').and.returnValue(
        of({
          groupId: 'TEST-GROUP-1',
          userInfoList: [
            {
              id: 'MOCK-USER-1',
              mobile: '06590000001',
              email: 'abc@example.com',
              groupLeader: false,
              confirmed: true,
            },
            {
              id: 'MOCK-USER-2',
              mobile: '06591000000',
              email: 'def@example.com',
              groupLeader: true,
              confirmed: true,
            },
            {
              id: 'TEST-USER-0',
              mobile: '06591234567',
              email: 'ghi@example.com',
              groupLeader: false,
              confirmed: true,
            },
          ],
          hasAllUsersConfirmed: true,
          queueList: [
            {
              queueId: 'MOCK-QUEUE-1',
              startDateTime: '2023-11-05 22:00:00',
              endDateTime: '2023-11-06 01:00',
              showId: '2024-05-01',
              showDateTime: null,
              locationName: 'Singapore',
            },
            {
              queueId: 'MOCK-QUEUE-2',
              startDateTime: '2023-11-06 22:00:00',
              endDateTime: '2023-11-07 01:00',
              showId: '2024-05-02',
              showDateTime: null,
              locationName: null,
            },
          ],
        })
      );

      spyOnProperty(storeRegGroupService, 'modifyGroup', 'set').and.stub();
      spyOnProperty(storeRegGroupService, 'regGroup', 'set').and.stub();
      spyOn(storeRegGroupService, 'confirmUser').and.returnValue(of(true));
      spyOn(storeRegGroupService, 'removeUserFromGroup').and.returnValue(
        of(true)
      );

      spyOn(messageService, 'add').and.stub();

      fixture = TestBed.createComponent(ViewEventInfoComponent);

      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('regstepper should have 4 components', () => {
      expect(component.steps.length).toEqual(4);
    });

    it('eventID should be TEST-EVENT-1', () => {
      expect(component.eventID).toEqual('TEST-EVENT-1');
    });

    it('event description should be "I am a test event!"', () => {
      expect(component.eventInfo.description).toEqual('I am a test event!');
    });

    it('userID should be TEST-USER-0', () => {
      expect(component.userID).toEqual('TEST-USER-0');
    });

    it('this user should have 2 group members', () => {
      expect(component.regGroupInfo?.userGroup.length).toEqual(2);
    });

    it('this user has confirmed his registration', () => {
      expect(component.hasUserConfirmed).toBeTrue();
    });

    it('this users registration group is at REGISTERED', () => {
      expect(component.registerStatus).toEqual(RegStatus.REGISTERED);
      expect(component.activeIndex).toEqual(RegStepper.REGISTERED);
    });

    it('this user group has registered for 2 queues', () => {
      expect(component.regGroupInfo?.queueList?.length).toEqual(2);
    });

    it('location of queue in queueList should be "Not specified" when null is received', () => {
      const queueList = component.regGroupInfo?.queueList;
      if (queueList === undefined || queueList.length < 2) {
        fail('queueList should not be undefined');
      }
      expect(queueList![1].location).toEqual('Not specified');
    });

    it('should display group member info for this current user', () => {
      expect(component.showGroupMembersInfo()).toBeTrue();
    });

    it('should NOT display modify group button for user', () => {
      expect(component.showModifyGroupButton()).toBeFalse();
    });

    it('user has purchased tickets, should NOT display confirm reg button for user', () => {
      expect(component.showConfirmRegButton()).toBeFalse();
    });

    it('user has purchased tickets, should not show leave group button for user', () => {
      expect(component.showLeaveGroupButton()).toBeFalse();
    });
  });

  describe('user has formed a group (user is groupleader) but not signed up for queues', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          ViewEventInfoComponent,
          TextButtonComponent,
          HeaderComponent,
          ViewShowsComponent,
          GroupMemberListComponent,
          QueuesListComponent,
        ],
        imports: [
          SharedModule,
          TableModule,
          InputTextModule,
          StepsModule,
          HttpClientTestingModule,
          RouterTestingModule,
        ],
        providers: [MessageService],
      });

      // Inject services
      http = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      storeEventInfoService = TestBed.inject(StoreEventInfoService);
      router = TestBed.inject(Router);
      getEventInfoService = TestBed.inject(GetEventInfoService);
      getRegGroupService = TestBed.inject(GetRegistrationGroupService);
      authService = TestBed.inject(AuthenticationService);
      storeRegGroupService = TestBed.inject(StoreRegistrationGroupInfoService);
      messageService = TestBed.inject(MessageService);

      // Return mock data, mock every service
      spyOnProperty(storeEventInfoService, 'eventInfo', 'get').and.returnValue({
        eventID: 'TEST-EVENT-1',
        eventTitle: 'test-event',
        maxQueueable: 10,
      });
      spyOn(router, 'navigate').and.stub();
      spyOn(getEventInfoService, 'getEventInfo').and.returnValue(
        of({
          id: 'TEST-EVENT-1',
          name: 'test-event',
          maxQueueable: 10,
          description: 'I am a test event!',
          posterImagePath: 'taylor-swift.png',
          countries: null,
          highlighted: true,
        })
      );

      spyOnProperty(authService, 'userID', 'get').and.returnValue(
        'TEST-USER-0'
      );
      spyOnProperty(authService, 'isLoggedIn', 'get').and.returnValue(true);

      spyOn(getRegGroupService, 'getRegGroupOfUser').and.returnValue(
        of({
          groupId: 'TEST-GROUP-1',
          userInfoList: [
            {
              id: 'MOCK-USER-1',
              mobile: '06590000001',
              email: 'abc@example.com',
              groupLeader: false,
              confirmed: true,
            },
            {
              id: 'MOCK-USER-2',
              mobile: '06591000000',
              email: 'def@example.com',
              groupLeader: false,
              confirmed: true,
            },
            {
              id: 'TEST-USER-0',
              mobile: '06591234567',
              email: 'ghi@example.com',
              groupLeader: true,
              confirmed: true,
            },
          ],
          hasAllUsersConfirmed: true,
          queueList: [], // empty queues
        })
      );

      spyOnProperty(
        storeRegGroupService,
        'modifyGroup',
        'set'
      ).and.callThrough();
      spyOnProperty(storeRegGroupService, 'regGroup', 'set').and.callThrough();
      spyOn(storeRegGroupService, 'confirmUser').and.returnValue(of(true));
      spyOn(storeRegGroupService, 'removeUserFromGroup').and.returnValue(
        of(true)
      );

      spyOn(messageService, 'add').and.stub();

      fixture = TestBed.createComponent(ViewEventInfoComponent);

      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('queueList should have length of 0', () => {
      if (component.regGroupInfo?.queueList === undefined) {
        fail('queueList should not be undefined');
      }
      expect(component.regGroupInfo!.queueList!.length).toEqual(0);
    });

    it('user reg status should be at GROUP_CONFIRMED', () => {
      expect(component.registerStatus).toEqual(RegStatus.GROUP_CONFIRMED);
    });

    it('user should see a button to modify group', () => {
      expect(component.showModifyGroupButton()).toBeTrue();
    });

    it('user should not see leave group or confirm group buttons', () => {
      expect(component.showConfirmRegButton()).toBeFalse();
      expect(component.showLeaveGroupButton()).toBeFalse();
    });

    it('when the modify group button is clicked, the router should navigate to events/register/group', () => {
      component.handleModifyGroupButtonClick();
      expect(router.navigate).toHaveBeenCalledWith([
        '/events',
        'register',
        'group',
      ]);
    });

    it('when the modify group button is clicked, the modify group should be set', () => {
      component.handleModifyGroupButtonClick();
      expect(storeRegGroupService.modifyGroup).toBeTrue();
    });
    it('when the modify group button is clicked, the reg group should be saved', () => {
      component.handleModifyGroupButtonClick();
      expect(storeRegGroupService.regGroup?.groupLeaderEmail).toEqual(
        component.regGroupInfo?.groupLeaderEmail
      );
      expect(component.regGroupInfo?.groupLeaderUserId).toEqual(
        authService.userID
      );
    });
  });

  describe('user has not formed a group and is waiting for confirmation from their registration', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          ViewEventInfoComponent,
          TextButtonComponent,
          HeaderComponent,
          ViewShowsComponent,
          GroupMemberListComponent,
          QueuesListComponent,
        ],
        imports: [
          SharedModule,
          TableModule,
          InputTextModule,
          StepsModule,
          HttpClientTestingModule,
          RouterTestingModule,
        ],
        providers: [MessageService],
      });

      // Inject services
      http = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      storeEventInfoService = TestBed.inject(StoreEventInfoService);
      router = TestBed.inject(Router);
      getEventInfoService = TestBed.inject(GetEventInfoService);
      getRegGroupService = TestBed.inject(GetRegistrationGroupService);
      authService = TestBed.inject(AuthenticationService);
      storeRegGroupService = TestBed.inject(StoreRegistrationGroupInfoService);
      messageService = TestBed.inject(MessageService);

      // Return mock data, mock every service
      spyOnProperty(storeEventInfoService, 'eventInfo', 'get').and.returnValue({
        eventID: 'TEST-EVENT-1',
        eventTitle: 'test-event',
        maxQueueable: 10,
      });
      spyOn(router, 'navigate').and.stub();
      spyOn(getEventInfoService, 'getEventInfo').and.returnValue(
        of({
          id: 'TEST-EVENT-1',
          name: 'test-event',
          maxQueueable: 10,
          description: 'I am a test event!',
          posterImagePath: 'taylor-swift.png',
          countries: null,
          highlighted: true,
        })
      );

      spyOnProperty(authService, 'userID', 'get').and.returnValue(
        'TEST-USER-0'
      );
      spyOnProperty(authService, 'isLoggedIn', 'get').and.returnValue(true);

      spyOn(getRegGroupService, 'getRegGroupOfUser').and.returnValue(
        of({
          groupId: 'TEST-GROUP-1',
          userInfoList: [
            {
              id: 'MOCK-USER-1',
              mobile: '06590000001',
              email: 'abc@example.com',
              groupLeader: false,
              confirmed: true,
            },
            {
              id: 'MOCK-USER-2',
              mobile: '06591000000',
              email: 'def@example.com',
              groupLeader: true,
              confirmed: true,
            },
            {
              id: 'TEST-USER-0',
              mobile: '06591234567',
              email: 'ghi@example.com',
              groupLeader: false,
              confirmed: false,
            },
          ],
          hasAllUsersConfirmed: false,
          queueList: [], // empty queues
        })
      );

      spyOnProperty(
        storeRegGroupService,
        'modifyGroup',
        'set'
      ).and.callThrough();
      spyOnProperty(storeRegGroupService, 'regGroup', 'set').and.callThrough();
      spyOn(storeRegGroupService, 'confirmUser').and.returnValue(of(true));
      spyOn(storeRegGroupService, 'removeUserFromGroup').and.returnValue(
        of(true)
      );

      spyOn(messageService, 'add').and.stub();

      fixture = TestBed.createComponent(ViewEventInfoComponent);

      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('hasAllUsersConfirmed should be false', () => {
      expect(component.regGroupInfo?.hasAllUsersConfirmed).toBeFalse();
    });

    it('hasUserConfirmed should be false', () => {
      expect(component.hasUserConfirmed).toBeFalse();
    });

    it('reg status of group should be set to PENDING CONFIRM', () => {
      expect(component.registerStatus).toEqual(RegStatus.PENDING_CONFIRMATION);
    });

    it('user should NOT see a modify group button', () => {
      expect(component.showModifyGroupButton()).toBeFalse();
    });

    it('user should see leave group and confirm group buttons', () => {
      expect(component.showLeaveGroupButton()).toBeTrue();
      expect(component.showConfirmRegButton()).toBeTrue();
    });

    it('when user confirms, confirmUser should be called with the right parameters', () => {
      component.handleConfirmRegButtonClick();
      expect(storeRegGroupService.confirmUser).toHaveBeenCalledWith(
        'TEST-USER-0',
        'TEST-EVENT-1',
        'TEST-GROUP-1'
      );
    });

    it('when user leaves group, removeUserFromGroup should be called with the right parameters', () => {
      component.handleLeaveGroupButtonClick();
      expect(storeRegGroupService.removeUserFromGroup).toHaveBeenCalledWith(
        'TEST-USER-0',
        'TEST-EVENT-1',
        'TEST-GROUP-1'
      );
    });
  });
  describe('not registered user views the events page', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          ViewEventInfoComponent,
          TextButtonComponent,
          HeaderComponent,
          ViewShowsComponent,
          GroupMemberListComponent,
          QueuesListComponent,
        ],
        imports: [
          SharedModule,
          TableModule,
          InputTextModule,
          StepsModule,
          HttpClientTestingModule,
          RouterTestingModule,
        ],
        providers: [MessageService],
      });

      // Inject services
      http = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      storeEventInfoService = TestBed.inject(StoreEventInfoService);
      router = TestBed.inject(Router);
      getEventInfoService = TestBed.inject(GetEventInfoService);
      getRegGroupService = TestBed.inject(GetRegistrationGroupService);
      authService = TestBed.inject(AuthenticationService);
      storeRegGroupService = TestBed.inject(StoreRegistrationGroupInfoService);
      messageService = TestBed.inject(MessageService);

      spyOnProperty(storeEventInfoService, 'eventInfo', 'get').and.returnValue({
        eventID: 'TEST-EVENT-1',
        eventTitle: 'test-event',
        maxQueueable: 10,
      });
      spyOn(router, 'navigate').and.stub();
      spyOn(getEventInfoService, 'getEventInfo').and.returnValue(
        of({
          id: 'TEST-EVENT-1',
          name: 'test-event',
          maxQueueable: 10,
          description: 'I am a test event!',
          posterImagePath: 'taylor-swift.png',
          countries: null,
          highlighted: true,
        })
      );

      spyOn(getRegGroupService, 'getRegGroupOfUser').and.returnValue(
        throwError(() => new Error('400'))
      );
    });

    it('should show the register status as NOT_LOGGED_IN', () => {
      spyOnProperty(authService, 'userID', 'get').and.returnValue(undefined);
      spyOnProperty(authService, 'isLoggedIn', 'get').and.returnValue(false);
      component.handleUserLoginLogoutChange();
      expect(component.registerStatus).toEqual(RegStatus.NOT_LOGGED_IN);
    });

    it('userRegGroup should be undefined', () => {
      spyOnProperty(authService, 'userID', 'get').and.returnValue(undefined);
      spyOnProperty(authService, 'isLoggedIn', 'get').and.returnValue(false);
      component.handleUserLoginLogoutChange();
      expect(component.regGroupInfo).toBeFalsy();
    });

    // it('user logs in from the header component. should now show the users register status as NOT_REGISTERED', fakeAsync(() => {
    //   spyOnProperty(authService, 'userID', 'get').and.returnValue(
    //     'TEST-USER-0'
    //   );
    //   spyOnProperty(authService, 'isLoggedIn', 'get').and.returnValue(true);

    //   component.handleUserLoginLogoutChange(); // login user

    //   tick(5000);
    //   console.log(component.regGroupInfo, component.registerStatus);
    //   expect(component.registerStatus).toEqual(RegStatus.NOT_REGISTERED);
    // }));
  });
});
