import { Field } from "../Field";
import { keysKey } from "../Prop";

export function Query() {
    return (target: any, propKey: string) => {
        let keys: Field[] = Reflect.getMetadata(keysKey, target);
        // console.log(keys);
        if (keys) {
            let key: Field = keys.find(key => key.fieldName == propKey);
            if (key) {
                key.isQuery = true;
            }
        }
    }


}