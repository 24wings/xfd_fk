import { MsgTypeEnum } from "../enum/MsgType.enum";

export class MsgNotify {
    id: number;
    /** 为空时全部发 */
    orgId: number;
    userId: number;// 发给app用户,为空时不限制Customer
    msgType: MsgTypeEnum;// 消息类型
    title: string;// 消息摘要
    content: string;// 消息内容
    addition: string;// 附加内容
    createTime: Date = new Date();// 创建时间
    creatorId: number;// 创建人Id
    creator: string;// 创建人姓名
    isRead: boolean = false;
    isJPush: boolean = false;
    isWebpush: boolean = true;
    viewName: string;
}