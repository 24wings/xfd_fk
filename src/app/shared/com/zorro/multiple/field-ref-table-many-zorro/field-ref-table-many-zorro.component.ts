import { Component, OnInit } from '@angular/core';
import { ValidService } from '@core/service/validate.service';
import { NzMessageService } from 'ng-zorro-antd';
import { RefTableComSpec } from '@core/util/spec/field/ref-table.comspec';
import { Field } from '@core/util/meta/Field';
@Component({
  selector: 'field-ref-table-many-zorro',
  templateUrl: './field-ref-table-many-zorro.component.html',
  styleUrls: ['./field-ref-table-many-zorro.component.css']
})
export class FieldRefTableManyZorroComponent extends RefTableComSpec implements OnInit {
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

  constructor(public validService: ValidService, public message: NzMessageService) { super(validService) }
  ngOnInit() {
    console.log(this.value)
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
    if (this.field.config)
      if (this.field.config.searchKey) {
        query[this.field.config.searchKey] = { $like: this.keyword };

      }
    if (this.field) {
      if (this.field.metaObject)
        if (this.field.metaObject.data)
          if (this.field.metaObject.data.presetObject) {
            query = Object.assign(query, this.field.metaObject.data.presetObject)
          }
    }
    this.onQuery.emit({ metaCom: this.metaCom, keyword: this.keyword });

  }
  checked(data) {
    data.checked = !data.checked
  }
  clearSelected(i) {
    this.value.splice(i, 1);
  }
  close() {
    this.selecting = false;
  }
  comfirm() {
    this.valueChange.emit(this.dataSet.filter(data => data.checked))
    this.selecting = false;
  }

}
