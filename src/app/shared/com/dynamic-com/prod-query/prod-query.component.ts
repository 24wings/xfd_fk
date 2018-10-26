import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomQueryToolbarComSpec } from '@core/util/spec/custom/custom-query-toolbar';
import { City } from 'app/projects/hk/entity/City';
// import { CommonService } from '@core/service/common.service';
// import { EntityEnum } from '../../../../entity.enum';

@Component({
  selector: 'prod-query',
  templateUrl: './prod-query.component.html',
  styleUrls: ['./prod-query.component.css']
})
export class ProdQueryComponent extends CustomQueryToolbarComSpec implements OnInit {
  citys: City[] = [];
  fromCity: string;
  toCity: string;
  fromDate: Date;
  toDate: Date;
  dateFormat = 'yyyy/MM/dd';

  // async listCitys() {
  //   let result = await this.commonService.singleTableQueryPageParameter(EntityEnum.City, { queryConditions: [], pageParameter: { pageSize: 1000, pageIndex: 0 } })
  //   this.citys = result.paging.rows;
  // }

  // constructor(public commonService: CommonService) { super() }
  // async query() {
  //   let result = await this.commonService.singleTableQueryPageParameter(this.metaCom.objectCode, {
  //     queryConditions: [
  //       { field: 'Product_boundFlight.startCityCode', compare: ':', value: this.fromCity, andOr: 'and' },
  //       // { field: '.boundFlight.stopAirportCode', compare: ':', value: this.toCity, andOr: 'and' },
  //       { field: 'boundDates', compare: ':', value: this.fromDate.format('yyyyMMdd'), andOr: 'and' },
  //       { field: 'returnDates', compare: ':', value: this.toDate.format('yyyyMMdd'), andOr: 'and' },

  //     ], pageParameter: { pageSize: 1000, pageIndex: 0 }
  //   })
  //   this.rowsChange.emit(result.paging.rows);
  // }
  ngOnInit() {
    // this.listCitys()
  }
  submitChange($event) {
    // this.fromDate = $event
  }
  submitToDate($event) {
    // this.toDate = $event;
  }
}
