import { EntityEnum } from "../../../entity.enum";
import { MetaEntity } from "@core/util/meta/MetaEntity";
import { AirCompany } from "../entity/AirCompany";
import { Table } from "@core/util/struct/Table";
import { ID } from "@core/util/meta/ID";
import { Prop } from "@core/util/meta/Prop";
import { Check } from "@core/util/meta/Check";

@MetaEntity({ objectName: "航司管理", objectCode: EntityEnum.AirCompany, })
export class AirCompanyManage implements Table<AirCompany>{
    @ID()
    @Prop("id", { power: 0 })
    id: number;
    // @Prop("短名称")
    // shortNam: string;
    @Check({ maxLength: 2, minLength: 2, regexp: /([A-Z]|[0-9])/ })
    @Prop("二字代码")
    code: string;
    @Prop("航空名称")
    name: string;
    @Prop("是否国内航线")
    isDomesticLine: boolean;
}
