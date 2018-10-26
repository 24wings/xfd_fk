import { IToolbar } from "./IToolbar";
import { metaKey } from "./MetaEntity";
import { MetaCom } from "./MetaCom";

export function Toolbar(toolbar: IToolbar) {
    return (target: any) => {
        let metaCom: MetaCom = Reflect.getMetadata(metaKey, target);
        if (!metaCom.view) metaCom.view = {}
        metaCom.view.toolbar = toolbar;
    }
} 