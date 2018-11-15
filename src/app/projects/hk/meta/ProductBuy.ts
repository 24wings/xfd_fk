import { EntityEnum } from "../../../entity.enum";

import { FlightManageSearch } from "./FlightManage";

import { ProdQueryComponent } from "@shared/com/dynamic-com/prod-query/prod-query.component";
import { DynamicToolbar } from "app/libs/meta-ui/util/meta/custom/DynamicToolbar";
import { MetaEntity } from "app/libs/meta-ui/util/meta/MetaEntity";
import { Toolbar } from "app/libs/meta-ui/util/meta/Toolbar";
import { BaseAduitEntity } from "../entity/BaseAduitEntity";
import { Product } from "../entity/Product";
import { Table } from "app/libs/meta-ui/util/struct/Table";
import { AC1 } from "app/libs/meta-ui/util/meta/Power";
import { Prop } from "app/libs/meta-ui/util/meta/Prop";
import { Select } from "app/libs/meta-ui/util/meta/types/Select";
import { ProductTypeEnum } from "../enum/ProcutType.enum";
import { getAlias } from "app/libs/meta-ui/util/meta/alias";
import { SellTypeEnum } from "../enum/SellType.enum";
import { SelectOne } from "app/libs/meta-ui/util/meta/ref/SelectOne";
import { ProductTargetEnum } from "../enum/ProductTarget";
@DynamicToolbar(ProdQueryComponent)
@Toolbar([{ label: "购买", multi: false, checkPower: AC1, eventName: 'product-buy' }])
@MetaEntity({
    objectName: "购买机票",
    objectCode: EntityEnum.Product, data: { customUrl: { create: '/api/product/create' } }
})
export class ProductBuy extends BaseAduitEntity implements Table<Product>{
    id: number;
    /**产品代码(出发地+到达地+航司2字代码+4位流水号 例:WUHBKKCZ0001)*/
    // @Prop("产品代码")
    code: string;
    @Prop("产品名称")
    name: string;
    // /**产品宣传图片文件名*/
    // @Prop("宣传图片")
    // image: Picture;
    // @Check(false)
    // @Prop("国内航线")
    isDomesticLine: boolean;
    @Prop("产品类别", { options: getAlias(ProductTypeEnum) })
    productType: Select<ProductTypeEnum>;
    @Prop('销售方式', { options: getAlias(SellTypeEnum) })
    sellType: Select<SellTypeEnum>;
    // @Adapter({ read: (flight: Flight) => flight.code })
    // @OneToOne({ searchKey: 'code' })
    // @Prop("去程航班")
    // boundFlight: FlightManageSearch;

    // @Adapter({ read: (flight: Flight) => flight.code })
    // @OneToOne({ searchKey: "code" })
    // @Prop("回程航班")
    // returnFlight: FlightManageSearch;
    // @Adapter(Rules.adapter.dateArrTransform)
    // @Prop("去程日期")
    // boundDates: DateArray;
    @Prop("行程天数")
    tripDays: number;
    // @Adapter(Rules.adapter.dateArrTransform)
    // @Prop("回程日期")
    // returnDates: DateArray;
    @Prop("机位数")
    seatCount: number;
    @Prop("剩余机位数")
    restSeat: number;
    // @Prop("成人税费")
    priceTax_a: number;
    // @Prop('儿童税费')
    priceTax_c: number;
    // 代理商
    @Prop('成人价')
    price2B_a: number;
    @Prop('儿童价')
    price2B_c: number;
    // @Prop('C端价格_成人')
    price2C_a: number;
    // @Prop('C端价格_儿童')
    price2C_c: string;
    @Prop("销售规则")
    saleRuler: string;
    // @Prop("成团率(百分数)")
    teamRate: number;
    // @Prop("成行率(百分数)")
    tripRate: number;
    @SelectOne(getAlias(ProductTargetEnum))
    // @Prop('价格目标群体')
    target: ProductTargetEnum;
    // @Adapter(SellerAdapter)
    // @OneToMany(MemberSallerrManage)
    // @Prop("特定代理商", { power: canEdit })
    buyers: string = '';
}
