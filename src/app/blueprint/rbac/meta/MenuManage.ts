import { AbstractTree } from "@core/util/struct/AbstractTree";
import { Table } from "@core/util/struct/Table";
import { ID } from "@core/util/meta/ID";
import { MetaEntity } from "@core/util/meta/MetaEntity";
import { Prop } from "@core/util/meta/Prop";
import { OneToOne } from "@core/util/meta/ref/OneToOne";
import { EntityEnum } from "app/entity.enum";
import { Menu } from "../entity/Menu";


@MetaEntity({ objectName: "菜单管理", objectCode: EntityEnum.Menu, view: { pageSize: 200 } })
export class MenuManage extends AbstractTree<Menu> implements Table<Menu>{
    getId() { return this.menuId };
    getParentId() { return this.parentId as any }
    getText() { return this.text }
    @ID()
    @Prop("菜单id", { power: 0 })
    menuId: number;
    @OneToOne()
    @Prop("上级菜单")
    parentId: MenuManage;
    @Prop("菜单编码")
    menuCode: number;
    @Prop("菜单名称")
    text: string
}
