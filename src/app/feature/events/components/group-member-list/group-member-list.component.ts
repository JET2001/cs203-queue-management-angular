import { Component, Input } from '@angular/core';
import { MemberStatus } from '../../constants/member-status';

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
    return 3 - this.memberEmailList.length;
  }

  hasVacancies(): boolean {
    return this.memberEmailList.length < 3;
  }
}
