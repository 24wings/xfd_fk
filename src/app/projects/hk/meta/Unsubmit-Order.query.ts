import { EntityEnum } from "../../../entity.enum";
import { Toolbar } from "@core/util/meta/Toolbar";
import { MetaEntity } from "@core/util/meta/MetaEntity";
import { Order } from "../entity/Order";
import { Table } from "@core/util/struct/Table";
import { Prop } from "@core/util/meta/Prop";
import { getAlias } from "@core/util/meta/alias";
import { SelectOne } from "@core/util/meta/ref/SelectOne";
import { ProductTargetEnum } from "../enum/ProductTarget";
import { OrderStatusEnum } from "../enum/OrderStatus.enum";
import { Select } from "@core/util/meta/types/Select";
import { Query } from "@core/util/meta/query/Query";
import { Adapter } from "@core/util/meta/Adapter";
import { S } from "@core/util/meta/Power";

@Toolbar([{ label: "通知", eventName: "notify-admin", multi: false }])
@MetaEntity({ objectCode: EntityEnum.Order, objectName: "我的订单" })
export class UnsubmitOrderQuery implements Table<Order>{
    @Prop("产品名字")
    productName: string;
    @Prop("订单编号")
    orderNo: string;
    @Prop("产品编号", { readonly: true })
    productCode: string;
    @Prop("下单人", { power: S })
    memberName: string
    @Prop("成人价格", { readonly: true })
    price_a: number;
    @Prop("儿童价", { readonly: true })
    price_c: number;
    @SelectOne(getAlias(ProductTargetEnum))
    @Prop("目标群体", { readonly: true })
    target: ProductTargetEnum;
    @Prop("返回航班", { readonly: true })
    returnFlightCode: string;
    @Prop("去程航班号", { readonly: true })
    /**去程航班号*/
    boundFlightCode: string;
    @Adapter({ read: (dt: Date) => new Date(dt).format('yyyy-MM-dd') })
    @Prop("去程日期")
    boundDate: Date;
    @Adapter({ read: (dt: Date) => new Date(dt).format('yyyy-MM-dd') })
    @Prop("返程日期")
    returnDate: Date;
    @Prop("行程信息")
    tripInfo: string;
    @Prop("成人数")
    count_a: number;
    @Prop("儿童数")
    count_c: number;
    @Prop("订单金额")
    amount: number;
    @Prop("乘客信息")
    passengerInfo: string;
    @Prop("乘客信息")
    passengerUrl: string;
    @Query()
    @SelectOne(getAlias(OrderStatusEnum))
    @Prop("订单状态", { readonly: true })
    status: Select<OrderStatusEnum>
}