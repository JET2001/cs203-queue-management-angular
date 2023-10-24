import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { RegGroup } from 'src/app/models/reg-group';
import { GetRegistrationGroupService } from 'src/app/shared/services/get-registration-group/get-registration-group.service';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';
import { StoreRegistrationGroupInfoService } from 'src/app/shared/services/store-registration-group-info/store-registration-group-info.service';
import { StoreQueueTimingService } from './../../shared/services/store-queue-timing/store-queue-timing.service';

/**
 * Guard for events register module
 * Used by the canActivateChildFn in app-routing.ts
 * @returns CanActivateChildFn (boolean)
 */
export function eventRegisterGuard(): CanActivateChildFn {
  return () => {
    const authService: AuthenticationService = inject(AuthenticationService);
    const storeEventInfoService: StoreEventInfoService = inject(
      StoreEventInfoService
    );

    // User is not verified --> reject
    if (!authService.isVerified) return denyAccess();

    // EventID is not properly loaded --> reject
    if (storeEventInfoService.eventInfo.eventID == undefined)
      return denyAccess();

    return grantAccess();
  };
}

/**
 * Guard for Group Registration page
 * @returns CanActivateFn (boolean)
 */
export function groupRegisterGuard(): CanActivateFn {
  return async () => {
    const authService: AuthenticationService = inject(AuthenticationService);
    const getRegGroupInfoService: GetRegistrationGroupService = inject(
      GetRegistrationGroupService
    );
    const storeEventInfoService: StoreEventInfoService = inject(
      StoreEventInfoService
    );
    const storeRegGroupService: StoreRegistrationGroupInfoService = inject(
      StoreRegistrationGroupInfoService
    );

    const eventID = storeEventInfoService.eventInfo.eventID;
    const userID = authService.userID;

    let userRegGroup: RegGroup | undefined;
    getRegGroupInfoService.getRegGroupOfUser(eventID!, userID).subscribe((regGroup: any) => {
      userRegGroup = regGroup;
    })
    // await getRegGroupInfoService
    //   .getRegGroupOfUser(eventID!, userID)
    //   .then((regGroup: RegGroup | undefined) => (userRegGroup = regGroup));
    // If user tries to modify group but does not have an actual group, reject
    if (storeRegGroupService.modifyGroup && userRegGroup == undefined)
      return denyAccess();
    // If user is not trying to modify group but already has a registered group, reject
    if (!storeRegGroupService.modifyGroup && userRegGroup != undefined)
      return denyAccess();

    return grantAccess();
  };
}

/**
 * Guard for queue registration
 * @returns CanActivateFn (boolean)
 */
export function queueRegisterGuard(): CanActivateFn {
  return async () => {
    const getRegGroupService: GetRegistrationGroupService = inject(
      GetRegistrationGroupService
    );
    const storeEventInfoService: StoreEventInfoService = inject(
      StoreEventInfoService
    );
    const authService: AuthenticationService = inject(AuthenticationService);

    const eventID = storeEventInfoService.eventInfo.eventID;
    const userID = authService.userID;

    let regGroup: RegGroup | undefined = undefined;
    // if user does not have a registration group, reject
    // await getRegGroupService
    //   .getRegGroupOfUser(eventID!, userID)
    //   .then((regGroup_: RegGroup | undefined) => {
    //     regGroup = regGroup_;
    //   });
    getRegGroupService.getRegGroupOfUser(eventID!, userID).subscribe((regGroup_: any) => {
      regGroup = regGroup_;
    })
    if (regGroup == undefined) return denyAccess();

    // TODO : User must not have any pre-existing queues. TBC: Wait until after APIs has been integrated.

    return grantAccess();
  };
}

export function registrationPreviewGuard(): CanActivateFn {
  return async () => {
    const storeQueueTimingsService: StoreQueueTimingService = inject(
      StoreQueueTimingService
    );
    if (
      storeQueueTimingsService.selectionStrings.length == 0
    )
      denyAccess();

    return grantAccess();
  };
}

function denyAccess(): boolean {
  const location: Location = inject(Location);
  location.back(); // back to previous page
  return false;
}

function grantAccess(): boolean {
  return true;
}
