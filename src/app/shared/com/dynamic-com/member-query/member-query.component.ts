import { Component, OnInit } from '@angular/core';
import { IDataStrategy } from '@core/service/data-strategy/IDataStrategy';
import { CustomQueryToolbarComSpec } from '@core/util/spec/custom/custom-query-toolbar';
import { QueryParam } from '@core/util/stq/QueryParameter';
import { Member } from 'app/projects/xfd_fk/entity/Member';

@Component({
  selector: 'member-query',
  templateUrl: './member-query.component.html',
  styleUrls: ['./member-query.component.css']
})
export class MemberQueryComponent extends CustomQueryToolbarComSpec implements OnInit {
  mealCardNo: string = '';
  name: string = '';
  async query() {
    let queryparam = new QueryParam();
    queryparam.queryConditions = [];
    if (this.mealCardNo) {
      queryparam.queryConditions.push({ field: 'mealCardNo', compare: "like", andOr: "and", value: this.mealCardNo })
    }
    if (this.name) {
      queryparam.queryConditions.push({ field: 'name', compare: "like", andOr: "and", value: this.name })
    }

    let result = await this.dataStrategy.entityQuery(this.metaCom, queryparam);
    this.queryResult.emit(result.paging);

  }
  constructor(public dataStrategy: IDataStrategy) { super() }

  ngOnInit() {
  }

}
