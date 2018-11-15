import { setAlias } from "app/libs/meta-ui/util/meta/alias";

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