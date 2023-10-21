import { NgxSpinnerService } from 'ngx-spinner';
import { Component } from '@angular/core';

@Component({
  selector: 'app-base',
  template: '',
  styles: []
})
export class BaseComponent {

  private _isSpinning: boolean = false;
  constructor(protected spinner: NgxSpinnerService){}

  public spinnerShow() {
    if(!this._isSpinning){
      this.spinner.show();
      this._isSpinning = true;
    }
  }

  public spinnerHide() {
    setTimeout(() => { // spinner stops 1 second after function has been called.
      this.spinner.hide();
      this._isSpinning = false;
    }, 1000);
  }

  protected get isSpinning(): boolean {
    return this._isSpinning;
  }
}
