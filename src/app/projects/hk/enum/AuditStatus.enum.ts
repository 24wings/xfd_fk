import { setAlias } from "@core/util/meta/alias";

export enum AuditStatusEnum {
    submitted = "submitted",
    approved = "approved",
    expired = "expired"
}

setAlias(AuditStatusEnum, [
    { value: AuditStatusEnum.submitted, alias: "已提交" },
    { value: AuditStatusEnum.approved, alias: "已证明" },
    { value: AuditStatusEnum.expired, alias: "已过期" },
])