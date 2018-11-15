import { EntityEnum } from "../../../entity.enum";
import { checkDev, checkAdmin } from "../util.service";
import { C, U, S, AC1 } from "app/libs/meta-ui/util/meta/Power";
import { CustomUrl } from "app/libs/meta-ui/util/meta/CustomUrl";
import { MetaEntity } from "app/libs/meta-ui/util/meta/MetaEntity";
import { Member } from "../entity/Member";
import { Table } from "app/libs/meta-ui/util/struct/Table";
import { MemberTypeEnum } from "../enum/MemberType.enum";
import { Prop } from "app/libs/meta-ui/util/meta/Prop";
import { Check } from "app/libs/meta-ui/util/meta/Check";
import { Rules } from "app/libs/meta-ui/util/regexp";
import { Select } from "app/libs/meta-ui/util/meta/types/Select";
import { getAlias } from "app/libs/meta-ui/util/meta/alias";
import { AuditStatusEnum } from "../enum/AuditStatus.enum";
import { MetaFlow } from "app/libs/meta-ui/util/meta/Flow";
import { Toolbar } from "app/libs/meta-ui/util/meta/Toolbar";
import { BaseAduitEntity } from "../entity/BaseAduitEntity";
import { Product } from "../entity/Product";
import { ID } from "app/libs/meta-ui/util/meta/ID";
import { State } from "app/libs/meta-ui/util/meta/State";
import { Picture } from "app/libs/meta-ui/util/meta/types/Picture";
import { ProductTypeEnum } from "../enum/ProcutType.enum";
import { SellTypeEnum } from "../enum/SellType.enum";
import { Flight } from "../entity/Flight";
import { Adapter } from "app/libs/meta-ui/util/meta/Adapter";
import { OneToOne } from "app/libs/meta-ui/util/meta/ref/OneToOne";
import { FlightManageSearch } from "./FlightManage";
import { DateArray } from "app/libs/meta-ui/util/meta/types/DateArray";
import { SelectOne } from "app/libs/meta-ui/util/meta/ref/SelectOne";
import { ProductTargetEnum } from "../enum/ProductTarget";
import { OneToMany } from "app/libs/meta-ui/util/meta/ref/OneToMany";
import { QueryObject } from "app/libs/meta-ui/util/stq/QueryObject";

export function canEdit() {
    if (checkDev() || checkAdmin()) {
        return C | U | S
    } else {
        return S;
    }
}
export let SellerAdapter = {
    read: (items: MemberSallerrManage[]) => Array.isArray(items) && items ? items.map(item => item.name) : [],
    write: (members: MemberSallerrManage[]) => members ? (Array.isArray(members) ? members.map(member => member.id).join(',') : members) : ''
}
@CustomUrl({ create: '/api/member/create' })
@MetaEntity({ objectName: "会员管理", objectCode: EntityEnum.Member, data: { presetConditions: QueryObject.toQueryContions({ memberType: MemberTypeEnum.AGENT }) } })
export class MemberSallerrManage implements Table<Member> {
    id: number;
    /**代码（前缀+会员流水号,前缀:供应商S，采购商B，个人C，流水号8位)*/
    @Prop("会员编号", { power: S })
    code: string;
    @Check({ maxLength: 7, minLength: 2 })
    @Prop("名称")
    name: string;
    @Check(Rules.regex.mobile)
    @Prop("手机号")
    mobile: string;
    @Check({ minLength: 2, maxLength: 7 })
    @Prop("负责人姓名")
    principal: string;
    @Prop("联系地址")
    address: string;
    @Prop("银行账户")
    bankInfo: string;
    @Prop("企业税号")
    taxCode: string;
    @Prop("会员类型", { options: getAlias(MemberTypeEnum) })
    memberType: Select<MemberTypeEnum>;
    @Prop("审核状态", { options: getAlias(AuditStatusEnum) })
    memberStatus: Select<AuditStatusEnum>;
}

enum PMCFlow {
    Info = "Info",
    Price = "Price",
    Target = "Target",
    Buyers = "Buyers"
}
@MetaFlow({
    create: [
        { title: "1.输入产品信息", id: PMCFlow.Info, actions: [{ label: "下一步", to: PMCFlow.Price }] },
        { title: "2.输入产品价格", id: PMCFlow.Price, actions: [{ label: "上一步", to: PMCFlow.Info }, { label: "下一步", to: PMCFlow.Target }] },
        {
            title: "3.选择优惠群体", id: PMCFlow.Target, actions: [{ label: "上一步", to: PMCFlow.Price }, {
                label: "确定", to: (product: Product) => {
                    debugger;
                    return product.target == ProductTargetEnum.SPEC ? PMCFlow.Buyers : C
                }
            }]
        },
        { title: "4.如果第三步选择特定群体就会 选择目标群体", id: PMCFlow.Buyers, actions: [{ label: "上一步", to: PMCFlow.Target }, { label: "提交", nzType: "primary", to: C }] },
    ]
})
@Toolbar([{ label: "审核", multi: false, checkPower: AC1, eventName: 'verify' }])
@MetaEntity({
    objectName: "商品管理",
    objectCode: EntityEnum.Product, data: { customUrl: { create: '/api/product/create' } }
})
export class ProductManage extends BaseAduitEntity implements Table<Product>{
    @ID()
    @Prop("id", { power: 0 })
    id: number;
    /**产品代码(出发地+到达地+航司2字代码+4位流水号 例:WUHBKKCZ0001)*/
    @State({ create: PMCFlow.Info })
    @Prop("产品代码")
    code: string;

