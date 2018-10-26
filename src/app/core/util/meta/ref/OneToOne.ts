import { Field } from "../Field";
import { keysKey } from "../Prop";
import { Types } from "../types/indext";
import { metaKey } from "../MetaEntity";
import { AbstractTree } from "../../struct/AbstractTree";

export function OneToOne(opt?: { searchKey: string }) {
    return (target: any, propKey: string) => {
        let keys: Field[] = Reflect.getMetadata(keysKey, target);
        let type = Reflect.getMetadata('design:type', target, propKey);
        let metaObject = Reflect.getMetadata(metaKey, type);
        if (!type) console.error('no type', type)
        if (keys) {
            let key = keys.find(key => key.fieldName == propKey);
            if (key) {
                key.config.$ref = type;
                key.metaObject = metaObject;
                if (typeof type in ['string', 'number', 'boolean', 'date']) {
                    throw Error('please set referenc origin type to refence type,boolean,date,string');
                } else {
                    if (new type() instanceof AbstractTree) {
                        key.type = Types.RefTree;
                        key.config.databaseType = type;
                    } else {
                        key.config.databaseType = type;
                        key.type = Types.RefTable;
                        if (opt) {
                            key.config.searchKey = opt.searchKey;
                        }
                    }
                }
            } else {
                throw Error('please add decorator before another decoreator')
            }
        }
    }
} 