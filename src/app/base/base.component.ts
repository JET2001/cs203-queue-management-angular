import { NgxSpinnerService } from 'ngx-spinner';
import { Component } from '@angular/core';

@Component({
  selector: 'app-base',
  template: '',
  styles: []
})
export class BaseComponent {
  
  constructor(protected spinner: NgxSpinnerService){}

  public spinnerShow() {
    this.spinner.show();
  }

  public spinnerHide() {
    setTimeout(() => { // spinner stops 1 second after function has been called.
      this.spinner.hide();
    }, 1000);
  }
}
