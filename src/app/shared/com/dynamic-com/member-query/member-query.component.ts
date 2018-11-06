import { Component, OnInit } from '@angular/core';
import { IDataStrategy } from '@core/service/data-strategy/IDataStrategy';
import { CustomQueryToolbarComSpec } from '@core/util/spec/custom/custom-query-toolbar';
import { QueryParam } from '@core/util/stq/QueryParameter';
import { Member } from 'app/projects/xfd_fk/entity/Member';
import { XfdFxEntityEnum } from 'app/projects/xfd_fk/xfd_fk.EntityEnum';
import { MetaCom } from '@core/util/meta/MetaCom';
import { MemberGroup } from 'app/projects/xfd_fk/entity/MemberGroup';

@Component({
  selector: 'member-query',
  templateUrl: './member-query.component.html',
  styleUrls: ['./member-query.component.css']
})
export class MemberQueryComponent extends CustomQueryToolbarComSpec implements OnInit {
  mealCardNo: string = '';
  name: string = '';
  singleValue = '';
  groupsOptions: { label: string, value: number }[] = []
  async query() {
    let queryparam = new QueryParam();
    queryparam.queryConditions = [];
    if (this.mealCardNo) {
      queryparam.queryConditions.push({ field: 'mealCardNo', compare: "like", andOr: "and", value: this.mealCardNo })
    }
    if (this.name) {
      queryparam.queryConditions.push({ field: 'name', compare: "like", andOr: "and", value: this.name })
    }
    if (this.singleValue) {
      queryparam.queryConditions.push({ field: 'groupId', compare: "=", andOr: "and", value: this.singleValue })

    }

    let result = await this.dataStrategy.entityQuery(this.metaCom, queryparam);
    this.queryResult.emit(result.paging);
  }
  constructor(public dataStrategy: IDataStrategy) { super() }

  async  ngOnInit() {
    this.loadGroupOptions();
  }
  async loadGroupOptions() {
    let groupsResult = await this.dataStrategy.entityQuery({ objectCode: XfdFxEntityEnum.MemberGroup as any } as MetaCom, new QueryParam())
    this.groupsOptions = groupsResult.paging.rows.map((item: MemberGroup) => { return { label: item.name, value: item.id } });

  }

}
