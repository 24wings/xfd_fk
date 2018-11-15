import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ModeEnum } from '../../../../util/meta/Mode.enum';
import { RefTableComSpec } from '../../../../util/spec/field/ref-table.comspec';
import { AbstractTree } from '../../../../util/struct/AbstractTree';
import { ValidStatusEnum } from '../../../../util/meta/ValidStatus.enum';
import { listToNzTreeNode } from '../../../../util/struct/listToTree';
import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd';
import { CheckOneDataAction } from '../../../../util/event/check/check-one-data-action.event';
import { QueryParam } from '../../../../util/stq/QueryParameter';
import { ValidService } from 'app/libs/meta-ui/service/validate.service';

@Component({
  selector: 'field-lazy-ref-tree-zorro',
  templateUrl: './field-lazy-ref-tree-zorro.component.html',
  styleUrls: ['./field-lazy-ref-tree-zorro.component.css']
})
export class FieldLazyRefTreeZorroComponent extends RefTableComSpec implements OnInit {
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
      if (this.mode == ModeEnum.Create) {
        dataSet[0].checked = true;
      }
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
    this.__value__ = val + '';

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
    let items: AbstractTree<any>[] = this.__dataSet__.map(item => {
      let data = Object.assign(new this.metaCom.view.treeClass(), item);
      return data;
    }
    );
    if (this.mode == ModeEnum.Create) {
      if (items.length > 0)
        this.valueChange.emit(items[0].getId());


    }
    items.forEach(item => item.selected = true);

    // if (this.mode == ModeEnum.Show) {
    // if (items.length > 0)
    // items[0].checked = true;
    // }
    let nodes = listToNzTreeNode(items);
    this.nodes = nodes;
  }

  async ngOnInit() {
    if (this.mode != ModeEnum.Show) {
      await this.query();
      console.log(this.dataSet);
    } else {
      if (this.mode == ModeEnum.Show)
        await this.query();
    }
    // 创建模式 默认选中第一条数据
    if (this.mode == ModeEnum.Create) {
      this.valueChange.emit();

    }

  }
  async select($event: { node: NzTreeNode }) {
    if (!$event.node.isSelected) {
      $event.node.setSelected(true);
      $event.node.isSelected = true;
      this.value = $event.node.key;
      console.log($event.node);
      await new Promise(resolve => setTimeout(() => resolve(true), 100))
      this.select($event);

    } else {
      this.valueChange.emit($event.node.key);
    }

  }
  check($event: { node: NzTreeNode }) {
    return this.onAction.emit(Object.assign(new CheckOneDataAction(), { metaCom: this.metaCom, data: $event.node.origin.origin, checked: $event.node.isSelected } as CheckOneDataAction<any>))
  }
  async  query() {
    let param = new QueryParam();
    if (this.metaCom.data.presetConditions) {
      if (typeof this.metaCom.data.presetConditions == 'function') {
        param.queryConditions = this.metaCom.data.presetConditions();
      } else {
        param.queryConditions = this.metaCom.data.presetConditions;
      }
    }
    return this.onQuery.emit({ metaCom: this.metaCom, queryParam: param, field: this.field, keyword: '', page: 0, pageSize: 1000 })
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
