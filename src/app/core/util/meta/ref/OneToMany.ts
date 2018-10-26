import { Field } from "../Field";
import { keysKey } from "../Prop";
import { Types } from "../types/indext";
import { Transform } from "../Transform";
import { metaKey } from "../MetaEntity";
import { AbstractTree } from "../../struct/AbstractTree";
export function OneToMany($ref: any, opt?: { searchKey?: string, transform?: Transform }) {
    return (target: any, propKey: string) => {
        let keys: Field[] = Reflect.getMetadata(keysKey, target);
        // let type = Reflect.getMetadata('design:type', target, propKey);
        let metaObject = Reflect.getMetadata(metaKey, $ref);
        if (keys) {
            let key = keys.find(key => key.fieldName == propKey);
            if (key) {
                key.config.$ref = $ref;
                key.metaObject = metaObject;
                if (typeof $ref in ['string', 'number', 'boolean', 'date']) {
                    throw Error('please set referenc origin type to refence type,boolean,date,string');
                } else {
                    key.config.databaseType = $ref;
                    key.config.many = true;
                    if (new $ref() instanceof AbstractTree) {
                        key.type = Types.RefTreees
                    } else {
                        key.type = Types.RefTablees;
                    }
                    if (opt) {
                        if (opt.transform)
                            key.config.searchKey = opt.searchKey;
                        if (opt.transform) key.transform = opt.transform
                    }
                }
            } else {
                throw Error('please add decorator before another decoreator')
            }
        }
    }
}

