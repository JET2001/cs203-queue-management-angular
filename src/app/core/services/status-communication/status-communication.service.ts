import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class StatusCommunicationService {

  private _message: string | undefined;
  private _severity: 'success' | 'warning' | 'info' | 'error' | undefined = undefined;
  private isErrorNew : boolean = false;


  public get hasMessage(): boolean {
    return this.isErrorNew && this._message !== undefined && this._severity !== undefined;
  }

  public get message(): Message | undefined {
    if (!this.isErrorNew) return undefined;
    this.isErrorNew = false;
    return {
      severity: this._severity,
      summary: this._message
    };
  }

  public saveMessage(messageText: string, severity: 'success' | 'warning' | 'info' | 'error'): void {
    this.isErrorNew = true;
    this._message = messageText;
    this._severity = severity;
  }

}
