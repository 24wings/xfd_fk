import { MetaEntity } from "@core/util/meta/MetaEntity";
import { EntityEnum } from "app/entity.enum";
import { ID } from "@core/util/meta/ID";
import { Prop } from "@core/util/meta/Prop";


@MetaEntity({ objectCode: EntityEnum.User, objectName: "工作人员的增删改查", data: { presetObject: { roleIds: '101' } } })
export class Employee {
    @ID()
    @Prop("id", { power: 0 })
    id: number;
    @Prop("用户名")
    userName: string;
    @Prop("密码")
    password: string;
    orgId = 1;
    roleIds = '100';
    @Prop("创建时间", { power: 0 })
    createTime: Date = new Date();
    @Prop("更新时间", { power: 0 })
    updateTime: Date = new Date()
}