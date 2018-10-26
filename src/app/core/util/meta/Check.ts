import { Valid } from "./Valid";
import { keysKey } from "./Prop";
import { Field } from "./Field";
export function Check(valid: boolean | Valid | RegExp) {

    return (target: any, propKey: string) => {
        let keys: Field[] = Reflect.getMetadata(keysKey, target);
        // console.log(keys);
        if (keys) {
            let key = keys.find(key => key.fieldName == propKey);
            if (key) {
                if (typeof valid == 'object') {
                    if (valid instanceof RegExp) {
                        valid = Object.assign(key.valid, { required: true, regexp: valid });
                    } else {
                        (key as Valid).required = true;
                        valid = Object.assign(key.valid, valid);

                    }
                }
                if (typeof valid == 'boolean') {
                    valid = Object.assign(key, { required: valid });
                }

                key.valid = valid as Valid;
            }
        }
    }
}

