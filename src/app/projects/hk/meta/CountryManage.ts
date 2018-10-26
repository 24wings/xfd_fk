import { EntityEnum } from "../../../entity.enum";
import { MetaEntity } from "@core/util/meta/MetaEntity";
import { Table } from "@core/util/struct/Table";
import { Country } from "../entity/Country";
import { ID } from "@core/util/meta/ID";
import { Prop } from "@core/util/meta/Prop";

@MetaEntity({ objectName: "国家管理", objectCode: EntityEnum.Country, })
export class CountryMange implements Table<Country>{
  @ID()
  @Prop("id", { power: 0 })
  id: number;
  @Prop("国家名字")
  name: string;
  @Prop("国家编码")
  code: string;
}
