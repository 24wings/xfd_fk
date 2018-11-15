import { IAction } from "./Action";
import { metaKey } from "./MetaEntity";
import { MetaCom } from "./MetaCom";
import { Field } from "./Field";
import { keysKey } from "./Prop";

export type IState = { title?: string, id: string, actions: IAction[] };
export function State(state: { create?: string, update?: string }) {
    return (target: any, propKey: string) => {
        let keys: Field[] = Reflect.getMetadata(keysKey, target);
        // console.log(keys);
        if (keys) {
            let key: Field = keys.find(key => key.fieldName == propKey);
            if (key) {
                key.state = state;
            }
        }
    }
}


