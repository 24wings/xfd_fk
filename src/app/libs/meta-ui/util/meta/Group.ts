import { keysKey } from "./Prop";
import { Field } from "./Field";

export function Group(groupOptions: GroupOptions) {
    return (target, prop) => {
        let fields: Field[] = Reflect.getMetadata(keysKey, target);
        let field = fields.find(field => field.fieldName == prop);
        if (field) {
            field.groupOptions = groupOptions;
        } else {
            throw new Error("please add decoreator before ");
        }

    }
}

export type GroupOptions = {
    /**表头字段 */
    fields: { alias: string, fieldName: string }[],
    /** 数据,含明细, */
    // parse: () => { data: any, children: any[] }[]
};
export interface IGroup {
    fields: { alias: string, fieldName: string }
    data: any;
    children: any[]
    expand: boolean;

}