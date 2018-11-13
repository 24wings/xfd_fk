import { MetaEntity } from "@core/util/meta/MetaEntity";
import { XfdFxEntityEnum } from "../xfd_fk.EntityEnum";
import { ID } from "@core/util/meta/ID";
import { Prop } from "@core/util/meta/Prop";
import { OrderStatusEnum } from "../enums/OrderStatus.enum";
import { Adapter } from "@core/util/meta/Adapter";
import { S } from "@core/util/meta/Power";
import { SelectOne } from "@core/util/meta/ref/SelectOne";
import { getAlias } from "@core/util/meta/alias";
import { Toolbar } from "@core/util/meta/Toolbar";
import { DynamicToolbar } from "@core/util/meta/custom/DynamicToolbar";
import { OrderQueryComponent } from "@shared/com/dynamic-com/order-query/order-query.component";
import { OrderBy } from "@core/util/meta/OrderBy";
@DynamicToolbar(OrderQueryComponent)
@MetaEntity({ objectCode: XfdFxEntityEnum.Order as any, objectName: "订单", view: { pageSize: 10 } })
export class Order {
    @ID()
    @Prop("ID", { power: 0 })
    id: number;
    @Prop("订单号", { power: S })
    orderNo: string;
    // @Prop("会员编号")
    buyMerchCode: string;
    @Prop("会员卡号")
    cardNo: string;
    @Prop("会员姓名")
    buyMerchName: string;
    @Prop("交易前金额")
    beforeAmount: string;
    @Prop("订单金额")
    amount: number;
    @Prop("交易后金额")
    afterAmount: number;
    @SelectOne([{ alias: "充值", value: "RECHARGE" }, { alias: "交易", value: "TRANS" }, { alias: "清零", value: "CLEAR" }])
    @Prop("订单类型")
    orderType: string;

    // @Prop("操作员编号")
    operatorNo: string;          // 操作员编号
    @Prop("操作员姓名")
    operatorName: string;        // 操作员姓名
    // @SelectOne(getAlias(OrderStatusEnum))
    // @Prop("订单状态")
    status: OrderStatusEnum;         //订单状态

    @OrderBy("DESC")
    @Adapter({ read: (dt: Date) => dt && (dt instanceof Date) ? dt.format('yyyy-MM-dd hh:mm') : new Date(dt).format('yyyy-MM-dd hh:mm') })
    @Prop("创建时间")
    createTime: Date;//创建时间
    // @Adapter({ read: (dt: Date) => dt && (dt instanceof Date) ? dt.format('yyyy-MM-dd') : new Date(dt).format('yyyy-MM-dd') })
    // @Prop("结算时间")
    actTime: Date;//结算时间

    // @Prop("备注")
    remark: string;
}
