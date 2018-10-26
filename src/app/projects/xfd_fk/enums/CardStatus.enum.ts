import { setAlias } from "@core/util/meta/alias";

export enum CardStatusEnum {
    Enable = "Enable",
    Disabled = "Disabled"
}
setAlias(CardStatusEnum, [
    { alias: "启用", value: CardStatusEnum.Enable },
    { alias: "禁用", value: CardStatusEnum.Disabled }])