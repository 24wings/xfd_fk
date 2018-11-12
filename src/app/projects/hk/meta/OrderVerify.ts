import { EntityEnum } from "../../../entity.enum";
import { MetaEntity } from "@core/util/meta/MetaEntity";
import { Table } from "@core/util/struct/Table";
import { Order } from "../entity/Order";
import { SelectOne } from "@core/util/meta/ref/SelectOne";
import { OrderStatusEnum } from "../enum/OrderStatus.enum";
import { getAlias } from "@core/util/meta/alias";
import { Prop } from "@core/util/meta/Prop";
import { Adapter } from "@core/util/meta/Adapter";
import { U } from "@core/util/meta/Power";


@MetaEntity({ objectCode: EntityEnum.Order, objectName: "订单审批", data: {} })
export class OrderVerify implements Table<Order>{
    // @Prop("产品名字", { readonly: true })
    // productName: string;
    @Prop("订单编号", { readonly: true })
    orderNo: string;
    // @Prop("产品编号", { readonly: true })
    // productCode: string;
    /**产品目标*/

    // @SelectOne(getAlias(ProductTargetEnum))
    // @Prop("目标群体", { readonly: true })
    // target: ProductTargetEnum;
    // @DynamicFieldComponent(DemoStringComponent)
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
    status: OrderStatusEnum;
}