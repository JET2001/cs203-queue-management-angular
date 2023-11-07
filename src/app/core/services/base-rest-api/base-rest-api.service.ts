import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { baseURL } from '../../constants/api-paths';
import { NO_CONNECTION_MESSAGE } from '../../constants/error-messages';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseRestApiService {
  // Field inject HttpClient to prevent dependency conflicts
  constructor(protected http: HttpClient) {}

  protected httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Post request
  protected post(path: string, data: any): Observable<any> {
    console.log(data);
    return this.http.post(`${baseURL}/${path}`, data, this.httpHeaders).pipe(
      tap({
        error: (error: HttpErrorResponse) => this.handleError(error),
      })
    );
  }

  // Get Request
  protected get(path: string): Observable<any> {
    return this.http.get(`${baseURL}/${path}`, this.httpHeaders).pipe(
      tap({
        error: (error: HttpErrorResponse) => this.handleError(error),
      })
    );
  }


  // Put Request
  protected put(path: string, data: any): Observable<any> {
    return this.http.put(`${baseURL}/${path}`, data, this.httpHeaders).pipe(
      tap({
        error: (error: HttpErrorResponse) => this.handleError(error),
      })
    );
  }

  // Delete Request
  protected delete(path: string): Observable<any> {
    return this.http.delete(`${baseURL}/${path}`, this.httpHeaders).pipe(
      tap({
        error: (error: HttpErrorResponse) => this.handleError(error),
      })
    );
  }

  // Get Request with Parameters.
  protected getWithParams(path: string, params: HttpParams): Observable<any>  {
    const options = {  params: params, headers: this.httpHeaders.headers  };

    return this.http.get(`${baseURL}/${path}`, options).pipe(
      tap({
        error: (error: HttpErrorResponse) => this.handleError(error),
      })
    );
  }

  // Delete Request with Parameters.
  protected deleteWithParams(path: string, params: HttpParams): Observable<any>{
    const options = {params: params, headers: this.httpHeaders.headers};

    return this.http.delete(`${baseURL}/${path}`, options).pipe(
      tap({
        error:(error: HttpErrorResponse) => this.handleError(error)
      })
    );
  }

  // Error handling --> this method can be overwritten if more fine grained error handling is required.
  // The default implementation creates a string in an error object
  protected handleError(error: HttpErrorResponse): HttpErrorResponse {
    // Not sure why this doesn't work though...
    if (error.status == 0){
      const httpError: HttpErrorResponse = new HttpErrorResponse({
        status: 0,
        statusText: NO_CONNECTION_MESSAGE
      });
      return httpError;
    }
    return error;
  }
}
