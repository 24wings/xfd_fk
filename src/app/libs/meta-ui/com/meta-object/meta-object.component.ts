import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ComponentFactoryResolver, AfterViewInit, ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';
import { NzMessageService, NzTreeNode, NzModalService } from 'ng-zorro-antd';
import { TitleService } from '@delon/theme';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { DevService } from 'app/libs/meta-ui/service/dev.service';
import { CommonService } from 'app/libs/meta-ui/service/common.service';
import { MyHttpService } from 'app/libs/meta-ui/service/http.service';
import { ValidService } from 'app/libs/meta-ui/service/validate.service';
import { ComponentRef } from '@angular/core/src/render3';
import { IDataStrategy } from 'app/libs/meta-ui/service/data-strategy/IDataStrategy';
import { QueryObject } from '../../util/stq/QueryObject';
import { MetaCom } from '../../util/meta/MetaCom';
import { Types } from '../../util/meta/types/indext';
import { CustomQueryToolbarComSpec } from '../../util/spec/custom/custom-query-toolbar';
import { Field } from '../../util/meta/Field';
import { getMetaEntity } from '../../util/meta/MetaEntity';
import { ModeEnum } from '../../util/meta/Mode.enum';
import { QueryAttribute } from '../../util/stq/QueryAttribute';
import { checkPower, C, D, U, Q, S } from '../../util/meta/Power';
import { AbstractTree } from '../../util/struct/AbstractTree';
import { Title } from '@angular/platform-browser';
import { CheckOneDataAction } from '../../util/event/check/check-one-data-action.event';
import { CreateSuccessActionEvent, UpdateCancelActionEvent, UpdateSuccessActionEvent } from '../../util/event/edit/update-cancel-action.event';
import { CustomActionEvent } from '../../util/event/custom-action.event';
import { QueryCondition } from '../../util/stq/QueryCondition';
import { QueryParam } from '../../util/stq/QueryParameter';
// import { IAction } from '@core/util/meta/Action';
import { ICustomAction } from '../../util/meta/IToolbar';
import { MetaEditorComponent } from './meta-editor/meta-editor.component';
import { FieldDynamicComponent } from './field-dynamic/field-dynamic.component';
import { GroupOptions, IGroup } from '../../util/meta/Group';
import { ISummary } from '../../util/meta/Summary';
import { BasicComspce } from '../../util/spec/field/basic.comspec';
import { DynamicDirective } from '../../dynamic.directive';
import { EditorDirective } from '../../editor.direcive';
import { AppConfig } from 'app/app.config';

@Component({
  selector: 'app-meta-object',
  templateUrl: './meta-object.component.html',
  styles: [``]
})
export class MetaObjectComponent extends BasicComspce<any> implements OnInit, IMetaObjectComSpec, AfterViewInit {
  pageSize: number = 10;
  queryObject: QueryObject = {};
  private __metaCom__: MetaCom;
  Types = Types;
  isLoading: boolean = false;
  showCheckbox: boolean = false;
  @ViewChild(DynamicDirective) dynamic: DynamicDirective;
  @ViewChild(EditorDirective) dynamicEditor: EditorDirective;
  @ViewChildren(FieldDynamicComponent) queryDynamicFieldComponentList: QueryList<FieldDynamicComponent>;
  componentRef: ComponentRef<CustomQueryToolbarComSpec>;
  dynamicEditorRef: ComponentRef<MetaEditorComponent>;
  selectedData: any = {};
  updateFlow: MetaCom;
  rows: any[] = [];
  totalSummary = {};
  summarys: ISummary[] = [];

