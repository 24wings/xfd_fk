import { MetaEntity } from "@core/util/meta/MetaEntity";
import { XfdFxEntityEnum } from "../xfd_fk.EntityEnum";
import { Prop } from "@core/util/meta/Prop";
import { ID } from "@core/util/meta/ID";
import { S } from "@core/util/meta/Power";
import { Adapter } from "@core/util/meta/Adapter";
import { OrderBy } from "@core/util/meta/OrderBy";

@MetaEntity({ objectCode: XfdFxEntityEnum.ResetRecord as any, objectName: "全部充值记录" })
export class ResetRecord {
    @ID()
    @Prop("ID", { power: 0 })
    id: number;
    @OrderBy("DESC")
    @Adapter({ read: (dt: Date) => dt && dt instanceof Date ? dt.format('yyyy年MM月dd日') : new Date(dt).format('yyyy-MM-dd hh:mm') })
    @Prop("操作时间", { power: S })
    createTime: Date;
    // @Prop("关联人员", { power: S })
    relationMemberNames: string;
    @Prop("金额")
    amount: number;
    @Prop("操作员", { power: S })
    operatorName: string;
    // @Prop("操作员编号", { power: S })
    operatorNo: string;
}