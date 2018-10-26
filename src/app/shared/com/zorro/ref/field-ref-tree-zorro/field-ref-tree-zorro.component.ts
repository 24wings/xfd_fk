import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd';
import { ValidService } from '@core/service/validate.service';
import { RefTableComSpec } from '@core/util/spec/field/ref-table.comspec';
import { ValidStatusEnum } from '@core/util/meta/ValidStatus.enum';
import { ModeEnum } from '@core/util/meta/Mode.enum';
import { listToNzTreeNode } from '@core/util/struct/listToTree';
import { CheckOneDataAction } from '@core/util/event/check/check-one-data-action.event';
import { AbstractTree } from '@core/util/struct/AbstractTree';

@Component({
  selector: 'field-ref-tree-zorro',
  templateUrl: './field-ref-tree-zorro.component.html',
  styleUrls: ['./field-ref-tree-zorro.component.css']
})
export class FieldRefTreeZorroComponent extends RefTableComSpec implements OnInit {
  __dataSet__: any[] = [];
  alias: string;
  @Output() onAction = new EventEmitter();
  @Input() set dataSet(dataSet: any[]) {
    this.__dataSet__ = dataSet;
    if (this.mode == ModeEnum.Show) {
      this.dataSet.find(dataItem => dataItem[this.field.fieldName] == this.value);
      console.log(this.value, this.dataSet)
      let selectedValue = this.dataSet.find(item => Object.assign((new this.field.config.databaseType() as AbstractTree<any>), item).getId() == this.value);
      if (selectedValue) {
        this.alias = (Object.assign(new this.field.config.databaseType(), selectedValue) as AbstractTree<any>).getText();
      }
    } else {
      this.parseTree();

    }
  }
  get dataSet() {
    return this.__dataSet__;
  }

  validStatus: ValidStatusEnum = ValidStatusEnum.success;
  errMsg: string;
  ModeEnum = ModeEnum;
  checkedIds: string[] = [];
  checkedId: string;
  @Input() set value(val: any) {
    let result = this.validService.valid(val, this.field.valid);
    if (result.ok) {
      this.validStatus = ValidStatusEnum.success;
      this.errMsg = "";
    } else {
      this.validStatus = ValidStatusEnum.error;
      this.errMsg = result.msg;
    }
    this.__value__ = val;

    if (this.mode == ModeEnum.Show) {
      let selectedValue = this.dataSet.find(item => Object.assign((new this.field.config.databaseType() as AbstractTree<any>), item).getId() == this.value);
      if (selectedValue) {
        this.alias = (Object.assign(new this.field.config.databaseType(), selectedValue) as AbstractTree<any>).getText();
      }
      console.log(this.value, selectedValue)
      this.parseTree()
    }
  }
  get value() {
    return this.__value__ + '';
  }
  nodes: NzTreeNode[] = [];
  page: number = 1;
  total: number = 10;
  constructor(public validService: ValidService) { super(validService) }
  parseTree() {
    this.nodes = listToNzTreeNode(this.__dataSet__.map(item => {
      let data = Object.assign(new this.metaCom.view.treeClass(), item);
      return data;
    }
    ));
    if (this.mode != ModeEnum.Show) {
      if (this.nodes[0])
        this.value = this.nodes[0].key;
      console.log(this.nodes, this.__value__)
    }
  }

  async ngOnInit() {
    if (this.mode != ModeEnum.Show) {
      await this.query();
      console.log(this.dataSet);
    } else {
      if (this.mode == ModeEnum.Show)
        await this.query();
    }
  }
  select($event: { node: NzTreeNode }) {
    this.valueChange.emit(parseInt($event.node.key));
  }
  check($event: { node: NzTreeNode }) {
    return this.onAction.emit(Object.assign(new CheckOneDataAction(), { metaCom: this.metaCom, data: $event.node.origin.origin, checked: $event.node.isSelected } as CheckOneDataAction<any>))
  }
  async  query() {
    return this.onQuery.emit({ metaCom: this.metaCom, field: this.field, keyword: '', page: 0, pageSize: 1000 })
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
