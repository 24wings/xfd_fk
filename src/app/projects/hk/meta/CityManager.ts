import { EntityEnum } from "../../../entity.enum";
import { CountryMange } from "./CountryManage";
import { MetaEntity } from "@core/util/meta/MetaEntity";
import { City } from "../entity/City";
import { Table } from "@core/util/struct/Table";
import { ID } from "@core/util/meta/ID";
import { Prop } from "@core/util/meta/Prop";
import { Check } from "@core/util/meta/Check";
import { Adapter } from "@core/util/meta/Adapter";
import { Country } from "../entity/Country";
import { OneToOne } from "@core/util/meta/ref/OneToOne";
import { C, U, S } from "@core/util/meta/Power";


@MetaEntity({ objectName: "城市管理", objectCode: EntityEnum.City })
export class CityManage implements Table<City>{
    @ID()
    @Prop("id", { power: 0 })
    id: number;
    @Check(false)
    @Adapter({ read: (country: Country) => (country && typeof country != 'string') ? country.name : country })
    @OneToOne({ searchKey: "code" })
    @Prop("国家编码", { power: C | U })
    set country(c: CountryMange) {
        if (c && typeof c != 'string') {
            this.countryCode = c.code;
            this.countryName = c.name;
        }
    }
    get country() {
        return this.countryCode as any
    }
    @Prop("国家名称", { readonly: true })
    countryName: string;
    @Prop("国家编码", { power: S, readonly: true })
    countryCode: string;
    @Prop("城市编码")
    code: string;
    @Prop("城市名称")
    name: string;
}

