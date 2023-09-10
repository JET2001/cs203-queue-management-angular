import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group-member-list',
  templateUrl: './group-member-list.component.html',
  styleUrls: ['./group-member-list.component.scss']
})
export class GroupMemberListComponent {
  @Input() memberEmailList : string[] = [];
  @Input() confirmList: number[] = [];

  hasConfirmed(index: number): boolean{
    return this.confirmList[index] == 1;
  }
}
