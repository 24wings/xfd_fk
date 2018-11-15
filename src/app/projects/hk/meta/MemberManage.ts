import { EntityEnum } from "../../../entity.enum";
import { Lifecycle } from "app/libs/meta-ui/util/meta/Lifecycle";
import { CustomUrl } from "app/libs/meta-ui/util/meta/CustomUrl";
import { createNotify } from "app/libs/meta-ui/util/notify/createNotify";
import { MemberRegisterNotify, MemberRegisterTask } from "../notify/MemberRegisterNotify";
import { MetaEntity } from "app/libs/meta-ui/util/meta/MetaEntity";
import { Member } from "../entity/Member";
import { Table } from "app/libs/meta-ui/util/struct/Table";
import { ID } from "app/libs/meta-ui/util/meta/ID";
import { Prop } from "app/libs/meta-ui/util/meta/Prop";
import { Check } from "app/libs/meta-ui/util/meta/Check";
import { Rules } from "app/libs/meta-ui/util/regexp";
import { SelectOne } from "app/libs/meta-ui/util/meta/ref/SelectOne";
import { getAlias } from "app/libs/meta-ui/util/meta/alias";
import { MemberTypeEnum } from "../enum/MemberType.enum";
import { AuditStatusEnum } from "../enum/AuditStatus.enum";
import { Password } from "app/libs/meta-ui/util/meta/types/Password";
import { Adapter } from "app/libs/meta-ui/util/meta/Adapter";
import { OneToOne } from "app/libs/meta-ui/util/meta/ref/OneToOne";
import { OrgManage } from "app/blueprint/rbac/meta/OrgManage";
import { C, S } from "app/libs/meta-ui/util/meta/Power";
import { FieldJsonComponent } from "@shared/com/dynamic-com/field-json/field-json.component";


@Lifecycle({ afterCreateSuccess: (member: MemberManage) => { createNotify(MemberRegisterNotify, member); createNotify(MemberRegisterTask, member) } })
@CustomUrl({ create: '/api/member/create' })
@MetaEntity({ objectName: "会员管理", objectCode: EntityEnum.Member, dynamicEditor: FieldJsonComponent })
export class MemberManage implements Table<Member> {
    @ID()
    @Prop("id", { power: 0 })
    id: number;
    @Prop("会员编号", { power: S })
    code: string;
    @Check({ maxLength: 7, minLength: 2 })
    @Prop("名称")
    name: string;
    @Check(Rules.regex.mobile)
    @Prop("手机号")
    mobile: string;
    @Check({ minLength: 2, maxLength: 7 })
    @Prop("负责人姓名")
    principal: string;
    @Prop("联系地址")
    address: string;
    @Prop("银行账户")
    bankInfo: string;
    @Prop("企业税号")
    taxCode: string;
    @SelectOne(getAlias(MemberTypeEnum))
    @Prop("会员类型")
    memberType: MemberTypeEnum;
    @SelectOne(getAlias(AuditStatusEnum))
    @Prop("审核状态")
    memberStatus: AuditStatusEnum;
    @Adapter(Rules.adapter.password)
    @Prop("密码", { power: C, })
    password: Password;
    @OneToOne()
    @Prop("组织", { power: C })
    orgId: OrgManage;

}


