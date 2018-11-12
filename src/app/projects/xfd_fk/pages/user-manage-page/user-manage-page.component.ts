import { Component, OnInit, ViewChild } from '@angular/core';
import { D, U, C } from '@core/util/meta/Power';
import { OrgManage } from 'app/blueprint/rbac/meta/OrgManage';
import { MetaCom } from '@core/util/meta/MetaCom';
import { getMetaEntity } from '@core/util/meta/MetaEntity';
import { MetaObjectComponent } from '@shared/com/meta-object/meta-object.component';
import { UserManage } from 'app/blueprint/rbac/meta/UserManage';

@Component({
  selector: 'user-manage-page',
  templateUrl: './user-manage-page.component.html',
  styleUrls: ['./user-manage-page.component.css']
})
export class UserManagePageComponent implements OnInit {

  power: number = C | U | D;
  orgMetaCom: MetaCom = getMetaEntity(OrgManage);
  userMetaCom = getMetaEntity(UserManage);
  @ViewChild('userMetaObjectComponent') userMetaObjectComponent: MetaObjectComponent;
  constructor() { }

  ngOnInit() {
  }
  doAction($event) {
    console.log($event);
    this.userMetaObjectComponent.query({ orgId: $event.data.orgId })
  }
}
