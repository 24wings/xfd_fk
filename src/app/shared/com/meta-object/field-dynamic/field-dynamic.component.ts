import { Component, OnInit, ComponentFactoryResolver, ViewChild, AfterViewInit, Input, Output, EventEmitter, ComponentRef } from '@angular/core';
import { DynamicDirective } from '../../../../dynamic.directive';
import { AppConfig, ComponentType } from '../../../../app.config';
import { registerCompoenentFactorys } from '../../../../component-register.factory';
import { IDataStrategy } from '@core/service/data-strategy/IDataStrategy';
import { Field } from '@core/util/meta/Field';
import { MetaCom } from '@core/util/meta/MetaCom';
import { ModeEnum } from '@core/util/meta/Mode.enum';
import { BasicComspce } from '@core/util/spec/field/basic.comspec';
import { RefTableComSpec } from '@core/util/spec/field/ref-table.comspec';
import { getMetaEntity } from '@core/util/meta/MetaEntity';
import { RefTablees } from '@core/util/meta/types/RefTablees';
import { RefTable } from '@core/util/meta/types/RefTable';
import { RefTree } from '@core/util/meta/types/RefTree';
import { RefTreees } from '@core/util/meta/types/RefTreees';
import { QueryCondition } from '@core/util/stq/QueryCondition';
@Component({
  selector: 'app-field-dynamic',
  templateUrl: './field-dynamic.component.html',
  styles: []
})
export class FieldDynamicComponent implements OnInit, AfterViewInit {
  @Output() onAction = new EventEmitter();
  __value__;
  page = 0;
  count: number;
  @Input() field: Field;
  @ViewChild(DynamicDirective) dynamic: DynamicDirective;
  @Input() metaCom: MetaCom
  @Input() set value(val) {
    this.__value__ = val;
    if (val && this.componentRef) {
      this.componentRef.instance.__value__ = val;
    }
    this.valueChange.emit(val);
  }
  get value() {
    return this.__value__;
  }
  __dataSet__: any[] = [];
  @Input() set dataSet(dataSet: any[]) {
    this.__dataSet__ = dataSet;
    if (this.componentRef)
      this.refershData()
  }
  get dataSet() {
    return this.__dataSet__;
  }
  @Output() onQuery = new EventEmitter();
  @Output() valueChange = new EventEmitter();
  @Input() mode: ModeEnum = ModeEnum.Create;
  componentRef: ComponentRef<BasicComspce<any>>
  constructor(public componentFactoryResolver: ComponentFactoryResolver, public appConfig: AppConfig,
    public dataStragety: IDataStrategy) { }
  ngOnInit() {
  }
  loadComponent() {
    let type = registerCompoenentFactorys.find(type => this.field.type == type.type);
    if (!type) type = { type: null, component: this.field.dynamicComponent };
    if (type) {

      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(type.component as any);

      let viewContainerRef = this.dynamic.viewContainerRef;
      viewContainerRef.clear();
      this.componentRef = viewContainerRef.createComponent(componentFactory) as any;
      this.componentRef.instance.mode = this.mode;
      this.componentRef.instance.field = this.field;
      this.componentRef.instance.value = this.value;
      this.componentRef.instance.valueChange.subscribe(rt => {
        this.value = rt;
        if (rt) {
          // console.error(rt);
        }
        this.componentRef.instance.__value__ = rt;
      });
      if (type.type == RefTable || type.type == RefTablees || type.type == RefTree || type.type == RefTreees) {
        this.componentRef.instance.metaCom = getMetaEntity(this.field.config.databaseType);
        (<ComponentRef<RefTableComSpec>>(this.componentRef as any)).instance.onQuery.subscribe(rtn => this.search(rtn));
        if (this.componentRef.instance['onAction']) this.componentRef.instance['onAction'].subscribe(rtn => this.onAction.emit(rtn))
      } else {
      }
      this.componentRef.changeDetectorRef.detectChanges()
      this.componentRef.changeDetectorRef.markForCheck()
    } else {
      console.error(`there is no error`)
    }

  }
  refershData() {
    (<ComponentRef<RefTableComSpec>>(this.componentRef as any)).instance.dataSet = this.dataSet;
    (<ComponentRef<RefTableComSpec>>(this.componentRef as any)).instance.count = this.count;
    (<ComponentRef<RefTableComSpec>>(this.componentRef as any)).instance.value = this.value;



  }

  ngAfterViewInit() {
    this.loadComponent();

  }
  async  search($event: { metaCom: MetaCom, field: Field, keyword: string, page: number, pageSize }) {

    let result = await this.dataStragety.entityQuery($event.metaCom,
      { pageParam: { pageIndex: $event.page, pageSize: $event.pageSize }, queryAttributes: [], queryConditions: [] });
    this.dataSet = result.paging.rows;
    this.count = result.paging.count;
    this.refershData()

  }
  getQueryCondition(): QueryCondition {
    return { compare: "=", field: this.field.fieldName, andOr: "and", value: this.value }
  }
}
