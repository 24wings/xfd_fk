import { IMetaComLifecycle } from "../spec/IMetaComLifeCycle";
import { MetaCom } from "./MetaCom";
import { metaKey } from "./MetaEntity";

export function Lifecycle(lifecycle: IMetaComLifecycle) {
    return (target: any) => {
        let metaCom: MetaCom = Reflect.getMetadata(metaKey, target);
        metaCom.lifeCycle = lifecycle;
    }
} 