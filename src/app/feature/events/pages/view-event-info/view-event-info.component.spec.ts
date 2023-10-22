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
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';
import { Router, RouterModule } from '@angular/router';
import { GetEventInfoService } from 'src/app/shared/services/get-event-info/get-event-info-service';
import { GetUserInfoService } from 'src/app/shared/services/get-user-info/get-user-info.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { StoreRegistrationGroupInfoService } from 'src/app/shared/services/store-registration-group-info/store-registration-group-info.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { of } from 'rxjs';
import { GetRegistrationGroupService } from 'src/app/shared/services/get-registration-group/get-registration-group.service';
import { GroupMemberListComponent } from '../../components/group-member-list/group-member-list.component';
import { QueuesListComponent } from '../../components/queues-list/queues-list.component';
import { RegStatus, RegStepper } from '../../constants/reg-status';

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
          QueuesListComponent
        ],
        imports: [
          SharedModule,
          TableModule,
          InputTextModule,
          StepsModule,
          HttpClientTestingModule,
          RouterTestingModule
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
      spyOnProperty(storeEventInfoService, 'eventInfo' ,'get').and.returnValue({
        eventID: 'TEST-EVENT-1',
        eventTitle: 'test-event',
        maxQueueable: 10
      });
      spyOn(router, 'navigate').and.stub();
      spyOn(getEventInfoService, 'getEventInfo').and.returnValue(
        of({
          id : 'TEST-EVENT-1',
          name: 'test-event',
          maxQueueable: 10,
          description: 'I am a test event!',
          posterImagePath: 'taylor-swift.png',
          countries: null,
          highlighted: true
        })
      );

      spyOnProperty(authService, 'userID', 'get').and.returnValue('TEST-USER-0');
      spyOnProperty(authService, 'isLoggedIn', 'get').and.returnValue(true);

      spyOn(getRegGroupService, 'getRegGroupOfUser').and.returnValue(of(
        {
          groupId: 'TEST-GROUP-1',
          userInfoList: [
            {
              id: 'MOCK-USER-1',
              mobile: '06590000001',
              email: 'abc@example.com',
              groupLeader: false,
              confirmed: true
            },
            {
              id: 'MOCK-USER-2',
              mobile: '06591000000',
              email: 'def@example.com',
              groupLeader: true,
              confirmed: true
            },
            {
              id: 'TEST-USER-0',
              mobile: '06591234567',
              email: 'ghi@example.com',
              groupLeader: false,
              confirmed: true
            }
          ],
          hasAllUsersConfirmed: true,
          queueList: [
            {
              queueId: 'MOCK-QUEUE-1',
              startDateTime: '2023-11-05 22:00:00',
              endDateTime: '2023-11-06 01:00',
              showId: '2024-05-01',
              showDateTime: null,
              locationName: 'Singapore'
            },
            {
              queueId: 'MOCK-QUEUE-2',
              startDateTime: '2023-11-06 22:00:00',
              endDateTime: '2023-11-07 01:00',
              showId: '2024-05-02',
              showDateTime: null,
              locationName: null
            }
          ]
        }
      ));

      spyOnProperty(storeRegGroupService, 'modifyGroup' ,'set').and.stub();
      spyOnProperty(storeRegGroupService, 'regGroup', 'set').and.stub();
      spyOn(storeRegGroupService, 'confirmUser').and.returnValue(of(true));
      spyOn(storeRegGroupService, 'removeUserFromGroup').and.returnValue(of(true));

      spyOn(messageService, 'add').and.stub();

      fixture = TestBed.createComponent(ViewEventInfoComponent);

      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    fit('should create', () => {
      expect(component).toBeTruthy();
    });

    fit('regstepper should have 4 components', () => {
      expect(component.steps.length).toEqual(4);
    });

    fit('eventID should be TEST-EVENT-1', () => {
      expect(component.eventID).toEqual('TEST-EVENT-1');
    });

    fit('event description should be "I am a test event!"', () =>{
      expect(component.eventInfo.description).toEqual('I am a test event!');
    });

    fit('userID should be TEST-USER-0', () =>{
      expect(component.userID).toEqual('TEST-USER-0');
    });

    fit('this user should have 2 group members', () => {
      expect(component.regGroupInfo?.userGroup.length).toEqual(2);
    });

    fit('this user has confirmed his registration', () => {
      expect(component.hasUserConfirmed).toBeTrue();
    });

    fit('this users registration group is at REGISTERED', () => {
      expect(component.registerStatus).toEqual(RegStatus.REGISTERED);
      expect(component.activeIndex).toEqual(RegStepper.REGISTERED);
    })

    fit('this user group has registered for 2 queues', ()=>{
      expect(component.regGroupInfo?.queueList?.length).toEqual(2);
    });

    fit('location of queue in queueList should be "Not specified" when null is received', () => {
      const queueList = component.regGroupInfo?.queueList;
      if (queueList === undefined || queueList.length < 2){
        fail("queueList should not be undefined");
      }
      expect(queueList![1].location).toEqual('Not specified');
    });

    fit('should display group member info for this current user', () => {
      expect(component.showGroupMembersInfo()).toBeTrue();
    });

    fit('should NOT display modify group button for user', () => {
      expect(component.showModifyGroupButton()).toBeFalse();
    });

    fit('user has purchased tickets, should NOT display confirm reg button for user', () => {
      expect(component.showConfirmRegButton()).toBeFalse();
    });

    fit('user has purchased tickets, should not show leave group button for user', () => {
      expect(component.showLeaveGroupButton()).toBeFalse();
    });

  });

  
});

