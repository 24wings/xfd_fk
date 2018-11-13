import { AbstractTree } from "@core/util/struct/AbstractTree";
import { Table } from "@core/util/struct/Table";
import { ID } from "@core/util/meta/ID";
import { MetaEntity } from "@core/util/meta/MetaEntity";
import { Prop } from "@core/util/meta/Prop";
import { OneToOne } from "@core/util/meta/ref/OneToOne";
import { EntityEnum } from "app/entity.enum";
import { Menu } from "../entity/Menu";
import { SelectOne } from "@core/util/meta/ref/SelectOne";
import { C, U, D, Q, AC1, AC2, AC3 } from "@core/util/meta/Power";
import { Check } from "@core/util/meta/Check";
import { CustomUrl } from "@core/util/meta/CustomUrl";
console.error('菜单管理已经加载')

@MetaEntity({
    objectName: "菜单管理", objectCode: EntityEnum.Menu,
    // firstLoad: true,
    data: {

        presetConditions: () => [
            { field: "menuId", compare: "in", andOr: "and", value: "(" + (JSON.parse(localStorage.getItem("menu-list") ? localStorage.getItem("menu-list") : '[]') as Menu[]).map(item => item.menuId).join(',') + ")" }
        ]
    }, view: { pageSize: 200 }
})
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
    @SelectOne([{ alias: "创建", value: C },
    { alias: "更新", value: U }, { alias: "删除", value: D }, { alias: "查询", value: Q },
    { alias: "附加行为1", value: AC1 },
    { alias: "附加行为2", value: AC2 },
    { alias: "附加行为3", value: AC3 },
    ])
    @Prop("菜单编码")
    menuCode: number;
    @Prop("菜单名称")
    text: string
    @Check(false)
    @Prop("链接")
    link: string;
}
