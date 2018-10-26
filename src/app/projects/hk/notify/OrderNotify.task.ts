import { MetaNotify } from "@core/util/meta/IMetaNotify";
import { EntityEnum } from "app/entity.enum";
import { MsgTypeEnum } from "../enum/MsgType.enum";
import { MsgNotify } from "../meta/MsgNotify";
import { IMsgNotify } from "@core/util/notify/IMsgNotify";
import { MetaEntity } from "@core/util/meta/MetaEntity";
import { Prop } from "@core/util/meta/Prop";
import { Adapter } from "@core/util/meta/Adapter";
import { SelectOne } from "@core/util/meta/ref/SelectOne";
import { getAlias } from "@core/util/meta/alias";
import { OrderStatusEnum } from "../enum/OrderStatus.enum";
import { Select } from "@core/util/meta/types/Select";
import { U } from "@core/util/meta/Power";


@MetaNotify({ viewName: "order-notify-task", msgType: MsgTypeEnum.Task, isWebpush: true })
@MetaEntity({ objectCode: EntityEnum.Order, objectName: "订单消息任务" })
export class OrderNotifyTask extends MsgNotify implements IMsgNotify {
    id: number;
    @Prop("去程航班", { readonly: true })
    boundFlightCode: string;
    @Adapter({ read: (dt: string) => new Date(dt).format('yyyyMMdd') })
    @Prop("去程日期", { readonly: true })
    boundDate: Date;
    @Prop("返回航班", { readonly: true })
    returnFlightCode: string;
    @Adapter({ read: (dt: string) => new Date(dt).format('yyyyMMdd') })
    @Prop("返程日期", { readonly: true })
    returnDate: Date;

    @Prop("行程信息", { readonly: true, power: U })
    tripInfo: string;
    /**成人数*/
    @Prop("成人数", { readonly: true })
    count_a: number;
    @Prop("成人价", { readonly: true })
    price_a: number;
    @Prop("儿童数", { readonly: true })
    count_c: number;
    @Prop("儿童价", { readonly: true })
    price_c: number;
    /**订单金额*/
    @Prop("订单金额", { readonly: true })
    amount: number;
    /**乘客信息*/
    @Prop("乘客信息", { readonly: true, power: U })
    passengerInfo: string;
    // @Prop("乘客信息", { readonly: true })
    /**乘客信息URL*/
    // passengerUrl: string;
    @SelectOne(getAlias(OrderStatusEnum))
    @Prop("订单状态")
    status: Select<OrderStatusEnum>;
    memberName;
    getTitle = () => `恭喜 ` + this.memberName + `,等待管理员审核`;
    getAddtion = () => JSON.stringify({ id: this.id, extral: "待审核" });
    getContent = () => `恭喜 ${this.memberName},等待管理员审核`;
    getMsgType = () => MsgTypeEnum.Task;
    getUserId = () => JSON.parse(localStorage.getItem("employee")).id;
    getOrgId = () => JSON.parse(localStorage.getItem("employee")).orgId;
}