import { Component, Input, OnInit } from '@angular/core';
import { MemberStatus } from '../../constants/member-status';
import { MAX_REGISTRATION } from '../../constants/reg-status';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-group-member-list',
  templateUrl: './group-member-list.component.html',
  styleUrls: ['./group-member-list.component.scss']
})
export class GroupMemberListComponent implements OnInit {
  @Input() userGroupList !: User[];

  ngOnInit(): void{
    if (this.userGroupList == undefined){
      this.userGroupList = [];
    }
  }

  hasConfirmed(index: number): boolean{
    return this.userGroupList[index]?.confirmed == true;
  }

  getNumVacancies(): number {
    return MAX_REGISTRATION - this.userGroupList.length;
  }

  hasVacancies(): boolean {
    return this.userGroupList.length < MAX_REGISTRATION;
  }
}
