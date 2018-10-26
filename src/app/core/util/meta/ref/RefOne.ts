import { keysKey } from "../Prop";
import { Field } from "../Field";

export function RefOne($ref: any) {
    return (target: any, propKey: string) => {
        let keys: Field[] = Reflect.getMetadata(keysKey, target);
        console.log(keys);
        let type = Reflect.getMetadata('design:type', target, propKey);
        if (keys) {
            let key = keys.find(key => key.fieldName == propKey);
            if (key) {
                key.config.$ref = $ref;
                if (typeof type in ['string', 'number', 'boolean', 'date']) {
                    key.config.databaseType = type;
                } else {
                    throw Error('please set referenc origin type to number,boolean,date,string');
                }
            } else {
                throw Error('please add decorator before another decoreator')
            }
        }
    }
}

