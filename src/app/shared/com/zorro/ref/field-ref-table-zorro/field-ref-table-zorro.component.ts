import { Component, OnInit, EventEmitter, Output, HostListener } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ValidService } from '@core/service/validate.service';
import { AppConfig } from '../../../../../app.config';
import { RefTableComSpec } from '@core/util/spec/field/ref-table.comspec';
import { Field } from '@core/util/meta/Field';
import { ModeEnum } from '@core/util/meta/Mode.enum';
import { IDataStrategy } from '@core/service/data-strategy/IDataStrategy';
import { QueryParam } from '@core/util/stq/QueryParameter';
@Component({
  selector: 'app-field-ref-table-zorro',
  templateUrl: './field-ref-table-zorro.component.html',
  styles: []
})
export class FieldRefTableZorroComponent extends RefTableComSpec implements OnInit {
  page: number = 1;
  selecting: boolean = false;
  pageSize: number = 10;
  count: number = 10;
  keyword: string = "";
  __value__: any | any[];

  // @HostListener('keyup', ['$event'])
  onKeyboard($event: KeyboardEvent) {
    console.warn('hello left down')
    if (this.selecting) {
      let checkedIndex: any;
      switch ($event.key) {
        case "ArrowDown":
          checkedIndex = this.dataSet.findIndex(data => data.checked);
          if (checkedIndex == -1 || checkedIndex == this.dataSet.length - 1) {
            this.dataSet.forEach(data => data.checked = false);
            this.dataSet[0].checked = true;
          } else {
            this.dataSet.forEach(data => data.checked = false);
            this.dataSet[checkedIndex + 1].checked = true;
          }
          this.dataSet
          break;
        case "ArrowUp":
          checkedIndex = this.dataSet.findIndex(data => data.checked);
          if (checkedIndex == -1 || checkedIndex == 0) {
            this.dataSet.forEach(data => data.checked = false);
            this.dataSet[this.dataSet.length - 1].checked = true;
          } else {
            this.dataSet.forEach(data => data.checked = false);
            this.dataSet[checkedIndex - 1].checked = true;
          }
          break;
        case "Enter":
          let checkedData = this.dataSet.filter(data => data.checked);
          this.valueChange.emit(checkedData[0]);
          this.keyword = checkedData[0][this.field.config.searchKey]
          if (this.selecting)
            this.selecting = false;
          break;
      }
    }
  }
  constructor(
    public appConfig: AppConfig,
    public validService: ValidService,
    public message: NzMessageService, public dataStrategy: IDataStrategy) { super(validService) }
  async ngOnInit() {
    if ((this.mode == ModeEnum.Show || this.mode == ModeEnum.Update) && this.value) {
      let pk = this.field.metaObject.metaFields.find(field => field.isPk);
      let queryParam = new QueryParam();

      queryParam.queryConditions = [{
        field: pk.fieldName,
        compare: "=",
        andOr: "and",
        value: (typeof this.value == 'object') ? this.value[pk.fieldName] : this.value
      }]
      let data = await this.dataStrategy.entityQuery(this.field.metaObject, queryParam);
      this.value = data.paging.rows[0];
    }
  }
  alias(value, field: Field) {
    if (field.options) {
      let option = field.options.find(op => op.value == value);
      if (option) {
        return option.alias;
      } else {
        return value;
      }
    } else {
      return value;
    }
  }
  async query() {
    let query = {};
    // if (this.field.config)
    //   if (this.field.config.searchKey) {
    //     query[this.field.config.searchKey] = { $like: this.keyword };

    //   }
    // if (this.field) {
    //   if (this.field.metaObject)
    //     if (this.field.metaObject.data)
    //       if (this.field.metaObject.data.presetObject) {
    //         query = Object.assign(query, this.field.metaObject.data.presetObject)
    //       }
    // }
    this.onQuery.emit({ metaCom: this.metaCom, field: this.field, keyword: this.keyword });

  }
  checked(data) {
    this.valueChange.emit(data);
    this.selecting = false;
  }
  clearSelected(i) {
    this.value.splice(i, 1);
  }




}
