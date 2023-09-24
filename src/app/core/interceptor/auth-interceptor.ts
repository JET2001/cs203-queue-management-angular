import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Observable } from 'rxjs';
import { baseURL } from '../constants/api-paths';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  // Intercept for most urls, but we need to exclude some urls, for instance landing page. Here is where I exclude the injection of some urls
  excludePaths: Array<string> = [
    "users/auth/login",
    "events/.+"
  ];

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if this is an API call, if it is not, do not intercept
    if (!(req.url.includes(`${baseURL}`))){
      return next.handle(req);
    }
    // Check if this is inside the paths to exclude, if it is, do not intercept.
    for (let pathToExclude of this.excludePaths){
      let pathRegEx = new RegExp(pathToExclude);
      if (pathRegEx.test(req.url)){
        return next.handle(req);
      }
    }
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
