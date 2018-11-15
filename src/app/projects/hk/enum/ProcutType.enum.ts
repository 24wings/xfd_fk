import { setAlias } from "app/libs/meta-ui/util/meta/alias";

/**产品类型*/
export enum ProductTypeEnum {
    /**包机*/
    TOTAL = "TOTAL",
    /**切位*/
    CUT_PART = "CUT_PART"
}
setAlias(ProductTypeEnum, [
    { value: ProductTypeEnum.TOTAL, alias: '包机' },
    { value: ProductTypeEnum.CUT_PART, alias: '切机' },

])