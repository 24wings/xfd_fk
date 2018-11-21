import { IMsgNotify } from "./IMsgNotify";
import { getMetaNotify } from "../meta/IMetaNotify";
// import { MsgNotify } from "app/projects/hk/entity/MsgNotify";

export function createNotify(notifyClass: new () => null, notifys: any) {

    if (!Array.isArray(notifys)) {
        notifys = [Object.assign(new notifyClass(), notifys)];
    }
    let metaNotify = getMetaNotify(notifyClass);
    notifys.forEach(notify => {
        notify.content = notify.content = notify.getContent()
        notify.addition = notify.getAddtion();
        notify.title = notify.getTitle();
        // notify.msgType = metaNotify.msgType;
        notify.userId = notify.getUserId();
        notify.orgId = notify.getOrgId();
        notify.viewName = metaNotify.viewName;
    })
    if (localStorage.getItem('notifys')) {
        let oldNotifys = (JSON.parse(localStorage.getItem('notifys')) as IMsgNotify[]);
        oldNotifys.push(...notifys)
        localStorage.setItem('notifys', JSON.stringify(oldNotifys));
    } else {
        localStorage.setItem('notifys', JSON.stringify(notifys));

    }
}

export function getNotifys() {
    return localStorage.getItem('notifys') ? localStorage.getItem('notifys') : []
} 