import { IMetaComLifecycle } from "../spec/IMetaComLifeCycle";
import { MetaCom } from "./MetaCom";
import { metaKey } from "./MetaEntity";
import { ICustomUrl } from "./ICustomUrl";

export function CustomUrl(customUrl: ICustomUrl) {
    return (target: any) => {
        let metaCom: MetaCom = Reflect.getMetadata(metaKey, target);
        if (!metaCom.data) metaCom.data = {};
        metaCom.data.customUrl = customUrl;
    }
}