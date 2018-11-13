import { MetaCom } from "./MetaCom";
import { getProp } from "./Prop";
import { AbstractTree } from "../struct/AbstractTree";
export const metaKey = Symbol("metaId");

/**
 * 用于单表查询的装饰器
 * 
 * @param value 
 */
export function MetaEntity(value?: MetaCom) {
    let defaultMetaObject: MetaCom = {
        power: 0,
        data: { customUrl: {}, presetObject: {}, presetConditions: null },
        view: { pageSize: 1000, }, firstLoad: true,
    } as MetaCom;
    if (value.firstLoad == false) {
        defaultMetaObject.firstLoad = false;
    }
    if (value) {
        if (value.data) {
            if (value.data.customUrl) {
                defaultMetaObject.data.customUrl = value.data.customUrl;
            }
            if (value.data.presetConditions) defaultMetaObject.data.presetConditions = value.data.presetConditions;
        }
        if (value.view) {
            if (value.view.pageSize) {
                defaultMetaObject.view.pageSize = value.view.pageSize;
            }
        }
        if (value.dynamicEditor) defaultMetaObject.dynamicEditor = value.dynamicEditor;
        if (value.power != null) {
            defaultMetaObject.power = value.power;
        }
        if (value) {
            value = Object.assign(value, defaultMetaObject);
        }


    }
    else value = <MetaCom>defaultMetaObject;
    return (target: any) => {
        value.isEntity = true;
        if (!value.data) value.data = {};
        if (new target() instanceof AbstractTree) {
            if (value.view) {
                value.view.viewType = "tree";
            } else {
                value.view = { viewType: "tree", pageSize: 1000 }
            }
            value.view.treeClass = target;
        }
        if (!value.objectName) value.objectName = target.name;
        value.originClass = target;
        Reflect.defineMetadata(metaKey, value, target)
        return target;
    }
}
export function getMetaEntity(target: any): MetaCom {
    let metaObject: MetaCom = Reflect.getMetadata(metaKey, target);
    metaObject.metaFields = getProp(target.prototype);
    return metaObject;
} 