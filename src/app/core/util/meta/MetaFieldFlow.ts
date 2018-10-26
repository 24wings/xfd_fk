import { Field } from "./Field";
import { keysKey } from "./Prop";
import { Flow } from "./Flow";

export function MetaFieldFlow(flow: { create?: Flow, update?: Flow }) {
    return (target: any, propKey: string) => {
        let keys: Field[] = Reflect.getMetadata(keysKey, target);
        // console.log(keys);
        if (keys) {
            let key: Field = keys.find(key => key.fieldName == propKey);
            if (key) {
                key.flow = flow;
            }
        }
    }
}   