import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd';
import { ValidService } from '@core/service/validate.service';
import { RefTableComSpec } from '@core/util/spec/field/ref-table.comspec';
import { MetaCom } from '@core/util/meta/MetaCom';
import { ModeEnum } from '@core/util/meta/Mode.enum';
import { Field } from '@core/util/meta/Field';
import { ValidStatusEnum } from '@core/util/meta/ValidStatus.enum';
import { listToNzTreeNode } from '@core/util/struct/listToTree';
import { IDataStrategy } from '@core/service/data-strategy/IDataStrategy';
import { QueryParam } from '@core/util/stq/QueryParameter';

@Component({
  selector: 'field-ref-tree-many-zorro',
  templateUrl: './field-ref-tree-many-zorro.component.html',
  styleUrls: ['./field-ref-tree-many-zorro.component.css']
})
export class FieldRefTreeManyZorroComponent extends RefTableComSpec implements OnInit {
  @Input() metaCom: MetaCom;
  @Input() mode: ModeEnum;
  @Input() field: Field;

  __dataSet__ = []
  @Input() set dataSet(dataSet: any[]) {
    this.__dataSet__ = dataSet;
    if (this.__dataSet__)
      if (this.__dataSet__.length > 0)
        this.parseCheckedTree();
    console.log('dataset,', dataSet)
  }
  get dataSet() {
    return this.__dataSet__;
  }

  @Input() set value(rows: any) {
    if (typeof rows == 'string') {
      this.__value__ = rows.split(',');
    } else {
      this.__value__ = rows;
    }
    let result = this.validService.valid(rows, this.field.valid);
    if (result.ok) {
      this.validStatus = ValidStatusEnum.success;
      this.errMsg = "";
    } else {
      this.validStatus = ValidStatusEnum.error;
      this.errMsg = result.msg;
    }
    this.parseCheckedTree();
    if (this.mode == ModeEnum.Update) {
      console.log(rows, '========================')
      if (Array.isArray(rows)) {

      } else {
        // let param = new QueryParam();
        // let pk = this.field.metaObject.metaFields.find(filed => filed.isPk);
        // param.queryConditions = [{ field: pk.fieldName, compare: "=", andOr: "and", value: `(${rows})` }]
        // this.dataStrategy.entityQuery(this.field.metaObject, param);
      }
      this.valueChange.emit(rows);
    }
  }
  get value() {
    return this.__value__;
  }
  nodes: NzTreeNode[] = [];
  page: number = 1;
  total: number = 10;
  constructor(public validService: ValidService, public dataStrategy: IDataStrategy) { super(validService) }

  parseCheckedTree() {
    if (!this.value) this.value = []
    if (this.mode == ModeEnum.Show) {
      this.nodes = listToNzTreeNode(this.__dataSet__.map(item => {
        let data = Object.assign(new this.metaCom.view.treeClass(), item);
        data.checked = !!this.value.find(id => id == data.getId());
        data.disabled = this.mode == ModeEnum.Show;
        return data;
      })
        .filter(item => item.checked));
    } else {
      this.nodes = listToNzTreeNode(this.__dataSet__.map(item => {
        let data = Object.assign(new this.metaCom.view.treeClass(), item);
        data.checked = !!this.value.find(id => id == data.getId());
        data.disabled = this.mode == ModeEnum.Show;
        return data;
      }));
    }

  }
  ngOnInit() {
    console.log(this.value)
    this.query()
  }

  select($event: { node: NzTreeNode }) {
    this.valueChange.emit(parseInt($event.node.key));

  }
  check($event: { node: NzTreeNode }) { }
  async  query() {
    this.onQuery.emit({ metaCom: this.metaCom, keyword: '', page: 0, pageSize: 1000 })
  }

  checkMany() {
    let ids: string[] = [];
    this.nodes.forEach(node => ids.push(...this.getCheckedMenuIds(node)));
    this.value = ids;
    this.valueChange.emit(ids);
  }
  getCheckedMenuIds(menu: NzTreeNode | NzTreeNodeOptions): string[] {
    let checkedMenuIds: string[] = [];
    if ((menu as NzTreeNode).isChecked || (menu as NzTreeNode).isHalfChecked || (menu as NzTreeNodeOptions).checked) checkedMenuIds.push(menu.key);
    if (menu.children.length > 0) {
      for (let child of menu.children) {
        checkedMenuIds.push(...this.getCheckedMenuIds(child));
      }
    }
    return checkedMenuIds;
  }



}
