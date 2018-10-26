import { MsgTypeEnum } from "../enum/MsgType.enum";

export class MsgNotify {
    /** 为空时全部发 */
    orgId: number;
    /**发给用户,为空时不限制 */
    userId: number;
    msgType: MsgTypeEnum;// 消息类型
    title: string;// 消息摘要
    content: string;// 消息内容
    addition: string;// 附加内容
    isRead: boolean = false;
    isJPush: boolean = false;
    isWebpush: boolean = true;
    createTime: Date = new Date();
    /**创建人Id*/
    creatorId: number = JSON.parse(localStorage.getItem("employee")) ? JSON.parse(localStorage.getItem("employee")).id : '';
    /** 创建人姓名*/
    creator: string = JSON.parse(localStorage.getItem("employee")) ? JSON.parse(localStorage.getItem("employee")).name : '';
}
