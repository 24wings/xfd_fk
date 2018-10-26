import { metaKey } from "../MetaEntity";
import { MetaCom } from "../MetaCom";

export function DynamicToolbar(toolbarCom: any) {
    return (target: any) => {
        let metaObject: MetaCom = Reflect.getMetadata(metaKey, target);
        metaObject.view.dynamicQueryToolbar = toolbarCom;
        Reflect.defineMetadata(metaKey, metaObject, target)
        return target;
    }
}