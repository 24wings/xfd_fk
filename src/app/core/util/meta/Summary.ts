import { keysKey } from "./Prop";
import { Field } from "./Field";

export function Summary(arr: ISummary[]) {
    return (target: any, propKey: string) => {
        let fields: Field[] = Reflect.getMetadata(keysKey, target);
        if (fields) {
            let field = fields.find(item => item.fieldName == propKey);
            if (!field.summarys) field.summarys = [];
            field.summarys = arr.map(item => {
                return {
                    fieldName: propKey,
                    alias: item.alias,
                    method: item.method,
                    rowspan: item.rowspan ? item.rowspan : 1,
                    colspan: item.colspan ? item.colspan : 1
                }
            });
        } else {
            throw new Error("not found metaCom")
        }
    }
}

export interface ISummary {
    fieldName: string;
    alias: string;
    method: "SUM";
    colspan: number;
    rowspan: number;
}