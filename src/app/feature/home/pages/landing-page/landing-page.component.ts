import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [MessageService],
})
export class LandingPageComponent implements OnInit {
  userID!: string | undefined;
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.userID = this.authService.userID;
  }

  // openErrorMessage(): void {
  //   this.messageService.add({
  //     severity: 'error',
  //     summary: 'You can only register for an event when you are logged in'
  //   });
  // }
}
