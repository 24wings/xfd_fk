
export interface IMsgNotify {
    userId?: number;
    title?: string;
    content?: string;
    // msgType?: MsgTypeEnum;
    getUserId?: () => number;
    getOrgId: () => number;
    getTitle(): string;
    getContent(): string;
    getAddtion(): string;
    orgId?: number;
    isJPush: boolean;
    isWebpush: boolean;
    addition?: any;
    createTime: Date;
    creatorId: number;
    creator: string;
    viewName?: string;
    /** 为空时全部发 */
    // /**发给用户,为空时不限制 */
    // userId: number;
    // creatorId: string;// 创建人Id
    // creator: string;// 创建人姓名
}
