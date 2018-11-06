import { MetaEntity } from "@core/util/meta/MetaEntity";
import { EntityEnum } from "app/entity.enum";
import { ID } from "@core/util/meta/ID";
import { Prop } from "@core/util/meta/Prop";
import { OrgManage } from "app/blueprint/rbac/meta/OrgManage";
import { OneToOne } from "@core/util/meta/ref/OneToOne";
import { MemberStatusEnum } from "../enums/MemberStatus.enum";
import { SelectOne } from "@core/util/meta/ref/SelectOne";
import { getAlias } from "@core/util/meta/alias";
import { S, U, C } from "@core/util/meta/Power";
import { Toolbar } from "@core/util/meta/Toolbar";
import { CustomUrl } from "@core/util/meta/CustomUrl";
import { DemoStringComponent } from "@shared/com/dynamic-com/demo-string/demo-string.component";
import { DynamicFieldComponent } from "@core/util/meta/DynamicFieldComponent";
import { IcCardReaderComponent } from "@shared/com/zorro/basic/ic-card-reader/ic-card-reader.component";
import { Query } from "@core/util/meta/query/Query";
import { MemberQueryComponent } from "@shared/com/dynamic-com/member-query/member-query.component";
import { DynamicToolbar } from "@core/util/meta/custom/DynamicToolbar";
import { Check } from "@core/util/meta/Check";
import { Rules } from "@core/util/regexp";
import { Group } from "@core/util/meta/Group";
import { MemberGroup } from "./MemberGroup";
import { RefOne } from "@core/util/meta/ref/RefOne";
import { Adapter } from "@core/util/meta/Adapter";





@DynamicToolbar(MemberQueryComponent)
@CustomUrl({ create: '/xfd_fk/member/create' })
@Toolbar([
    // { label: "禁卡", multi: false, eventName: "disabled-card" },
    { label: "充值", eventName: "charge", multi: false },
    { label: "全部充值", multi: true, eventName: "all-charge", alawysDisplay: true },
    { label: "透支会员", multi: true, eventName: "fee-member", alawysDisplay: true },
    { label: "全部会员", multi: true, eventName: "all-member", alawysDisplay: true },
])
@MetaEntity({ objectCode: EntityEnum.XfdFkMember, objectName: "新发地会员", })
export class Member {
    @ID()
    @Prop("id", { power: 0, readonly: true })
    id: number;
    // @Query()
    @Prop("会员编号", { power: S, readonly: true })
    code: string;
    @Check(Rules.regex.mobile)
    @Prop("手机号")
    mobile: string;
    @Prop("会员名称")
    name: string;
    // @Group({ fields: [{ alias: "会员金额", fieldName: "monthMoney" }] })
    @Prop("剩余金额", { power: S })
    amount: number = 0;
    createTime: Date = new Date();
    @Check(false)
    @Prop("备注")
    remark: string;
    /**饭卡 */
    @DynamicFieldComponent(IcCardReaderComponent)
    @Prop("会员卡号", { power: C })
    mealCardNo: string;
    @SelectOne(getAlias(MemberStatusEnum))
    @Prop("会员状态", { power: S | U })
    memberStatus: MemberStatusEnum = MemberStatusEnum.Enable
    @OneToOne()
    @Prop("组织id", { power: 0 })
    orgId: OrgManage = 2 as any;
    // @Prop("每月金额")
    // monthMoney: number = 0;
    @Adapter({ read: (memberGroup: MemberGroup) => (typeof memberGroup == 'object') ? memberGroup.name : memberGroup, write: (memberGroup: MemberGroup) => memberGroup.id })
    @OneToOne()
    @Prop("会员分组")
    groupId: MemberGroup;
}