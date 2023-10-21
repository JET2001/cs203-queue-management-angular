import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from './../../../../base/base.component';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [MessageService],
})
export class LandingPageComponent extends BaseComponent implements OnInit {
  userID!: string | undefined;
  constructor(
    protected override spinner: NgxSpinnerService,
    private authService: AuthenticationService,
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.userID = this.authService.userID;
  }

  ngAfterContentInit(): void {
    this.spinnerHide();
  }
  // openErrorMessage(): void {
  //   this.messageService.add({
  //     severity: 'error',
  //     summary: 'You can only register for an event when you are logged in'
  //   });
  // }
}
