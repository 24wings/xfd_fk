import { MetaNotify } from "app/libs/meta-ui/util/meta/IMetaNotify";
import { MsgNotify } from "app/projects/hk/entity/MsgNotify";
import { EntityEnum } from "app/entity.enum";
import { MsgTypeEnum } from "app/projects/hk/enum/MsgType.enum";
import { ModeEnum } from "app/libs/meta-ui/util/meta/Mode.enum";
import { Member } from "app/projects/hk/entity/Member";
import { IMsgNotify } from "app/libs/meta-ui/util/notify/IMsgNotify";
import { MetaEntity } from "app/libs/meta-ui/util/meta/MetaEntity";
import { ID } from "app/libs/meta-ui/util/meta/ID";
import { Prop } from "app/libs/meta-ui/util/meta/Prop";
import { SelectOne } from "app/libs/meta-ui/util/meta/ref/SelectOne";
import { getAlias } from "app/libs/meta-ui/util/meta/alias";
import { MemberTypeEnum } from "../enum/MemberType.enum";
import { User } from "app/blueprint/rbac/entity/User";
import { Table } from "app/libs/meta-ui/util/struct/Table";
import { Toolbar } from "app/libs/meta-ui/util/meta/Toolbar";
import { AuditStatusEnum } from "../enum/AuditStatus.enum";
import { I } from "app/libs/meta-ui/util/meta/Power";

@MetaNotify({ viewName: "member_register_notify", isWebpush: true, msgType: MsgTypeEnum.Notify })
@MetaEntity({ objectName: "会员注册通知", objectCode: EntityEnum.Member, defaultMode: ModeEnum.Info })
export class MemberRegisterNotify extends MsgNotify implements IMsgNotify, Table<Member>{
    @ID()
    @Prop("ID", { power: 0 })
    id: number;
    @Prop("标题", { power: I })
    title: string;
    @Prop("姓名", { readonly: true })
    name: string;
    orgId: number = 1;
    @SelectOne(getAlias(MemberTypeEnum))
    @Prop("用户类型", { readonly: true })
    memberType: MemberTypeEnum;
    user: User
    getTitle = () => `恭喜` + this.name + `注册成功,请耐心等待管理员审核`;
    getAddtion = () => JSON.stringify({ id: this.id });
    getContent = () => `恭喜 ${this.name}注册成功,请耐心等待管理员审核`;
    getUserId = () => this.user.id;
    getOrgId = () => null;
}

@MetaNotify({ viewName: "verify_member_task", msgType: MsgTypeEnum.Task, isWebpush: true })
@Toolbar([{ label: "通过", eventName: "veirfy_member_success", multi: false, url: '/app/member/verify/pass' }])
@MetaEntity({ objectName: "会员注册审核", objectCode: EntityEnum.Member })
export class MemberRegisterTask extends MsgNotify implements IMsgNotify, Table<Member>{
    id: number;
    @Prop("姓名", { readonly: true })
    name: string;
    isJPush = false;
    @Prop("用户类型", { readonly: true })
    memberType: MemberTypeEnum;
    @SelectOne(getAlias(AuditStatusEnum))
    @Prop("用户状态")
    memberStatus: AuditStatusEnum;
    userId: number;
    user: User
    getTitle = () => `恭喜 ` + this.name + `注册成功,等待管理员审核`;
    getAddtion = () => JSON.stringify({ id: this.id, extral: "待审核" });
    getContent = () => `恭喜 ${this.name}注册成功,等待管理员审核`;
    getMsgType = () => MsgTypeEnum.Task;
    getUserId = () => JSON.parse(localStorage.getItem("employee")).id;
    getOrgId = () => JSON.parse(localStorage.getItem("employee")).orgId;
} 