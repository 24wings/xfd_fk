import { MetaCom } from "./MetaCom";
import { metaKey } from "./MetaEntity";
import { IState } from "./State";
export type Flow = IState[];

export function MetaFlow(flow: { create?: Flow, update?: Flow, }) {
    return target => {
        let metaCom: MetaCom = Reflect.getMetadata(metaKey, target);
        metaCom.flow = flow;
        Reflect.defineMetadata(metaKey, metaCom, target)
        return target;
    }
}
