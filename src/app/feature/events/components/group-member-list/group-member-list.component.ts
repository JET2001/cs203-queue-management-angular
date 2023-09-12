import { Component, Input } from '@angular/core';
import { MemberStatus } from '../../constants/member-status';
import { MAX_REGISTRATION } from '../../constants/reg-status';

@Component({
  selector: 'app-group-member-list',
  templateUrl: './group-member-list.component.html',
  styleUrls: ['./group-member-list.component.scss']
})
export class GroupMemberListComponent {
  @Input() memberEmailList : string[] = [];
  @Input() confirmList: number[] = [];

  hasConfirmed(index: number): boolean{
    return this.confirmList[index] == MemberStatus.CONFIRM;
  }

  getNumVacancies(): number {
    return MAX_REGISTRATION - this.memberEmailList.length;
  }

  hasVacancies(): boolean {
    return this.memberEmailList.length < MAX_REGISTRATION;
  }
}
