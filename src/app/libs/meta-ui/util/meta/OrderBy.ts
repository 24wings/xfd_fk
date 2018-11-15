import { keysKey } from "./Prop";
import { Field } from "./Field";

export function OrderBy(sort: "DESC" | "ASC") {
    return (target, prop) => {
        let fields: Field[] = Reflect.getMetadata(keysKey, target);
        if (fields) {
            let field = fields.find(filed => filed.fieldName == prop);
            field.sort = sort;
        }
    }
}
