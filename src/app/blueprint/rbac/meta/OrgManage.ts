import { EntityEnum } from "app/entity.enum";
import { MetaEntity } from "@core/util/meta/MetaEntity";
import { AbstractTree } from "@core/util/struct/AbstractTree";
import { Table } from "@core/util/struct/Table";
import { ID } from "@core/util/meta/ID";
import { Prop } from "@core/util/meta/Prop";
import { Check } from "@core/util/meta/Check";
import { OneToOne } from "@core/util/meta/ref/OneToOne";
import { C } from "@core/util/meta/Power";
import { Org } from "../entity/Org";
import { LazyClass } from "@core/util/meta/Lazy";
import { CustomUrl } from "@core/util/meta/CustomUrl";

@CustomUrl({ query: '/app/org/list/myorg' })
@LazyClass()
@MetaEntity({
    objectCode: EntityEnum.Org, objectName: "组织管理",
    data: {
        presetConditions: () => [
            { field: "orgId", compare: "=", value: JSON.parse(localStorage.getItem('employee') ? localStorage.getItem('employee') : '{}').orgId, andOr: "or" }]
    },
    view: { pageSize: 200 }, lifeCycle: { afterCreateSuccess: (data: OrgManage) => '' }
})
export class OrgManage extends AbstractTree<Org> implements Table<Org>{
    getId() { return this.orgId; }
    getText() { return this.orgName; }
    getParentId() { return this.parentId as any; }
    @ID()
    @Prop("组织Id", { power: 0 })
    orgId: number;
    @Check({ maxLength: 10 })
    @Prop("组织名称", { dynamicHtml: 'hello' })
    orgName: string;
    @OneToOne()
    @Prop("上级组织")
    parentId: OrgManage;
    @Prop("创建时间", { power: 0 })
    createTime: Date = new Date();
    @Prop("创建者", { power: C, readonly: true })
    creator: string = localStorage.getItem("employee") && localStorage.getItem("employee") != "undefined" ? JSON.parse(localStorage.getItem("employee")).name : "";
}