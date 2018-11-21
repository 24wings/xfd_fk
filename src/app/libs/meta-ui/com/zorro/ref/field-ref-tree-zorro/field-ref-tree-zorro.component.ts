import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd';
import { ValidService } from 'app/libs/meta-ui/service/validate.service';
import { RefTableComSpec } from '../../../../util/spec/field/ref-table.comspec';
import { ValidStatusEnum } from '../../../../util/meta/ValidStatus.enum';
import { ModeEnum } from '../../../../util/meta/Mode.enum';
import { listToNzTreeNode } from '../../../../util/struct/listToTree';
import { CheckOneDataAction } from '../../../../util/event/check/check-one-data-action.event';
import { AbstractTree } from '../../../../util/struct/AbstractTree';
import { QueryObject } from '../../../../util/stq/QueryObject';
import { QueryParam } from '../../../../util/stq/QueryParameter';

@Component({
  selector: 'field-ref-tree-zorro',
  templateUrl: './field-ref-tree-zorro.component.html',
  styleUrls: ['./field-ref-tree-zorro.component.css']
})
export class FieldRefTreeZorroComponent extends RefTableComSpec implements OnInit {
  placeholder: string = '';
  __dataSet__: any[] = [];
  alias: string;
  @Output() onAction = new EventEmitter();
  @Input() set dataSet(dataSet: any[]) {
    if (this.mode == ModeEnum.MainShow || this.mode == ModeEnum.Create || this.mode == ModeEnum.Update) {
      // console.warn(dataSet);
      if (this.metaCom.isLazy) {
        // 去掉集合中重复的id
        let notExist = dataSet.filter(item => !this.dataSet.some(exist => this.getTreeId(exist) == this.getTreeId(item)));
        this.__dataSet__ = this.__dataSet__.concat(...notExist);
        this.getDefaultUpdateValue(this.value);
      } else {
        this.__dataSet__ = dataSet;
      }
      this.parseTree();
    } else {
      this.__dataSet__ = dataSet;



      if (this.mode == ModeEnum.Show) {
        this.dataSet.find(dataItem => dataItem[this.field.fieldName] == this.value);
        console.log(this.value, this.dataSet)
        let selectedValue = this.dataSet.find(item => Object.assign((new this.field.config.databaseType() as AbstractTree<any>), item).getId() == this.value);
        if (selectedValue) {
          this.alias = (Object.assign(new this.field.config.databaseType(), selectedValue) as AbstractTree<any>).getText();
        }
      }

    }
    if (this.value && this.mode == ModeEnum.Update) {
      this.getDefaultUpdateValue(this.value);
      if (typeof this.value == 'string') {
        this.value = parseInt(this.value);
      } else {

      }
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
    if (typeof val == 'string') val = parseInt(val);
    // if (!val) { alert('no value aaa') }
    let result = this.validService.valid(val, this.field.valid);
    if (result.ok) {
      this.validStatus = ValidStatusEnum.success;
      this.errMsg = "";
    } else {
      this.validStatus = ValidStatusEnum.error;
      this.errMsg = result.msg;
    }
    this.__value__ = val;


  }
  /** 获取默认的更新值 */
  getDefaultUpdateValue(val) {
    let pk = this.metaCom.metaFields.find(field => field.isPk);
    let dataItem = this.dataSet.find(item => item[pk.fieldName] == this.value);
    if (!this.value) {
      alert('no value')
    }
    if (dataItem) {
      this.placeholder = Object.assign(new this.field.metaObject.originClass(), dataItem).getText();
      // alert('dataItem')
      // dataItem.checked = true;
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


    let nodes = listToNzTreeNode(items);
    this.nodes = nodes;
  }
  getTypeof(val) {
    return typeof val;
  }
  async ngOnInit() {
    // setInterval(() => console.warn(this.value), 20000);
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
    if (this.mode == ModeEnum.Show) {
      let selectedValue = this.dataSet.find(item => Object.assign((new this.field.config.databaseType() as AbstractTree<any>), item).getId() == this.value);
      if (selectedValue) {
        this.alias = (Object.assign(new this.field.config.databaseType(), selectedValue) as AbstractTree<any>).getText();
      }
      console.log(this.value, selectedValue)
      if (!this.field.metaObject.isLazy) {
        this.parseTree();
      } else {
        this.queryOne(this.value);
      }
    }
    if (this.mode == ModeEnum.Update) {
      // if (!this.value) alert('error no value')
      let pk = this.field.metaObject.metaFields.find(field => field.isPk);
      let param = new QueryParam();

      param.queryConditions = [{ field: pk.fieldName, value: this.value, andOr: "and", compare: "=" }];
      let dataItem = this.dataSet.find(item => item[pk.fieldName] == this.value);

      if (dataItem) {
        // alert('dataItem')
        // dataItem.checked = true;
      }
      return this.onQuery.emit({ metaCom: this.metaCom, queryParam: param, field: this.field, page: 0, pageSize: 1000 })

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
      this.valueChange.emit($event.node.key);
    } else {
      this.valueChange.emit($event.node.key);
    }

  }
  check($event: { node: NzTreeNode }) {
    return this.onAction.emit(Object.assign(new CheckOneDataAction(), { metaCom: this.metaCom, data: $event.node.origin.origin, checked: $event.node.isSelected } as CheckOneDataAction<any>))
  }
  async  query() {
    let param = new QueryParam();
    param.pageParam = { pageSize: 1000, pageIndex: 0 }

    if (this.metaCom.data.presetConditions) {
      if (typeof this.metaCom.data.presetConditions == 'function') {
        param.queryConditions = this.metaCom.data.presetConditions();
      } else {
        param.queryConditions = this.metaCom.data.presetConditions;
      }
    }
    return this.onQuery.emit({ metaCom: this.metaCom, queryParam: param, field: this.field, keyword: '', page: 0, pageSize: 1000 })
  }
  async queryOne(val) {
    let param = new QueryParam();
    let pk = this.field.metaObject.metaFields.find(field => field.isPk);
    param.queryConditions = [{ field: pk.fieldName, value: val, compare: "=", andOr: "and" }];
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

  lazy($event: { eventName: string, node: { origin: { origin: any } } }) {
    console.log($event)
    if (this.metaCom.isLazy) {
      // load child async
      if ($event.eventName === 'expand') {
        let data = <AbstractTree<any>>Object.assign(new this.metaCom.originClass(), $event.node.origin.origin);
        let param = new QueryParam();
        if (this.metaCom.data.presetConditions) {
          param.queryConditions = [{ field: 'parentId', value: data.getId(), compare: "=", andOr: "and" }]
        }
        return this.onQuery.emit({ metaCom: this.metaCom, queryParam: param, field: this.field, page: 0, pageSize: 1000 })
      }
    }
  }

  private getTreeId(item: any) {
    return (Object.assign(new this.metaCom.originClass(), item) as AbstractTree<any>).getId();
  }

  add() {
    if (typeof this.value == 'string') this.value = parseInt(this.value) + 1;
    // this.value = this.value + '';
  }
  min() {
    if (typeof this.value == 'string') this.value = parseInt(this.value) - 1;
    // this.value = this.value + '';
  }
}
