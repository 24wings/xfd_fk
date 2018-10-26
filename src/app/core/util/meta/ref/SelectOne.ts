import { Field } from "../Field";
import { keysKey } from "../Prop";
import { Types } from "../types/indext";

export function SelectOne(opt: { options: { alias: string, value: any }[] } | { alias: string, value: any }[]) {
    return (target: any, propKey: string) => {
        let keys: Field[] = Reflect.getMetadata(keysKey, target);
        if (keys) {
            let key = keys.find(key => key.fieldName == propKey);
            if (key) {
                key.type = Types.Select;
                if (opt) {
                    if (Array.isArray(opt)) {
                        key.options = opt
                    } else {
                        key.options = opt.options
                    }
                } else {
                    throw Error("please set options ")
                }
            }
        } else {
            throw Error('please add decorator before another decoreator')
        }
    }
} 