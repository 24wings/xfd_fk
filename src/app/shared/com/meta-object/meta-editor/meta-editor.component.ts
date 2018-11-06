import { Component, OnInit, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { ValidService } from '@core/service/validate.service';
import { NzMessageService } from 'ng-zorro-antd';
import { MyHttpService } from '@core/service/http.service';
import { IDataStrategy } from '@core/service/data-strategy/IDataStrategy';
import { ModeEnum } from '@core/util/meta/Mode.enum';
import { MetaCom } from '@core/util/meta/MetaCom';
import { checkPower, C, U } from '@core/util/meta/Power';
import { UpdateSuccessActionEvent, CreateSuccessActionEvent, UpdateCancelActionEvent } from '@core/util/event/edit/update-cancel-action.event';
import { FieldConfig } from '@core/util/meta/FieldConfig';
import { getMetaEntity } from '@core/util/meta/MetaEntity';
import { Flow } from '@core/util/meta/Flow';
import { IState } from '@core/util/meta/State';
import { Field } from '@core/util/meta/Field';
import { IAction } from '@core/util/meta/Action';
import { Timestamp } from '@core/util/meta/types/Timestamp';
import { QueryAttribute } from '@core/util/stq/QueryAttribute';
import { QueryCondition } from '@core/util/stq/QueryCondition';
import { QueryObject } from '@core/util/stq/QueryObject';
import { CustomUrlService } from '@core/service/CustomUrl.service';
@Component({
    selector: 'meta-editor',
    templateUrl: './meta-editor.component.html',
    styleUrls: ['./meta-editor.component.css']
})
export class MetaEditorComponent implements OnInit {
    @Input() mode: ModeEnum;

    @Input() set metaCom(metaCom: MetaCom) {
        this.__metaCom__ = metaCom;
        this.requiredFields = metaCom.metaFields.filter(field => checkPower(C, field.power));
        this.updateFields = this.metaCom.metaFields.filter(field => checkPower(U, field.power));
        if (this.metaCom.flow.create) {
            this.createFlow = this.metaCom.flow.create;
            this.currentCreateState = this.createFlow[0];
        }
        else {
            this.createFlow = [{ id: "add", title: "添加", actions: [{ label: "提交", nzType: "primary", to: C }] }];
            this.currentCreateState = this.createFlow[0];
            metaCom.metaFields.forEach(field => {
                if (!field.state) {
                    field.state = {};
                }
                field.state.create = 'add';
            });
            this.requiredFields = metaCom.metaFields.filter(field => checkPower(C, field.power))
                .filter(field => field.state)
                .filter(field => field.state.create == this.currentCreateState.id)
        }
    }
    get metaCom() {
        return this.__metaCom__
    }
    ModeEnum = ModeEnum;
    @Input() selectedData: any = {};
    total: number;
    page: number = 1;
    pageSize = 10;
    @Output() onAction = new EventEmitter();
    dataSet: any[] = [];
    rows: any[] = [];
    @Input() newDataItem: any = {};
    createFlow: Flow;
    currentCreateState: IState;
    __metaCom__: MetaCom
    requiredFields: Field[] = [];
    updateFields: Field[] = [];
    isLoading: boolean = false;
    constructor(public validService: ValidService,
        public msg: NzMessageService,
        public http: MyHttpService,
        public ref: ChangeDetectorRef,
        public dataStrategy: IDataStrategy,
        public customUrl: CustomUrlService
    ) { }

    changeSelectProp(value, prop) {
        this.selectedData[prop] = value;
    }
    async update() {
        let timestampFields = this.metaCom.metaFields.filter(field => field.type == Timestamp).map(field => field.fieldName);
        let data = JSON.parse(JSON.stringify(this.selectedData));
        for (let timestampField of timestampFields) {
            if (this.selectedData[timestampField]) {
                console.log(this.selectedData[timestampField]);
                data[timestampField] = new Date(this.selectedData[timestampField]).getTime();
            }
        }
        // 自定义保存方法
        Object.keys(data).forEach(key => {
            let field = this.metaCom.metaFields.find(field => field.fieldName == key);
            if (field) {
                if (field.transform) {
                    if (field.transform.write) {
                        let toCloneData = field.transform.write(this.selectedData[field.fieldName]);
                        data[field.fieldName] = typeof toCloneData == 'object' ? JSON.parse(JSON.stringify(toCloneData)) : toCloneData;
                    }
                }
            }
        });
        console.warn(data);
        if (this.metaCom.data.customUrl.update) {
            await this.http.Post(this.metaCom.data.customUrl.update, data);
        }
        else {
            await this.dataStrategy.entityUpdate(this.metaCom, data);
        }
        this.mode = ModeEnum.Show;
        this.onAction.emit(new UpdateSuccessActionEvent());
        await this.query();
    }

    changeProp(value, prop) {
        let field = this.metaCom.metaFields.find(key => key.fieldName == prop);
        if (field.isRef) {
            let metaObject = getMetaEntity((field.config as FieldConfig).$ref);
            if (!metaObject.view.viewType || metaObject.view.viewType == 'table') {
                this.newDataItem[prop] = value;
            } else {
                this.newDataItem[prop] = value;
            }
        } else {
            this.newDataItem[prop] = value;
        }
    }

    createCancel() {

    }
    doAction() {

    }
    ngOnInit() {
        if (this.metaCom.defaultNewDataItem) {
            this.newDataItem = this.__metaCom__.defaultNewDataItem;
        } else {
            this.newDataItem = new this.__metaCom__.originClass();
        }
        this.ref.detectChanges()
    }
    async  createFlowTo(action: IAction) {
        if (this.requiredFields.every(field => {
            if (field.valid.required) {
                let result = this.validService.valid(this.newDataItem[field.fieldName], field.valid);
                if (!result.ok) {
                    this.msg.warning(result.msg)
                    return false;
                }
                return true;
            } else {
                return true;
            }
        })) {
            /** 自定义处理函数 */
            if (typeof action.to == 'function') {
                action.to = action.to(this.newDataItem);
            }
            if (typeof action.to == 'number') {
                switch (action.to) {
                    case C:
                        await this.add();
                        this.currentCreateState = this.createFlow[0];
                        this.requiredFields = this.metaCom.metaFields.filter(field => field.state ? (field.state.create == this.currentCreateState.id) : false);
                        break;
                    default:
                        alert('unkown flow action')
                        break;
                }
            } else {
                this.currentCreateState = this.createFlow.find(state => state.id == action.to);
                this.requiredFields = this.metaCom.metaFields.filter(field => field.state ? (field.state.create == this.currentCreateState.id) : false);
            }
        }

    }
    async add() {
        if (this.metaCom.data.presetValue) {
            Object.keys(this.metaCom.data.presetValue).forEach(key => this.newDataItem[key] ? this.newDataItem[key] : this.newDataItem[key] = this.metaCom.data.presetValue[key]);
        }
        let validResults = this.requiredFields.map(field => this.validService.valid(this.newDataItem[field.fieldName], field.valid));
        if (validResults.find(res => !res.ok)) {
            return this.msg.error('参数' + validResults.find(res => !res.ok).msg);
        }
        let data = Object.assign(this.newDataItem);
        /** 如果自定义保存数据方法 */
        Object.keys(data).forEach(key => {
            let field = this.metaCom.metaFields.find(field => field.fieldName == key);
            if (field) {
                if (field.transform) {
                    if (field.transform.write) {
                        let toCloneData = field.transform.write(this.newDataItem[field.fieldName]);
                        data[field.fieldName] = typeof toCloneData == 'object' ? JSON.parse(JSON.stringify(toCloneData)) : toCloneData;
                    }
                }
            }
        });
        this.isLoading = true;
        let createdData;
        if (this.metaCom.data.customUrl.create) {
            createdData = await this.customUrl.Post(this.metaCom.data.customUrl.create, data);
        } else {
            if (this.metaCom.isEntity) {
                createdData = await this.dataStrategy.entityInsert(this.metaCom, data);
            }
        }
        if (createdData) {
            this.afterCreateSuccess(createdData.insert);
        }
        this.onAction.emit(C);
        this.newDataItem = new this.metaCom.originClass();
        this.isLoading = false;
        // await this.query();
        this.mode = ModeEnum.Show;
        this.onAction.emit(new CreateSuccessActionEvent())
    }
    afterCreateSuccess(data: any) {
        if (this.metaCom.lifeCycle) {
            if (this.metaCom.lifeCycle.afterCreateSuccess) {
                this.metaCom.lifeCycle.afterCreateSuccess(data);
            }
        }
    }
    async  query() {
        let attrs: QueryAttribute[] = [];
        let conditions: QueryCondition[] = [];
        // if (new this.metaObject.originClass())
        // 预设条件
        if (this.metaCom.data.presetObject) {
            let preset = QueryObject.toQueryContions(this.metaCom.data.presetObject as any);
            conditions.push(...preset);
        }
        if (this.metaCom.isEntity) {
            let result = await this.dataStrategy.entityQuery(this.metaCom, {
                queryAttributes: attrs,
                queryConditions: conditions,
                pageParam: { pageIndex: this.page - 1, pageSize: 1000, }
            })
            this.rows = result.paging.rows;
            this.total = result.paging.count;
        }
    }

    updateCancel() {
        this.onAction.emit(Object.assign(new UpdateCancelActionEvent(), { metaCom: this.metaCom } as UpdateCancelActionEvent));
    }
    refField(fieldName: string) {
        return this.metaCom.metaFields.filter(filed => filed).find(field => field.fieldName == fieldName);
    }
}
