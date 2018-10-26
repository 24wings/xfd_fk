import { EntityEnum } from "../../../entity.enum";
import Decimal from "decimal.js";
import { MetaEntity } from "@core/util/meta/MetaEntity";
import { Table } from "@core/util/struct/Table";
import { Order } from "../entity/Order";
import { ID } from "@core/util/meta/ID";
import { Prop } from "@core/util/meta/Prop";
import { S } from "@core/util/meta/Power";
import { getAlias } from "@core/util/meta/alias";
import { SelectOne } from "@core/util/meta/ref/SelectOne";
import { ProductTargetEnum } from "../enum/ProductTarget";
import { Select } from "@core/util/meta/types/Select";
import { OrderStatusEnum } from "../enum/OrderStatus.enum";

@MetaEntity({ objectCode: EntityEnum.Order, objectName: "订单创建" })
export class OrderCreate implements Table<Order>{
    @ID()
    @Prop("id", { power: 0 })
    id: number;
    @Prop("产品名字", { readonly: true })
    productName: string;
    // @Prop("订单编号")
    // orderNo: string;
    @Prop("下单人", { power: S })
    memberName: string = localStorage.getItem('member') ? JSON.parse(localStorage.getItem('member')).name : '';
    @Prop("产品名字", { readonly: true })
    productCode: string;
    /**产品目标*/
    @Prop("成人价格", { readonly: true })
    /**成人价*/
    price_a: number;
    @Prop("儿童价", { readonly: true })
    /**儿童价*/
    price_c: number;
    @SelectOne(getAlias(ProductTargetEnum))
    @Prop("目标群体", { readonly: true })
    target: ProductTargetEnum;
    @Prop("返回航班", { readonly: true })
    returnFlightCode: string;
    @Prop("去程航班号", { readonly: true })
    /**去程航班号*/
    boundFlightCode: string;
    @SelectOne([])
    @Prop("去程日期")
    /**去程日期*/
    boundDate: Select<Date>;
    /**返程航班*/
    @SelectOne([])
    @Prop("返程日期")
    returnDate: Select<Date>;
    @Prop("行程信息")
    tripInfo: string;

    /**成人数*/
    @Prop("成人数")
    count_a: number;
    @Prop("儿童数")
    count_c: number;
    /**订单金额*/
    @Prop("订单金额")
    amount: number;
    /**乘客信息*/
    @Prop("乘客信息")
    passengerInfo: string;
    @Prop("乘客信息")
    /**乘客信息URL*/
    passengerUrl: string;
    memberId: number = localStorage.getItem('member') ? JSON.parse(localStorage.getItem('member')).id : '';
    /**订单状态*/
    status: OrderStatusEnum = OrderStatusEnum.UNSUBMITTED;

}