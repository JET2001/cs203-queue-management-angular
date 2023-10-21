import { NgxSpinnerService } from 'ngx-spinner';
import { Component } from '@angular/core';
import { BaseComponent } from './base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
  title = 'cs203-ticket-management';

  constructor(protected override spinner: NgxSpinnerService){
    super(spinner);
  }

  ngOnInit(): void {
    this.spinnerShow();
  }

  ngAfterContentInit(): void {
    this.spinnerHide();
  }
}
