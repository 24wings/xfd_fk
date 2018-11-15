import { Component, OnInit } from '@angular/core';
import { ValidService } from '../../../../service/validate.service';
import { NzMessageService } from 'ng-zorro-antd';
import { RefTableComSpec } from '../../../../util/spec/field/ref-table.comspec';
import { Field } from '../../../../util/meta/Field';
import { ModeEnum } from '../../../../util/meta/Mode.enum';
import { IDataStrategy } from '../../../../service/data-strategy/IDataStrategy';
import { getMetaEntity } from '../../../../util/meta/MetaEntity';
import { QueryParam } from '../../../../util/stq/QueryParameter';
import { RefTree } from '../../../../util/meta/types/RefTree';
import { RefTreees } from '../../../../util/meta/types/RefTreees';
import { RefTable } from '../../../../util/meta/types/RefTable';
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

  constructor(public validService: ValidService, public message: NzMessageService, private dataStrategy: IDataStrategy) { super(validService) }
  async ngOnInit() {
    console.log(this.value);
    if (this.mode == ModeEnum.Update || this.mode == ModeEnum.Show) {
      let metaCom = getMetaEntity(this.field.config.databaseType);
      let param = new QueryParam();
      if (this.value) {
        if (Array.isArray(this.value)) {
          return;
        }
        console.warn(this.value);
        param.queryConditions = [{ field: "roleId", "compare": "in", value: "(" + this.value + ")", andOr: "and" }];
        let result = await this.dataStrategy.entityQuery(metaCom, param);
        this.value = result.paging.rows;
        debugger;
        if (this.value.length == 0) {
          this.value = null;
        }

      } else {
        param.queryConditions = [];
      }

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
    let param = new QueryParam();
    param.queryConditions = [];
    if (this.field.config)
      if (this.field.config.searchKey) {
        if (Array.isArray(this.field.config.searchKey)) {
          param.queryConditions.push(...this.field.config.searchKey
            .map(key => { return { field: key, compare: "like", value: this.keyword, andOr: "or" as any } }));
        } else {
          param.queryConditions.push({ field: this.field.fieldName, compare: "like", value: this.keyword, andOr: "and" as any })
        }
        query[this.field.config.searchKey] = { $like: this.keyword };

      }
    if (this.field) {
      if (this.field.metaObject)
        if (this.field.metaObject.data)
          if (this.field.metaObject.data.presetConditions) {
            if (typeof this.field.metaObject.data.presetConditions == 'function') {
              param.queryConditions = this.field.metaObject.data.presetConditions()
            } else {
              param.queryConditions = this.field.metaObject.data.presetConditions;
            }
          }
    }
    this.onQuery.emit({ metaCom: this.metaCom, queryParam: param, keyword: this.keyword });

  }
  getUpdateCheckedRoles() {

  }
  checked(data) {
    data.checked = !data.checked
  }
  clearSelected(i) {
    this.value.splice(i, 1);
    if (this.value.length == 0) this.value = null;
  }
  close() {
    this.selecting = false;
  }
  comfirm() {
    this.valueChange.emit(this.dataSet.filter(data => data.checked))
    console.log(`confirm:`, this.value, this.dataSet.filter(data => data.checked))
    this.selecting = false;
  }

  filterTable(fields: Field[]) {
    return fields.filter(field => ([RefTree, RefTreees, RefTable].indexOf(field.type as any) == -1))
  }
}
