import { BaseAduitEntity } from "./BaseAduitEntity";
import { ProductTypeEnum } from "../enum/ProcutType.enum";
import { SellTypeEnum } from "../enum/SellType.enum";
import { ProductTargetEnum } from "../enum/ProductTarget";
import { AuditStatusEnum } from "../enum/AuditStatus.enum";
import { Picture } from "@core/util/meta/types/Picture";
import { Select } from "@core/util/meta/types/Select";

/**产品信息*/
export class Product extends BaseAduitEntity {
    id: number;
    /**产品代码(出发地+到达地+航司2字代码+4位流水号 例:WUHBKKCZ0001)*/
    code: string;
    name: string;
    /**产品宣传图片文件名*/
    image: string | Picture;
    isDomesticLine: boolean;
    productType: ProductTypeEnum | any;
    /**销售方式*/
    sellType: Select<SellTypeEnum>;
    boundFlight: any;
    /**回程航班*/
    returnFlight: any;
    /**去程日期(逗号分隔字符数组)*/
    boundDates: string | any[];
    tripDays: number;
    /**回程日期(逗号分隔字符数组)*/
    returnDates: string | Date[];
    /**机位数*/
    seatCount: number;
    /**剩余机位数*/
    restSeat: number;
    /**成人税费*/
    priceTax_a: number;
    /**儿童税费*/
    priceTax_c: number;
    /**供应商价格_成人*/
    priceSupply_a: number;
    /**供应商价格_儿童*/
    priceSupply_c: number;
    /**平台价格_成人*/
    priceSelf_a: number;
    /**平台价格_儿童*/
    priceSelf_c: number;
    /**代理商价格_成人*/
    price2B_a: number;
    /**代理商价格_儿童*/
    price2B_c: number;
    /**C端价格_成人*/
    price2C_a: number;
    /**C端价格_儿童*/
    price2C_c: string;
    /**销售规则*/
    saleRuler: string;
    /**成团率(百分数)*/
    teamRate: number;
    /**成行率(百分数)*/
    tripRate: number;
    /**价格目标群体*/
    target: Select<ProductTargetEnum>;
    /**代理商(逗号分隔字符数组)*/
    buyers: string;
    /**审核状态*/
    auditStatus: Select<AuditStatusEnum>;
    /**变动日志*/
    changeLog: string;

} 