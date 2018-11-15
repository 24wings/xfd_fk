import { Field } from "./Field";
import { keysKey } from "./Prop";

export function ID() {
    return (target: any, propKey: string) => {
        let keys: Field[] = Reflect.getMetadata(keysKey, target);
        if (keys) {
            let key: Field = keys.find(key => key.fieldName == propKey);
            if (key) {
                key.isPk = true;
            }
        }
    }
}