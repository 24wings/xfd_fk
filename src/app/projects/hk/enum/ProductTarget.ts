import { setAlias } from "@core/util/meta/alias";

/**产品目标群体*/
export enum ProductTargetEnum {
    /**消费者*/
    C = "C",
    /**代理商*/
    B = "B",
    /**特定代理商*/
    SPEC = "SPEC"
}
setAlias(ProductTargetEnum, [
    { value: ProductTargetEnum.C, alias: "消费者" },
    { value: ProductTargetEnum.B, alias: "代理商" },
    { value: ProductTargetEnum.SPEC, alias: "特定代理商" },
])