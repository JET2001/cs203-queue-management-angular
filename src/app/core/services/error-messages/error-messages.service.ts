import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {

  private _message: string | undefined;
  private isErrorNew : boolean = false;


  public get hasError(): boolean {
    return this.isErrorNew && this._message !== undefined;
  }

  public get message(): string | undefined {
    if (!this.isErrorNew) return undefined;
    this.isErrorNew = false;
    return this._message;
  }

  public set message(errorMessage: string | undefined) {
    this.isErrorNew = true;
    this._message = errorMessage;
  }

}
