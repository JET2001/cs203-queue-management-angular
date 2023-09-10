import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group-member-list',
  templateUrl: './group-member-list.component.html',
  styleUrls: ['./group-member-list.component.scss']
})
export class GroupMemberListComponent {
  @Input() memberEmailList : string[] = [];
  @Input() confirmList: number[] = [];

  ngOnInit(): void{
    if (this.memberEmailList.length != this.confirmList.length) {
      console.log("GroupMemberListError: MemberEmailList is not the same as confirmlist!");
    }
  }
  hasConfirmed(index: number): boolean{
    return this.confirmList[index] == 1;
  }

  getNumVacancies(): number {
    return 3 - this.memberEmailList.length;
  }

  hasVacancies(): boolean {
    return this.memberEmailList.length < 3;
  }
}
