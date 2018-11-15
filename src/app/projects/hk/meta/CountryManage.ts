import { EntityEnum } from "../../../entity.enum";
import { MetaEntity } from "app/libs/meta-ui/util/meta/MetaEntity";
import { Table } from "app/libs/meta-ui/util/struct/Table";
import { Country } from "../entity/Country";
import { ID } from "app/libs/meta-ui/util/meta/ID";
import { Prop } from "app/libs/meta-ui/util/meta/Prop";

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
