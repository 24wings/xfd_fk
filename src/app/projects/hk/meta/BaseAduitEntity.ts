import { MetaEntity } from "app/libs/meta-ui/util/meta/MetaEntity";
import { Prop } from "app/libs/meta-ui/util/meta/Prop";

@MetaEntity({})
export abstract class BaseAduitEntity {
    @Prop("创建者", { power: 0 })
    createdBy: string = "系统管理员";
    @Prop("创建日期", { power: 0 })
    createdDate: Date = new Date()
    @Prop("修改者", { power: 0 })
    modifiedBy: string = "系统管理员";
    @Prop("修改日期", { power: 0 })
    modifiedDate: Date = new Date();
}