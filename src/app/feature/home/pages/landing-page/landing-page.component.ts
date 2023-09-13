import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

  userID !: number | undefined;
  constructor(
    private authService: AuthenticationService,
  ){}

  ngOnInit(): void {
    this.userID = this.authService.userID;
  }



}
