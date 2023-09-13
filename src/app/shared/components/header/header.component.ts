import { Component } from '@angular/core';
import { StoreEventInfoService } from '../../services/store-event-info/store-event-info.service';
import { Users } from 'src/app/mock-db/MockDB';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  emailID: string | undefined = undefined;

  constructor(private authService: AuthenticationService) {}

  isLoggedIn(): boolean {
    return this.authService.userID != undefined;
  }

  loginUser(): void {
    let userInputStr: string | null = prompt(
      'Choose 1 user ID to log in as 0 for Jon, 1 for David, 2 for Clarissa, 3 for Ben, 4 for Ryan, and -1 to return: '
    );
    let userInput: number | undefined = Number.parseInt(userInputStr!);
    if (userInput <= -1 || userInput >= 5) return;

    this.authService.userID = userInput;
    this.emailID = this.authService.email;
  }
}
