import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/base/base.component';
import { StoreUserInfoService } from 'src/app/shared/services/store-user-info/store-user-info.service';
import { StatusCommunicationService } from 'src/app/core/services/status-communication/status-communication.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  providers: [MessageService],
})
export class VerifyEmailComponent extends BaseComponent implements OnInit {
  constructor(
    protected override spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private storeUserInfoService: StoreUserInfoService,
    private router: Router,
    private messageService: MessageService,
    private statusCommunicationService: StatusCommunicationService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    console.log(token);
    this.storeUserInfoService.verifyEmail(token!).subscribe({
      next: () => this.noError(),
      error: () => this.hasError(),
    });
  }

  noError(): void {
    this.spinnerShow();
    this.statusCommunicationService.saveMessage('Your email has been successfully verified', 'success');
    this.router.navigate(['/home']);
  }

  hasError(): void {
    this.spinnerShow();
    this.statusCommunicationService.saveMessage('Your verification link is invalid. Please contact us if you need another link.', 'error');
    this.router.navigate(['/home']);
  }
}
