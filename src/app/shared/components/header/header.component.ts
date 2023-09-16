import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StoreEventInfoService } from '../../services/store-event-info/store-event-info.service';
import { Users } from 'src/app/mock-db/MockDB';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() verifiedUserLoggingIn = new EventEmitter<void>();
  @Output() userLoggedOut = new EventEmitter<void>();
  emailID: string | undefined = undefined;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.emailID = this.authService.email;
    this._shortenEmailID();
  }

  isLoggedIn(): boolean {
    return this.authService.userID != undefined;
  }

  loginUser(): void {
    let userInputStr: string | null = prompt(
      'Choose 1 user ID to log in as 0 for Jon, 1 for David, 2 for Clarissa, 3 for Ben, 4 for Ryan, and -1 to return: '
    );
    if (!userInputStr) return;
    let userInput: number | undefined = Number.parseInt(userInputStr);
    if (userInput == undefined || userInput <= -1 || userInput >= 5) return;

    this.authService.userID = userInput;
    this.emailID = this.authService.email;
    this._shortenEmailID();

    if (this.authService.isVerified) {
      this.verifiedUserLoggingIn.emit();
    }
  }

  logoutUser(): void {
    this.authService.userID = undefined;
    this.userLoggedOut.emit();
  }

  handleConcertsButtonClick(): void {
    if (window.location.href.includes('home')) return; // don't route anywhere if we are already on the home page.
    this.router.navigate(['/home']);
  }

  private _shortenEmailID(): void {
    if (this.emailID == undefined) return;

    // If the email is longer than 13 characters append an ellipsis to prevent overflow.
    this.emailID =
      this.emailID.length >= 13
        ? this.emailID.substring(0, 13) + '...'
        : this.emailID;
    console.log(this.emailID);
  }
}
