import "reflect-metadata";
import { Field } from "./Field";
import { AbstractTree } from "../struct/AbstractTree";
import { Types } from "./types/indext";
import { C, S, Q, U } from "./Power";
// import { getMetaEntity, MetaEntity } from "./MetaEntity";
// import { Picture } from "./types/Picture";
// import { MetaCom } from "./MetaCom";
// import { Pictures } from "./types/Pictures";
export const keysKey = Symbol("keys");

/** 
 * 用于单表查询的装饰器
 * 使用方法如下
 * @Prop("用户名")
 * userName:string;
 * 
 * @Prop("年龄")
 * age:number
 * 
 * @Prop({power:C|R|S,alias:"创建时间"}) 
 * createTime:Date;
 * 
 */

function Prop(alias: string, value?: Field): any {
    let defaultValue = { power: C | U | S, config: {}, valid: { required: true, key: alias } } as Field;
    if (value) {
        if (value.config) defaultValue.config = value.config;
        if (value.readonly != null && value.readonly != undefined) defaultValue.readonly = value.readonly;
        if (value.power || value.power === 0) defaultValue.power = value.power;
        if (value.options) defaultValue.options = value.options;
        if (value.dynamicHtml) defaultValue.dynamicHtml = value.dynamicHtml;
    }
    if (alias) {
        if (typeof alias == 'string') {
            if (value) {
                value = Object.assign(value ? value : {}, defaultValue);
                if (typeof value == 'object') {
                    value.alias = alias;
                }
            } else {
                value = Object.assign(defaultValue, { alias });
            }
        }
    }
    if (!alias) value = defaultValue;
    return (target: any, propKey: string) => {
        value.fieldName = propKey;
        let type = Reflect.getMetadata('design:type', target, propKey);
        if (new type() instanceof AbstractTree) {
            value.type = Types.RefTree;
            value.config.$ref = type;
        } else {
            if (!value.type)
                value.type = type;
        }
        let keys = Reflect.getMetadata(keysKey, target);
        if (!keys) {
            keys = [value]
        } else {
            keys.push(value);
        }
        Reflect.defineMetadata(keysKey, keys, target);
    }
}

function getProp(target: any) {
    return Reflect.getMetadata(keysKey, target);
}
export { Prop, getProp }

