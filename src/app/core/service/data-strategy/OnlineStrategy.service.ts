import { IDataStrategy } from "./IDataStrategy";
import { Injectable } from "@angular/core";
import { MyHttpService } from "../http.service";
import { AppConfig } from "app/app.config";
import { QueryParam } from "@core/util/stq/QueryParameter";
import { MetaCom } from "@core/util/meta/MetaCom";
import { NzMessageService } from "ng-zorro-antd";
/***
 * 线上数据库策略
 * 
 */
@Injectable()
export class OnlineStrategyService implements IDataStrategy {
    entityQuery(metaCom: MetaCom, queryParameter: QueryParam) {
        return this.http.Post(this.appConfig.entityQuery, queryParameter, { params: { className: metaCom.objectCode } })
    }
    entityUpdate(metaCom: MetaCom, dataItem: any) {
        if (dataItem['isSystem']) return this.notAllow();
        return this.http.Post(this.appConfig.entityUpdate, dataItem, { params: { className: metaCom.objectCode } });
    }
    entityInsert(metaCom: MetaCom, data: any) {
        return this.http.Post(this.appConfig.entityInsert, data, { params: { className: metaCom.objectCode } });
    }
    entityDelete(metaCom: MetaCom, dataItem: any) {
        if (dataItem['isSystem']) return this.notAllow();
        return this.http.Post(this.appConfig.entityDelete, dataItem, { params: { className: metaCom.objectCode } });
    }
    constructor(public http: MyHttpService, private appConfig: AppConfig, private msg: NzMessageService) { }

    notAllow() {
        return new Promise(resolve => resolve(this.msg.error('系统数据,不允许删除改动')));
    }
}