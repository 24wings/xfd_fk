import { Component, OnInit } from '@angular/core';
import { ValidService } from '@core/service/validate.service';
import { CustomQueryToolbarComSpec } from '@core/util/spec/custom/custom-query-toolbar';
import { QueryParam } from '@core/util/stq/QueryParameter';
import { IDataStrategy } from '@core/service/data-strategy/IDataStrategy';
import { Member } from 'app/projects/hk/entity/Member';
import { XfdFxEntityEnum } from 'app/projects/xfd_fk/xfd_fk.EntityEnum';
import { MyHttpService } from '@core/service/http.service';
import { ISummary } from '@core/util/meta/Summary';
import { XFD_FKDbName } from 'app/projects/xfd_fk';
import { Order } from 'app/projects/xfd_fk/entity/Order';
import { ModeEnum } from '@core/util/meta/Mode.enum';
@Component({
  selector: 'analyze-query-toolbar',
  templateUrl: './analyze-query-toolbar.component.html',
  styleUrls: ['./analyze-query-toolbar.component.css']
})
export class AnalyzeQueryToolbarComponent extends CustomQueryToolbarComSpec implements OnInit {
  dateFormat = 'yyyy/MM/dd';
  dateRange: [Date, Date] = [new Date(2018, 10, 10, 0, 0, 0), new Date(2018, 10, 11, 23, 59, 59)] as any;
  ModeEnum = ModeEnum;
  state: ModeEnum = ModeEnum.Query;
  constructor(public valid: ValidService, private dataStrategy: IDataStrategy, public http: MyHttpService) { super() }

  ngOnInit() {

  }

  async query(pageIndex = 0) {
    let param = new QueryParam();
    param.pageParam = { pageIndex, pageSize: 10 };

    if (this.dateRange.length > 1) {
      let members = await this.dataStrategy.entityQuery(this.metaCom, param);

      let memberIds = members.paging.rows.map((member: Member) => member.code);
      this.dateRange[0].setHours(0);
      this.dateRange[0].setMinutes(0);
      this.dateRange[0].setSeconds(0);
      this.dateRange[1].setHours(23);
      this.dateRange[1].setMinutes(59);
      this.dateRange[1].setSeconds(59);
      param.queryConditions = [
        { field: "actTime", compare: ">", value: this.dateRange[0].format('yyyy-MM-dd hh:mm:ss'), andOr: "and" },
        { field: "actTime", compare: "<", value: this.dateRange[1].format('yyyy-MM-dd hh:mm:ss'), andOr: "and" },
        { field: "buyMerchCode", compare: "in", value: '(' + memberIds.join(',') + ')', andOr: "and" }

      ];
      let memberQuery = new QueryParam();
      memberQuery.pageParam = { pageIndex: 0, pageSize: 400, pageable: false, sortByAsc: true, "sortField": "" } as any;
      memberQuery.queryConditions = [
        { field: "actTime", compare: ">", value: this.dateRange[0].format('yyyy-MM-dd hh:mm:ss'), andOr: "and" },
        { field: "actTime", compare: "<", value: this.dateRange[1].format('yyyy-MM-dd hh:mm:ss'), andOr: "and" },
        // { field: "buyMerchCode", compare: "in", value: '(' + memberIds.map(id => `'${id}'`).join(',') + ')', andOr: "and" }
      ];
      let orders = await this.dataStrategy.entityQuery({ objectCode: XfdFxEntityEnum.Order } as any, memberQuery);
      debugger;
      members.paging.rows.forEach((member: Member) => {
        let arr = orders.paging.rows
          .filter(order => order.buyMerchCode == member.code && order.orderType == "RECHARGE");
        if (arr.length > 0) {
          if (arr.length > 1) {

            member.recharge = arr.map(order => order.amount).reduce((amount1, amount2) => amount1 + amount2);
            if (!member.recharge) {
              debugger;
            }
          } else {
            member.recharge = arr[0].amount;
          }
        } else {
          debugger;
          member.recharge = 0;
        }
      });
      members.paging.rows.forEach((member: Member) => {
        let arr = orders.paging.rows
          .filter(order => order.buyMerchCode == member.code && order.orderType == "TRANS" && order.amount);
        if (arr.length > 0) {
          member.money = arr.map(order => order.amount).reduce((amount1, amount2) => amount1 + amount2);
        } else {
          member.money = 0;
        }
      });
      let summarys: ISummary[] = [];
      this.metaCom.metaFields.filter(field => field.summarys).forEach(field => summarys.push(...field.summarys))
      let summaryQuery = new QueryParam();
      summaryQuery.queryConditions = [
        { field: "actTime", compare: ">", value: this.dateRange[0].format('yyyy-MM-dd hh:mm:ss'), andOr: "and" },
        { field: "actTime", compare: "<", value: this.dateRange[1].format('yyyy-MM-dd hh:mm:ss'), andOr: "and" }
      ];
      let summaryOrders = orders;  //= await this.dataStrategy.entityQuery({ objectCode: XfdFxEntityEnum.Order } as any, summaryQuery);
      console.log(summaryOrders);
      let totalOrders: Order[] = summaryOrders.paging.rows;
      let rechargeOrders = totalOrders.filter(o => o.orderType == "RECHARGE");
      let transOrders = totalOrders.filter(o => o.orderType == "TRANS");
      console.log(rechargeOrders);
      this.queryResult.emit({
        rows: members.paging.rows,
        count: members.paging.count,
        summary: {
          money: transOrders.length > 0 ? transOrders.map(o => o.amount).reduce((m1, m2) => m1 + m2) : 0,
          recharge: this.getMoney(rechargeOrders)
        }
      });
    }
  }

  getMoney(orders: Order[]) {
    if (orders.length > 0) {
      if (orders.length > 1) {

        return orders.map(o => o.amount).reduce((m1, m2) => m1 + m2);
      } else {
        return orders[0].amount;
      }
    } else {
      return 0;
    }
  }

}