  @Output() onAction = new EventEmitter();
  @Input() power: number;
  getTreeField(metaObject: MetaCom): Field {
    return metaObject.metaFields.find(field => field.type == Types.RefTree);
  }
  getFieldObject($ref) {
    return getMetaEntity($ref);
  }
  get isCheckOne(): boolean {
    return this.rows.filter(data => data.checked).length == 1;
  }
  get isCheckMany(): boolean {
    return this.rows.filter(data => data.checked).length > 1;
  }
  get isNoneCheck() {
    return this.rows.every(data => !data.checked);
  }
  queryModelVisible: boolean = false;
  /** 是否可更新  由元数据和菜单的isUpdate 合并而来,如果菜单指定了查询 */
  isUpdate: boolean = false;
  isDel: boolean = false;
  isAdd: boolean = false;
  isQuery: boolean = true;
  loadDynamicToolbarComponent() {

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.metaObject.view.dynamicQueryToolbar as any);
    let viewContainerRef = this.dynamic.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory) as any;
    this.componentRef.instance.queryResult.subscribe(rtn => {
      // alert(rtn.count)
      this.rows = rtn.rows; this.total = rtn.count; this.totalSummary = rtn.summary
    });

    // if (this.componentRef.instance['onAction']) this.componentRef.instance['onAction'].subscribe(rtn => this.doAction(rtn));
    this.componentRef.instance.metaCom = this.metaObject;
  }
  loadDynamicEditorComponent() {
    if (this.dynamicEditorRef) {
      this.dynamicEditorRef.destroy();
    }
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.metaObject.dynamicEditor as any);
    let viewContainerRef = this.dynamicEditor.viewContainerRef;
    viewContainerRef.clear();
    this.dynamicEditorRef = viewContainerRef.createComponent(componentFactory) as any;
    this.dynamicEditorRef.instance.onAction.subscribe(rt => this.doAction(rt))
    this.dynamicEditorRef.instance.mode = this.state;
    this.dynamicEditorRef.instance.ModeEnum = ModeEnum;
    this.dynamicEditorRef.instance.metaCom = this.metaObject;
    // this.dynamicEditorRef.instance.requiredFields = this.metaObject;
  }


  ModeEnum = ModeEnum;
  state: ModeEnum = ModeEnum.Show;
  queryFields: Field[] = [];
  dataSet: any[] = [];
  queryOptions: FieldQueryOption[] = [];
  page: number = 1;
  total: number = 10;
  /**总字段 */
  updateFields: Field[] = [];
  config: { queryAttributes: QueryAttribute[] } = { queryAttributes: [] }
  queryMetaOptions: any[] = []
  showMetaFields: Field[] = [];
  displayData = [];
  allChecked: boolean = false;
  indeterminate: boolean = false;
  groupFields: { alias: string, fieldName: string }[] = [];
  groupOptions: GroupOptions
  groupDatas: IGroup[] = [];
  ngAfterViewInit() {
    if (this.metaObject.view.dynamicQueryToolbar) {
      this.loadDynamicToolbarComponent()
    }
    if (this.metaObject.dynamicEditor) {
      this.loadDynamicEditorComponent()
    }
  }
  groupBy(array, f) {
    const groups = {};
    array.forEach(function (o) {
      const group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    });
  }
  @Input() set metaObject(meta: MetaCom) {
    meta.isEntity = true;
    this.metaCom = meta;
    meta.metaFields.forEach(field => field.state ? field.state : field.state = {})
    if (meta.defaultMode) this.state = meta.defaultMode;
    this.__metaCom__ = meta;
    let groupField = this.metaObject.metaFields.find(field => !!field.groupOptions);
    if (groupField) this.groupOptions = groupField.groupOptions;

    this.summarys = [];
    // console.log(this.__metaCom__)
    this.__metaCom__.metaFields.forEach(field => field.summarys ? this.summarys.push(...field.summarys) : '');
    console.log(this.summarys)

    if (this.state == ModeEnum.Info) {
      this.query()
    }
    if (meta) {
      if (meta.view) {
        if (meta.view.pageSize)
          this.pageSize = meta.view.pageSize;

      }
    }

    this.isAdd = checkPower(C, this.power);
    this.isDel = checkPower(D, this.power);
    this.isUpdate = checkPower(U, this.power);
    this.isQuery = checkPower(Q, this.power);
    if (meta.objectName) {
      this.title.setTitle(meta.objectName);
      // document.querySelector(`.ant-tabs-tab-active.ant-tabs-tab .name`).textContent = meta.objectName;
    }
    if (!this.metaObject.flow) {
      this.metaObject.flow = {};
    }
    // 自定义创建流程

    // this.requiredFields = this.metaObject.metaFields.filter(field => checkPower(C, field.power));
    this.showMetaFields = this.metaObject.metaFields.filter(field => checkPower(S, field.power));
    this.queryFields = this.metaObject.metaFields.filter(field => field.isQuery);
    this.queryMetaOptions = this.metaObject.metaFields.filter(field => field.isQuery).map(field => {
      return { fieldName: field.fieldName, alias: field.alias || field.fieldName, value: '', queryCondition: 'like' }
    });
    //分页
    // if (this.metaObject.view.pageSize) {
    //   this.pageSize = this.metaObject.view.pageSize;
    // }
    if (new this.metaObject.originClass() instanceof AbstractTree) {
      this.pageSize = 1000
    }

    if (this.metaObject.view.viewType == 'tree') {
      this.query();
    }
  }
  get metaObject() {
    return this.__metaCom__;
  }
  checkActionPower(power) {
    if (power) {
      return this.power & power;
    } else {
      return true;
    }
  }
  treeChecked($event: any) {
    let data = this.dataSet.find(item => (Object.assign(new this.metaObject.view.treeClass(), item) as AbstractTree<any>).getId() + '' == $event);
    if (data) {
      this.dataSet.forEach(item => item.checked = false);
      data.checked = true;
    }
  }
  constructor(
    public appConfig: AppConfig,
    public dev: DevService,
    public msg: NzMessageService,
    public http: MyHttpService,
    public title: Title,
    public titleService: TitleService,
    public validService: ValidService,
    public message: NzMessageService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: NzModalService,
    private dataStrage: IDataStrategy
  ) { super(validService) }

  afterCreateSuccess(data: any) {
    if (this.metaObject.lifeCycle) {
      if (this.metaObject.lifeCycle.afterCreateSuccess) {
        this.metaObject.lifeCycle.afterCreateSuccess(data);
      }
    }
  }

  async ngOnInit() {
    this.showCheckbox = !this.__metaCom__.hideCheckbox;


    if (this.__metaCom__.firstLoad) {
      console.warn(this.__metaCom__);

      this.query();
    }
    if (this.__metaCom__.dynamicEditor) {
      // alert('custom editor')
    }
  }
  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }
  getSummaryAlias(field: Field) {
    let summary = this.summarys.find(summary => summary.fieldName == field.fieldName);
    if (summary) return summary.alias
  }
  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
  }
  checkAll(value: boolean): void {
    this.rows.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  async  edit() {
    let checkedDatas = this.rows.filter(item => item.checked);
    if (checkedDatas.length > 1 || checkedDatas.length == 0) {
      return this.msg.error('只能同时更新一条数据')
    }
    this.selectedData = checkedDatas[0];
    this.state = ModeEnum.Update;

    if (this.dynamicEditorRef) {
      await this.loadDynamicEditorComponent();

      this.dynamicEditorRef.instance.selectedData = this.selectedData;
    }
    debugger;
  }
  showCreateModal() {
    this.state = ModeEnum.Create;
    this.loadDynamicEditorComponent();
  }
  async  del() {
    let checkedDatas = this.rows.filter(item => item.checked);

    if (this.metaObject.lifeCycle) {
      if (this.metaObject.lifeCycle.beforeDelete) {
        this.metaObject.lifeCycle.beforeDelete(checkedDatas)
      }
    }
    for (let item of checkedDatas) {
      if (this.metaObject.isEntity) {
        delete item.children;
        await this.dataStrage.entityDelete(this.metaObject, item);
      }
    }
    await this.query()
  }
  showDeleteConfirm(): void {
    this.modalService.confirm({
      nzTitle: '确定删除?',
      nzContent: '<b style="color: red;">仔细核对数据</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => this.del(),
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  doAction($event) {
    this.onAction.emit($event);
    if ($event instanceof CheckOneDataAction) {
      let tree: AbstractTree<any> = Object.assign(new this.metaObject.originClass(), $event.data);
      tree.checked = true;
      this.rows.forEach(row => row.checked = false);
      this.rows.push(tree);
      if (this.groupOptions) {
        let groups = this.groupBy(this.rows, (item) => item[this.groupOptions.fields[0].fieldName]);
        console.log(groups);
        debugger;
      }

    }
    if ($event instanceof CreateSuccessActionEvent) {
      this.state = ModeEnum.Show;
      this.query()
    }
    if ($event instanceof UpdateCancelActionEvent) {
      this.state = ModeEnum.Show;
      this.query()
    }
    if ($event instanceof UpdateSuccessActionEvent) {
      this.state = ModeEnum.Show;
      this.query()
    }

    // let checkedData = this.rows.filter(data => data.checked);
    // this.onAction.emit({ action: $event, data: checkedData, metaObject: this.metaObject });
  }


  doCustomAction(action: {
    label: string, multi: boolean, checkPower?: number;
    eventName?: string, url?: string
  }) {
    let checkedData = this.rows.filter(data => data.checked);
    this.onAction.emit(Object.assign(new CustomActionEvent(), { metaCom: this.metaObject, data: checkedData, eventName: action.eventName } as CustomActionEvent<any>))
  }
  async queryPage(num) {
    if (this.__metaCom__.firstLoad) {
      this.page = num;
      if (this.componentRef) {
        this.componentRef.instance.query(num - 1);
      } else {
        this.query(num);

      }
    } else {
      this.__metaCom__.firstLoad = true;
    }
  }
  async  query(q?) {
    let conditions: QueryCondition[] = [];
    // 预设条件
    if (typeof q == 'object') conditions.push(...QueryObject.toQueryContions(q));
    if (this.metaObject.data && !q)
      if (this.metaObject.data.presetConditions) {

        let funcCinditions = this.getPresetCondition();
        conditions.push(...funcCinditions);
      }
    let queryParam = new QueryParam();
    let orderList = this.metaObject.metaFields.filter(field => field.sort).map(field => { return { fieldName: field.fieldName, sort: field.sort } });
    if (orderList.length > 0) {
      queryParam.orderList = orderList
    }
    queryParam.pageParam = { pageIndex: this.page - 1, pageSize: this.pageSize, };
    queryParam.queryConditions = conditions;
    let result = await this.dataStrage.entityQuery(this.__metaCom__, queryParam);

    this.rows = result.paging.rows;
    this.total = result.paging.count;
    if (this.groupOptions) {
      let groups: any[][] = this.groupBy(this.rows, (item) => item[this.groupOptions.fields[0].fieldName]);
      this.groupDatas = groups.map(group => {
        let item: IGroup = { data: {} } as any;
        item.data[this.groupOptions.fields[0].fieldName] = group[0][this.groupOptions.fields[0].fieldName];
        item.children = group;
        return item;
      });
      console.log(groups);
    }
  }

  getPage() {
    let arr = new Array(Math.ceil(this.total / this.pageSize))
    arr.fill('1');
    return arr;
  }
  goBack() {
    history.go(-1);
  }


  createCancel() {
    this.onAction.emit('cancel')
  }

  doCreateAction($event) {
    if ($event instanceof CreateSuccessActionEvent) {
      this.state = ModeEnum.Show;
    }
  }

  checkActionDisabled(action: ICustomAction) {
    if (action.alawysDisplay) {
      return false;
    } else {
      return action.multi ? this.isNoneCheck : !this.isCheckOne;
    }
  }

}
