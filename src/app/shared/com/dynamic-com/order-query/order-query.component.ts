import { Component, OnInit } from '@angular/core';
import { CustomQueryToolbarComSpec } from '@core/util/spec/custom/custom-query-toolbar';
import { IDataStrategy } from '@core/service/data-strategy/IDataStrategy';
import { QueryCondition } from '@core/util/stq/QueryCondition';
import { Condition } from 'selenium-webdriver';
import { QueryParam } from '@core/util/stq/QueryParameter';

enum OrderType {
  TRANS, // 交易
  RECHARGE // 充值
}

@Component({
  selector: 'order-query',
  templateUrl: './order-query.component.html',
  styleUrls: ['./order-query.component.css']
})
export class OrderQueryComponent extends CustomQueryToolbarComSpec implements OnInit {
  cardNo: string;
  dateRange: Date[] = [];
  OrderTypeOptions: { label: string, value }[] = [{ label: "全部", value: false }, { label: "交易", value: 0 }, { label: "充值", value: 1 }]
  selectedOrderType;
  ngOnInit() {
  }

  async search() {
    let queryParam = new QueryParam();
    queryParam.queryConditions = []
    if (this.cardNo) {
      queryParam.queryConditions.push({ field: "cardNo", value: this.cardNo, andOr: "and", compare: "like" });
    }
    if (this.dateRange.length > 1) {
      queryParam.queryConditions.push({ field: "createTime", value: this.dateRange[0].format('yyyy-MM-dd hh:mm'), compare: ">", andOr: "and" })
      queryParam.queryConditions.push({ field: "createTime", value: this.dateRange[1].format('yyyy-MM-dd hh:mm'), compare: "<", andOr: "and" })
    }
    if (this.selectedOrderType || this.selectedOrderType === 0) {
      queryParam.queryConditions.push({ field: "orderType", value: this.selectedOrderType, compare: "=", andOr: "and" })
    }
    queryParam.orderList = [{ fieldName: "createTime", sort: "DESC" }];
    let data = await this.dataStrategy.entityQuery(this.metaCom, queryParam);
    this.queryResult.emit(data.paging);
  }
  constructor(public dataStrategy: IDataStrategy) {
    super();
  }

}
