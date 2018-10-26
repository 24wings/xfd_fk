import { EntityEnum } from "../../../entity.enum";
import { ModeEnum } from "@core/util/meta/Mode.enum";
import { Member } from "../entity/Member";
import { Table } from "@core/util/struct/Table";
import { MetaEntity } from "@core/util/meta/MetaEntity";
import { Prop } from "@core/util/meta/Prop";
import { Check } from "@core/util/meta/Check";
import { Rules } from "@core/util/regexp";
import { SelectOne } from "@core/util/meta/ref/SelectOne";
import { getAlias } from "@core/util/meta/alias";
import { MemberTypeEnum } from "../enum/MemberType.enum";
import { AuditStatusEnum } from "../enum/AuditStatus.enum";
function getUserId() {
    return localStorage.getItem("employee") ? JSON.parse(localStorage.getItem("employee")).id : 0;
}
@MetaEntity({ defaultMode: ModeEnum.Info, objectName: "个人信息", objectCode: EntityEnum.Member, data: { presetObject: { id: getUserId() }, customUrl: { create: '/api/member/create' } } })
export class MemberInfo implements Table<Member> {
    /**代码（前缀+会员流水号,前缀:供应商S，采购商B，个人C，流水号8位)*/
    @Prop("会员编号")
    code: string;
    @Check({ maxLength: 7, minLength: 2 })
    @Prop("名称")
    name: string;
    @Check(Rules.regex.mobile)
    @Prop("手机号", { readonly: true })
    mobile: string;
    @Check({ minLength: 2, maxLength: 7 })
    @Prop("负责人姓名")
    principal: string;
    @Prop("联系地址")
    address: string;
    @Prop("银行账户", { readonly: true })
    bankInfo: string;
    @Prop("企业税号", { readonly: true })
    taxCode: string;
    @SelectOne(getAlias(MemberTypeEnum))
    @Prop("会员类型", { readonly: true })
    memberType: MemberTypeEnum;
    @SelectOne(getAlias(AuditStatusEnum))
    @Prop("审核状态", { readonly: true })
    memberStatus: AuditStatusEnum;
}