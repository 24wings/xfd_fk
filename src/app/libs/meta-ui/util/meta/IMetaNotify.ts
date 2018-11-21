import { MetaCom } from "./MetaCom";
import { metaKey } from "./MetaEntity";
import { ModeEnum } from "./Mode.enum";

export interface IMetaNotify {
    viewName: string;
    isJPush?: boolean;
    isWebpush?: boolean;
    // msgType: MsgTypeEnum;
}

export function MetaNotify(notify: IMetaNotify) {
    return (target: any) => {
        if (!notify.isJPush) notify.isJPush = false;
        if (!notify.isWebpush) notify.isWebpush = false;
        let metaCom: MetaCom = Reflect.getMetadata(metaKey, target);
        metaCom.defaultMode = ModeEnum.Info;
        if (!metaCom.data) metaCom.data = {};
        metaCom.notify = notify;
    }
}
export function getMetaNotify(target): IMetaNotify {
    let metaCom: MetaCom = Reflect.getMetadata(metaKey, target);
    return metaCom.notify;
}