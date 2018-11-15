import { setAlias } from "app/libs/meta-ui/util/meta/alias";

export enum MemberTypeEnum {
    SUPPLIER = 1,
    AGENT,
    CONSUMER,
}
setAlias(MemberTypeEnum, [
    { value: MemberTypeEnum[MemberTypeEnum.SUPPLIER], alias: "供应商" },
    { value: MemberTypeEnum[MemberTypeEnum.AGENT], alias: "代理商" },
    { value: MemberTypeEnum[MemberTypeEnum.CONSUMER], alias: "消费者" },
])