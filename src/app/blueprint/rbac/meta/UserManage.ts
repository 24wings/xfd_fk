import { EntityEnum } from "../../../entity.enum";
import { RoleManage } from "./RoleManage";

import { OrgManage } from "./OrgManage";
import { MetaEntity } from "@core/util/meta/MetaEntity";
import { Table } from "@core/util/struct/Table";
import { ID } from "@core/util/meta/ID";
import { Prop } from "@core/util/meta/Prop";
import { OneToOne } from "@core/util/meta/ref/OneToOne";
import { OneToMany } from "@core/util/meta/ref/OneToMany";
import { User } from "../entity/User";
import { Adapter } from "@core/util/meta/Adapter";
import { Password } from "@core/util/meta/types/Password";

@MetaEntity({
    objectName: "用户管理", objectCode: EntityEnum.User, firstLoad: false,
    data: { presetConditions: () => [{ value: JSON.parse(localStorage.getItem('employee')).orgId, compare: "=", andOr: "and", field: "orgId" }] }
})
export class UserManage implements Table<User>{
    @ID()
    @Prop("id", { power: 0 })
    id: number;
    @Prop("姓名")
    name: string;
    @Prop("用户名")
    userName: string;
    @Adapter({ read: (password: string) => password.replace(/./g, '*') })
    @Prop("密码")
    password: Password;
    @OneToOne()
    @Prop("组织")
    orgId: OrgManage;
    @OneToMany(RoleManage)
    @Prop("角色列表", {
        transform: {
            read: (roles: RoleManage[]) => Array.isArray(roles) ? roles.map(role => role.roleName) :
                (roles ? roles : '' as string).split(','), write: (roles: RoleManage[]) => {
                    if (Array.isArray(roles)) {
                        return roles.map(role => role.roleId).join(',')
                    }
                    else {
                        console.log(roles);
                        return roles;
                    }
                }
        }
    })
    roleIds: RoleManage[];
    @Prop("创建时间", { power: 0 })
    createTime: Date = new Date();
    @Prop("更新时间", { power: 0 })
    updateTime: Date = new Date()
}