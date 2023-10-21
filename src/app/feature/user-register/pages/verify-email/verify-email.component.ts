import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/base/base.component';
import { StoreUserInfoService } from 'src/app/shared/services/store-user-info/store-user-info.service';

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
    private messageService: MessageService
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

  noError() {
    this.spinnerShow();
    console.log('here');
    this.router.navigate(['/home']);
  }

  hasError() {
    this.spinnerShow();
    this.router.navigate(['/home']);
    this.messageService.add({
      severity: 'error',
      summary: 'Token is invalid',
    });
  }
}
