import { setAlias } from "@core/util/meta/alias";

export enum SellTypeEnum {
    /**整团*/
    ALL_SEAT = 1,
    /** 余位*/
    REST_SEAT,
    /**尾单*/
    TAIL_SEAT
}
setAlias(SellTypeEnum, [
    { value: SellTypeEnum[SellTypeEnum.ALL_SEAT], alias: "整团" },
    { value: SellTypeEnum[SellTypeEnum.REST_SEAT], alias: "余位" },
    { value: SellTypeEnum[SellTypeEnum.TAIL_SEAT], alias: "尾单" },
])