import { Field } from "./Field";
import { keysKey } from "./Prop";
import { MetaCom } from "./MetaCom";
import { metaKey } from "./MetaEntity";

export function Lazy() {
    return (target, prop) => {
        let fields: Field[] = Reflect.getMetadata(keysKey, target);
        if (fields) {
            let field = fields.find(filed => filed.fieldName == prop);
            field.isLazy = true;
        }
    }
}

export function LazyClass() {
    return (target: any) => {
        let metaCom: MetaCom = Reflect.getMetadata(metaKey, target);
        if (!metaCom.view) metaCom.view = {}
        metaCom.isLazy = true;
    }
} 