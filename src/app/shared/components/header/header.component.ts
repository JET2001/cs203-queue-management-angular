import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() verifiedUserLoggingIn = new EventEmitter<void>();
  @Output() userLoggedOut = new EventEmitter<void>();
  emailID: string | undefined = undefined;

  email$ !: Observable<string | undefined>;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private activeModal: NgbModal
  ) {}

  ngOnInit(): void {

    this.email$ = this.authService.email$;
    this.email$.subscribe(
      (emailID: string | undefined) => {
        this.emailID = emailID;
        console.log(this.emailID);
      }
    )
  }

  isLoggedIn(): boolean {
    return this.authService.email != undefined;
  }
  handleLoginButtonClick(): void {
    this.activeModal.open(LoginPopupComponent, { centered: true });
  }


  // loginUser(): void {

  //   let userInputStr: string | null = prompt(
  //     'Choose 1 user ID to log in as 0 for Jon, 1 for David, 2 for Clarissa, 3 for Ben, 4 for Ryan, and -1 to return: '
  //   );
  //   if (!userInputStr) return;
  //   let userInput: string | undefined = userInputStr;
  //   if (userInput == undefined) return;
  // loginUser(): void {

  //   let userInputStr: string | null = prompt(
  //     'Choose 1 user ID to log in as 0 for Jon, 1 for David, 2 for Clarissa, 3 for Ben, 4 for Ryan, and -1 to return: '
  //   );
  //   if (!userInputStr) return;
  //   let userInput: string | undefined = userInputStr;
  //   if (userInput == undefined) return;

  //   this.authService.userID = userInput;
  //   this.emailID = this.authService.email;
  //   this._shortenEmailID();
  //   this.authService.userID = userInput;
  //   this.emailID = this.authService.email;
  //   this._shortenEmailID();

  //   if (this.authService.isVerified) {
  //     this.verifiedUserLoggingIn.emit();
  //   }
  // }
  //   if (this.authService.isVerified) {
  //     this.verifiedUserLoggingIn.emit();
  //   }
  // }

  logoutUser(): void {
    this.authService.userID = undefined;
    this.userLoggedOut.emit();
  }

  handleConcertsButtonClick(): void {
    if (window.location.href.includes('home')) return; // don't route anywhere if we are already on the home page.
    this.router.navigate(['/home']);
  }

}
