import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

export function logInGuard(): CanActivateChildFn {
  return () => {
    const authService: AuthenticationService = inject(AuthenticationService);
    if (!authService.isLoggedIn) {
        return denyAccess();
    }
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