    @State({ create: PMCFlow.Info })
    @Prop("产品名称")
    name: string;
    // /**产品宣传图片文件名*/
    @State({ create: PMCFlow.Info })
    @Prop("宣传图片")
    image: Picture;
    @Check(false)
    @State({ create: PMCFlow.Info })
    @Prop("国内航线")
    isDomesticLine: boolean;
    @State({ create: PMCFlow.Info })
    @Prop("产品类别", { options: getAlias(ProductTypeEnum) })
    productType: Select<ProductTypeEnum>;
    @State({ create: PMCFlow.Info })
    @Prop('销售方式', { options: getAlias(SellTypeEnum) })
    sellType: Select<SellTypeEnum>;
    @Adapter({ read: (flight: Flight) => flight && typeof flight != 'string' ? flight.code : flight })
    @State({ create: PMCFlow.Info })
    @OneToOne({ searchKey: 'code' })
    @Prop("去程航班")
    boundFlight: FlightManageSearch;

    @Adapter({ read: (flight: Flight) => flight && typeof flight != 'string' ? flight.code : flight })
    @State({ create: PMCFlow.Info })
    @OneToOne({ searchKey: "code" })
    @Prop("回程航班")
    returnFlight: FlightManageSearch;
    @State({ create: PMCFlow.Info })
    @Adapter(Rules.adapter.dateArrTransform)
    @Prop("去程日期")
    boundDates: DateArray;
    @State({ create: PMCFlow.Info })
    @Prop("行程天数")
    tripDays: number;
    @State({ create: PMCFlow.Info })
    @Adapter(Rules.adapter.dateArrTransform)
    @Prop("回程日期")
    returnDates: DateArray;
    @State({ create: PMCFlow.Price })
    @Prop("机位数")
    seatCount: number;
    @State({ create: PMCFlow.Price })
    @Prop("剩余机位数")
    restSeat: number;
    @State({ create: PMCFlow.Price })
    @Prop("成人税费")
    priceTax_a: number;
    @State({ create: PMCFlow.Price })
    @Prop('儿童税费')
    priceTax_c: number;
    @State({ create: PMCFlow.Price })
    @Prop('供应商价格_成人')
    priceSupply_a: number;
    @State({ create: PMCFlow.Price })
    @Adapter(Rules.adapter.rmb)
    @Prop('供应商价格_儿童')
    priceSupply_c: number;
    @State({ create: PMCFlow.Price })
    @Adapter(Rules.adapter.rmb)
    @Prop('平台价格_成人')
    priceSelf_a: number;
    @State({ create: PMCFlow.Price })
    @Prop('平台价格_儿童')
    priceSelf_c: number;
    @State({ create: PMCFlow.Price })
    @Prop('代理商价格_成人')
    price2B_a: number;
    @State({ create: PMCFlow.Price })
    @Prop('代理商价格_儿童')
    price2B_c: number;
    @State({ create: PMCFlow.Price })
    @Prop('C端价格_成人')
    price2C_a: number;
    @State({ create: PMCFlow.Price })
    @Prop('C端价格_儿童')
    price2C_c: string;
    @State({ create: PMCFlow.Price })
    @Prop("销售规则")
    saleRuler: string;
    @State({ create: PMCFlow.Price })
    @Prop("成团率(百分数)")
    teamRate: number;
    @State({ create: PMCFlow.Price })
    @Prop("成行率(百分数)")
    tripRate: number;
    @State({ create: PMCFlow.Target })
    @SelectOne(getAlias(ProductTargetEnum))
    @Prop('价格目标群体')
    target: ProductTargetEnum;
    @Check(false)
    @State({ create: PMCFlow.Buyers })
    @Adapter(SellerAdapter)
    @OneToMany(MemberSallerrManage)
    @Prop("非必填,代理商", { power: canEdit })
    buyers: string = '';
    @Prop('审核状态', { options: getAlias(AuditStatusEnum) })
    auditStatus: Select<AuditStatusEnum>;
    @Prop("变动日志")
    changeLog: string;
}

