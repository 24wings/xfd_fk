import { QueryField } from "./QueryField";
import { QueryCondition } from "./QueryCondition";

export class QueryObject {
    [key: string]: string | number | QueryField;
    static toQueryContions = (queryObject: QueryObject): QueryCondition[] => {
        let conditions: QueryCondition[] = []
        for (let key in queryObject) {
            if (key != "toQueryParameter") {
                let value = queryObject[key];
                let type: string;
                if (typeof value == "string") {
                    type = "string"
                }
                if (typeof value == "boolean")
                    type = "boolean";
                if (typeof value == "number") {
                    type = "number"
                }
                if (Array.isArray(value)) {
                    throw new Error("不支持数组");
                }

                if (typeof value == "object") {
                    type = "object";
                }
                if (value instanceof Date) {
                    type = "date"
                }

                switch (type) {
                    case "string":
                    case "number":
                    case "date":
                        conditions.push(new QueryCondition(key, "=", value, "and"))
                        break;
                    case "boolean":
                        conditions.push(new QueryCondition(key, "=", value ? 1 : 0, "and"))
                        break;
                    default:
                        for (let op in value as QueryField) {
                            let field = value[op];
                            switch (op) {
                                case "$lt":
                                    conditions.push(new QueryCondition(key, "<", field, "and"))
                                    break;
                                case "$gt":
                                    conditions.push(new QueryCondition(key, ">", field, "and"));
                                    break;
                                case "$notEq":
                                    conditions.push(new QueryCondition(key, "!=", field, "and"));
                                    break;
                                case "$like":
                                    conditions.push(new QueryCondition(key, ":", field, "and"));
                                    break;
                                case "$likeStart":
                                    conditions.push(new QueryCondition(key, "l:", field, "and"));
                                    break;
                                case "$likeEnd":
                                    conditions.push(new QueryCondition(key, ":l", field, "and"));
                                    break;
                                default:
                                    break;
                            }

                        }
                        break;
                }
            }
        }
        return conditions;
    }
    /** or 并联查询 */
    static Or(queryObjects: QueryObject[]) {
        let conditions = []
        for (let obj of queryObjects) {
            let queryConditions = QueryObject.toQueryContions(Object.assign(obj, new QueryObject()));
            queryConditions[queryConditions.length - 1].andOr = "or"
            conditions.push(...queryConditions);
        }
        return conditions;
    }
}