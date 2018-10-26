import { EntityEnum } from "../../../entity.enum";
import { MenuManage } from "./MenuManage";
import { OrgManage } from "./OrgManage";
import { OneToOne } from "@core/util/meta/ref/OneToOne";
import { Prop } from "@core/util/meta/Prop";
import { OneToMany } from "@core/util/meta/ref/OneToMany";
import { Adapter } from "@core/util/meta/Adapter";
import { Table } from "@core/util/struct/Table";
import { MetaEntity } from "@core/util/meta/MetaEntity";
import { ID } from "@core/util/meta/ID";
import { Role } from "../entity/Role";
import { C, U, D, S } from "@core/util/meta/Power";


@MetaEntity({ objectName: "角色管理", objectCode: EntityEnum.Role, power: S | C | U | D, view: { pageSize: 200 } })
export class RoleManage implements Table<Role>{
    // @Prop("角色代码")
    // roleCode: string;
    @ID()
    @Prop("角色id", { power: 0 })
    roleId: number;
    // @DynamicFieldComponent(DemoStringComponent)
    @Prop("角色名")
    roleName: string;
    @Adapter({ write: (ids: string[]) => ids.join(',') })
    @OneToMany(MenuManage)
    @Prop("角色菜单")
    menuIds: MenuManage[];
    @OneToOne()
    @Prop("角色所在组织")
    orgId: OrgManage;
}
