import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { baseURL } from '../../constants/api-paths';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseRestApiService {
  protected httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  // Post request
  public async post(path: string, data: any): Promise<any> {
    return Promise.resolve(
      this.http.post(`${baseURL}/${path}`, data, this.httpHeaders).pipe(
        tap({
          error: (error: HttpErrorResponse) => this.handleError(error),
        })
      )
    );
  }

  // Get Request
  public get(path: string): Observable<any> {
    const apiURL = `${baseURL}/${path}`;
    return this.http.get(apiURL, this.httpHeaders);
    // const promise = new Promise<void>((resolve, reject) => {
    //   const apiURL = `${baseURL}/${path}`;
    //   this.http.get(apiURL, this.httpHeaders).subscribe({
    //     next: (res: any) => {
    //       return res;
    //     },
    //     error: (err: any ) => this.handleError(err as HttpErrorResponse),
    //     complete: () => console.log("completed!")
    //   })
    // })
    // return promise;
    // return Promise.resolve(
    //   this.http.get(`${baseURL}/${path}`, this.httpHeaders).subscribe({
    //     next: (response: any) => {
    //     }
    //   })
    // );
  }

  // Put Request
  public async put(path: string, data: any): Promise<any> {
    return Promise.resolve(
      this.http.put(`${baseURL}/${path}`, data, this.httpHeaders).pipe(
        tap({
          error: (error: HttpErrorResponse) => this.handleError(error),
        })
      )
    );
  }

  // Delete Request
  public async delete(path: string, data: any): Promise<any> {
    return Promise.resolve(
      this.http.delete(`${baseURL}/${path}`, this.httpHeaders).pipe(
        tap({
          error: (error: HttpErrorResponse) => this.handleError(error),
        })
      )
    );
  }

  // Error handling --> this method can be overwritten if more fine grained error handling is required.
  // The default implementation creates a string in an error object
  protected handleError(error: HttpErrorResponse): Error {
    return new Error(error.status.toString());
  }
}
