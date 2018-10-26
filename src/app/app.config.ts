import { Injectable } from '@angular/core';
import { IMsgNotify } from '@core/util/notify/IMsgNotify';
import { BasicComspce } from '@core/util/spec/field/basic.comspec';
import { BooleanComSpec } from '@core/util/spec/field/boolean.comspec';
import { DateComSpec } from '@core/util/spec/field/date.comspec';
import { NumberComSpec } from '@core/util/spec/field/number.comspec';
import { SelectComSpec } from '@core/util/spec/field/select.comspec';
import { loadBuiltInMenus } from './projects/hk/built-in/app.menu';
import { MemberRegisterNotify, MemberRegisterTask } from './projects/hk/notify/MemberRegisterNotify';
import { OrderNotifyTask } from './projects/hk/notify/OrderNotify.task';

type MsgNotifyClass = new () => IMsgNotify;
export type ComponentType = typeof BasicComspce |
    typeof BooleanComSpec |
    typeof DateComSpec |
    typeof NumberComSpec |
    typeof SelectComSpec;

/**
 * 默认的App配置 
 */
@Injectable()
export class AppConfig {
    static loginUrl: string = "/hk"
    public static TotalMenus = loadBuiltInMenus();
    /** 数据策略 */
    // static dataStrategy: new () => IDataStrategy = 

    /**
     * atob(btoa('123')) = '123' 
     * @param password 
     */
    public static screct(password: string) {
        return btoa(password);
    }

    /*** 线上测试 将debug改为false，作为错误提示*/
    debug: boolean = true;
    get ip() {
        return localStorage.getItem('config') && localStorage.getItem('config') != 'undefined' ? JSON.parse(localStorage.getItem("config")).ip : "http://localhost:9090";
    }
    /** 同步菜单,同步角色,同步组织,同步用户*/
    syncMenu: boolean = true;
    syncRole: boolean = true;
    syncOrg: boolean = true;
    syncUser: boolean = true;
    registerMsgNotifyFactorys: MsgNotifyClass[] = [MemberRegisterNotify, MemberRegisterTask, OrderNotifyTask as any];
    syncMetaQuery: boolean = true;
    syncNotifyMessgae: boolean = true;
    createMode: 'Drawer' | 'Modal' = 'Drawer';
    stqCreateUrl: string = '/';
    /** 实体查询 */
    entityQuery: string = "/app/stq/query";
    /** 实体更新 */
    entityUpdate: string = "/app/stq/entity/update";
    /** 实体插入*/
    entityInsert: string = "/app/stq/entity/insert";
    /** 实体删除     */
    entityDelete: string = "/app/stq/entity/delete";
}


export class LocalAppConfig extends AppConfig {
    debug: boolean = true;
    // ip: string = 'http://localhost'
}
/**
 * 线上环境配置
 */
export class ProdAppconfig extends AppConfig {
    // ip: string = 'http://dev.fastsun.com.cn:9090'
}