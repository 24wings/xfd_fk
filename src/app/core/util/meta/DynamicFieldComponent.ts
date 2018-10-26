import { Field } from "./Field";
import { keysKey } from "./Prop";

export function DynamicFieldComponent(component: any) {
    return (target: any, propKey: string) => {
        let keys: Field[] = Reflect.getMetadata(keysKey, target);
        // console.log(keys);
        if (keys) {
            let key: Field = keys.find(key => key.fieldName == propKey);
            if (key) {
                delete key.type;
                key.dynamicComponent = component;
            } else {
                console.error('no key found ')
            }
        }
    }
}