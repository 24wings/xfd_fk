import { Transform } from "./Transform";
import { Field } from "./Field";
import { keysKey } from "./Prop";

export function Adapter(transform: Transform) {
    return (target: any, propKey: string) => {
        let keys: Field[] = Reflect.getMetadata(keysKey, target);
        if (keys) {
            let key: Field = keys.find(key => key.fieldName == propKey);
            if (key) {
                key.transform = transform;
            } else {
                console.error('please add decorator pre another prop')
            }
        }
    }
}