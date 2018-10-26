import { EntityEnum } from "../../../entity.enum";
import { CityManage } from "./CityManager";
import { MetaEntity } from "@core/util/meta/MetaEntity";
import { Airport } from "../entity/Airport";
import { Table } from "@core/util/struct/Table";
import { ID } from "@core/util/meta/ID";
import { Prop } from "@core/util/meta/Prop";
import { Check } from "@core/util/meta/Check";
import { Adapter } from "@core/util/meta/Adapter";
import { City } from "../entity/City";
import { OneToOne } from "@core/util/meta/ref/OneToOne";
import { C, U, S } from "@core/util/meta/Power";


@MetaEntity({ objectName: "机场管理", objectCode: EntityEnum.Airport, })
export class AirportManage implements Table<Airport>{
  @ID()
  @Prop("id", { power: 0 })
  id: number;
  @Prop("机场名称")
  name: string;
  @Prop("机场代码")
  code: string;
  @Check(false)
  @Adapter({ read: (city: City) => city ? city : '' })
  @OneToOne({ searchKey: "code" })
  @Prop("城市代码", { power: C | U })
  set city(city: CityManage) { if (city && typeof city != 'string') { this.cityCode = city.code; this.cityName = city.name; } }
  get city() { return this.cityCode as any; }
  @Prop("城市名字", { power: S | C | U, readonly: true })
  cityName: string;
  @Prop("城市编码", { power: 0, readonly: true })
  cityCode: string;


}