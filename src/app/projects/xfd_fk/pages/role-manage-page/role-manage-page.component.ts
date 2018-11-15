import { Component, OnInit, ViewChild } from '@angular/core';
import { getMetaEntity } from '@core/util/meta/MetaEntity';
import { RoleManage } from 'app/blueprint/rbac/meta/RoleManage';
import { U, C, D } from '@core/util/meta/Power';
import { MetaCom } from '@core/util/meta/MetaCom';
import { OrgManage } from 'app/blueprint/rbac/meta/OrgManage';
import { MetaObjectComponent } from 'app/libs/meta-ui/com/meta-object/meta-object.component';

@Component({
  selector: 'role-manage-page',
  templateUrl: './role-manage-page.component.html',
  styleUrls: ['./role-manage-page.component.css']
})
export class RoleManagePageComponent implements OnInit {
  power: number = C | U | D;
  orgMetaCom: MetaCom = getMetaEntity(OrgManage);
  roleMetaCom = getMetaEntity(RoleManage);
  @ViewChild('roleMetaObjectComponent') roleMetaObjectComponent: MetaObjectComponent;
  constructor() { }

  ngOnInit() {
  }
  doAction($event) {
    console.log($event);
    this.roleMetaObjectComponent.query({ orgId: $event.data.orgId })
  }

}
