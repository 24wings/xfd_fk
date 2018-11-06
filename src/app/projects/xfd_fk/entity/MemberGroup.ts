import { ID } from "@core/util/meta/ID";
import { Prop } from "@core/util/meta/Prop";
import { MetaEntity } from "@core/util/meta/MetaEntity";
import { XfdFxEntityEnum } from "../xfd_fk.EntityEnum";
import { C } from "@core/util/meta/Power";

@MetaEntity({ objectCode: XfdFxEntityEnum.MemberGroup as any, objectName: "会员分组", power: C, hideCheckbox: true })
export class MemberGroup {
    @ID()
    @Prop("id", { power: 0 })
    id: number;
    @Prop("姓名")
    name: string;
    @Prop("每月金额")
    monthMoney: number = 0;
}