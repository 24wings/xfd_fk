import { QueryObject } from "../stq/QueryObject";
import { Field } from "./Field";
import { AbstractTree } from "../struct/AbstractTree";
import { ModeEnum } from "./Mode.enum";
import { IMetaComLifecycle } from "../spec/IMetaComLifeCycle";
import { ICustomUrl } from "./ICustomUrl";
import { IToolbar } from "./IToolbar";
import { IMetaNotify } from "./IMetaNotify";
import { IAction } from "./Action";
import { Flow } from "./Flow";
import { EntityEnum } from "app/entity.enum";
import { ISummary } from "./Summary";


export class MetaCom {
    hideCheckbox?: boolean;
    firstLoad?: boolean;
    summarys?: ISummary[]
    database?: string;
    defaultNewDataItem?: any;
    flow?: { create?: Flow, update?: Flow };
    initState?: MetaCom;
    actions?: IAction[];
    defaultMode?: ModeEnum;
    objectName?: string;
    dynamicEditor?: any;
    lifeCycle?: IMetaComLifecycle;
    notify?: IMetaNotify;

    isEntity?: boolean;
    querySql?: string;
    objectCode?: EntityEnum;
    data?: {
        presetObject?: QueryObject;
        presetValue?: any;
        customUrl?: ICustomUrl;
    }
    view?: {
        pageSize?: number;
        viewType?: "table" | "tree";
        treeClass?: new () => AbstractTree<any>;
        toolbar?: IToolbar;
        dynamicQueryToolbar?: any;
    }
    power?: number;

    filter?: string;
    defaultOrder?: string;
    bizIntercept?: string;
    metaFields?: Field[];
    /** meta原始类
     * 
     * 
     * @MetaEntity()
     * class UserManage{
     * }
     * 原始的用户管理页面
     */
    originClass?: any;
}

