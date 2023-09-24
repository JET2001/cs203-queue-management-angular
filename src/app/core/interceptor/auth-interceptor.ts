import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the authtoken from the service
    const authToken: string | undefined = this.authService.authToken;

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization
    const authReq =
      authToken != undefined
        ? req.clone({
            setHeaders: { Authorization: "Bearer " + authToken },
          })
        : req;

    // send cloned request with header to the next handler
    return next.handle(authReq);
  }
}
