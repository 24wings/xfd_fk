import { setAlias } from "@core/util/meta/alias";

export enum CreateWayEnum {
    /**WEB*/
    WEB = "WEB",
    /**APP*/
    APP = "APP"
}
setAlias(CreateWayEnum, [
    { value: CreateWayEnum.WEB, alias: "WEB" },
    { value: CreateWayEnum.APP, alias: "APP" }
])