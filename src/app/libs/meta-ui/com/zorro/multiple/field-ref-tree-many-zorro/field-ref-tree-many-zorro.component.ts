import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NzTreeNode, NzTreeNodeOptions, NzTreeComponent } from 'ng-zorro-antd';
import { ValidService } from '../../../../service/validate.service';
import { RefTableComSpec } from '../../../../util/spec/field/ref-table.comspec';
import { MetaCom } from '../../../../util/meta/MetaCom';
import { ModeEnum } from '../../../../util/meta/Mode.enum';
import { Field } from '../../../../util/meta/Field';
import { ValidStatusEnum } from '../../../../util/meta/ValidStatus.enum';
import { listToNzTreeNode, listToNzTreeNodeMany } from '../../../../util/struct/listToTree';
import { IDataStrategy } from '../../../../service/data-strategy/IDataStrategy';
import { QueryParam } from '../../../../util/stq/QueryParameter';
import { AbstractTree } from '../../../../util/struct/AbstractTree';

@Component({
  selector: 'field-ref-tree-many-zorro',
  templateUrl: './field-ref-tree-many-zorro.component.html',
  styleUrls: ['./field-ref-tree-many-zorro.component.css']
})
export class FieldRefTreeManyZorroComponent extends RefTableComSpec implements OnInit {
  @ViewChild('createTreeMany') createTreeMany: NzTreeComponent
  @Input() metaCom: MetaCom;
  @Input() mode: ModeEnum;
  @Input() field: Field;
  checkedKeys: string[] = [];

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
    // if (this.mode == ModeEnum.Update)
    // this.parseCheckedTree();
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
      this.nodes = listToNzTreeNodeMany(this.__dataSet__.map(item => {
        let data = Object.assign(new this.metaCom.view.treeClass(), item);
        data.checked = Array.isArray(this.value) ? !!this.value.find(id => id == data.getId()) : false;
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
    let param = new QueryParam();
    param.pageParam = { pageSize: 1000, pageIndex: 0 }
    param.queryConditions = [];
    if (this.field.config)
      // if (this.field.config.searchKey) {
      //   if (Array.isArray(this.field.config.searchKey)) {
      //     param.queryConditions.push(...this.field.config.searchKey
      //       .map(key => { return { field: key, compare: "like", value: this.keyword, andOr: "or" as any } }));
      //   } else {
      //     param.queryConditions.push({ field: this.field.fieldName, compare: "like", value: this.keyword, andOr: "and" as any })
      //   }
      //   query[this.field.config.searchKey] = { $like: this.keyword };

      // }
      if (this.field) {
        if (this.field.metaObject)
          if (this.field.metaObject.data)
            if (this.field.metaObject.data.presetConditions) {
              if (typeof this.field.metaObject.data.presetConditions == 'function') {
                param.queryConditions = this.field.metaObject.data.presetConditions();
              } else {
                param.queryConditions = this.field.metaObject.data.presetConditions;
              }
            }
      }
    this.onQuery.emit({ metaCom: this.metaCom, queryParam: param, keyword: '' })
  }

  checkMany($event) {
    if (this.mode == ModeEnum.Create) {
      console.log(this.createTreeMany.getCheckedNodeList(),
        this.createTreeMany.getHalfCheckedNodeList()
        //, this.nodes, $event, this.dataSet
      );

    }
    let ids: string[] = [];
    let nodesChecked = this.dataSet.filter(node => this.dataSet.find(item => this.getTree(item).getId() == node.key as any));
    console.log(nodesChecked);
    this.nodes.map(node => ids.push(...this.getCheckedMenuIds(node)));
    console.log(ids);
    this.value = ids.join(',');
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
  getTree(item) {
    return Object.assign(new this.field.metaObject.originClass(), item) as AbstractTree<any>
  }


}
