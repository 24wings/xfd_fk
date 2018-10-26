import { ProductTargetEnum } from "../enum/ProductTarget";
import Decimal from "decimal.js";
import { OrderStatusEnum } from "../enum/OrderStatus.enum";
import { Select } from "@core/util/meta/types/Select";

export class Order {
    id: Number;
    /**订单号:前缀+年月日+6位流水号A20180101000001*/
    orderNo: string;
    /**产品代码*/
    productCode: string;
    /**产品名称*/
    productName: string;
    /**产品目标*/
    target: ProductTargetEnum;
    /**去程航班号*/
    boundFlightCode: string;
    /**去程日期*/
    boundDate: Date | any;
    /**返程航班*/
    returnFlightCode: string;
    /**返程日期*/
    returnDate: Date | any;
    /**行程信息*/
    tripInfo: string;
    /**成人价*/
    price_a: number | Decimal;
    /**儿童价*/
    price_c: number;
    /**成人数*/
    count_a: number;
    /**儿童数*/
    count_c: number;
    /**订单金额*/
    amount: number;
    /**乘客信息*/
    passengerInfo: string;
    /**乘客信息URL*/
    passengerUrl: string;
    /**订单状态*/
    status: OrderStatusEnum | Select<OrderStatusEnum>;
}