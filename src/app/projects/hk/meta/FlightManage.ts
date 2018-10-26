import { EntityEnum } from "../../../entity.enum";
import { AirportManage } from "./AirportManage";
import { BaseAduitEntity } from "./BaseAduitEntity";
import { MetaEntity } from "@core/util/meta/MetaEntity";
import { Flight } from "../entity/Flight";
import { Table } from "@core/util/struct/Table";
import { ID } from "@core/util/meta/ID";
import { Prop } from "@core/util/meta/Prop";
import { Adapter } from "@core/util/meta/Adapter";
import { Check } from "@core/util/meta/Check";
import { Rules } from "@core/util/regexp";
import { OneToOne } from "@core/util/meta/ref/OneToOne";
import { C, U, S } from "@core/util/meta/Power";


@MetaEntity({ objectName: "航班管理", objectCode: EntityEnum.Flight })
export class FlightManage extends BaseAduitEntity implements Table<Flight>{
    @ID()
    @Prop("id", { power: 0 })
    id: number;
    // @Adapter({ write: (airCompany: AirCompany) => airCompany.name, read: (airCompany: AirCompany) => airCompany != null && typeof airCompany != 'string' ? airCompany.name : '' })
    // @OneToOne()
    // @Prop('航空公司', { power: C | U })
    // airCompanyName: AirCompany;
    @Adapter(Rules.adapter.strToDateWrite)
    @Check(/([01][0-9]|2[0-3]):[0-5]/)
    @Prop("起飞时间")
    startTime: string;
    @Prop("航班代码", { power: S })
    code: string;
    @Prop('航司代码', { readonly: true })
    airCompanyCode: string;
    @Check(/^[a-zA-Z]/)
    @Prop('航班代码', { power: C | U })
    set _code_(c: string) {
        let match = /[0-9]/.exec(c);
        if (match) {
            this.airCompanyCode = c.substring(0, match.index)
            this.code = c;
        }
    }
    get _code_() {
        return this.code;
    }
    @Prop("出发城市", { readonly: true })
    startCityCode: string;
    @Adapter({ read: (airport: AirportManage) => airport && typeof airport != 'string' ? airport.name : airport })
    @OneToOne({ searchKey: "code" })
    @Prop("出发机场代码", { power: U | C })
    set _startAirportCode_(airport: AirportManage) {
        if (airport && typeof airport != 'string') {
            this.startAirportCode = airport.code;
            this.startAirportName = airport.name;
            this.startCityCode = airport.cityCode as any;
            console.log(this.startCityCode)
        }
    }
    get _startAirportCode_() {
        return this.startAirportCode as any;
    }
    @Prop("航班信息")
    flightInfo: string;

    @Prop("出发机场代码", { power: S })
    startAirportCode: string;
    @Prop("出发机场名称", { readonly: true })
    startAirportName: string;
    @OneToOne({ searchKey: "code" })
    @Prop("经停机场代码")
    set __stopAirportCode__(airport: AirportManage) {
        if (airport && typeof airport != 'string') {
            this.stopAirportCode = airport.code;
            this.stopAirportName = airport.name;
        }
    }
    get __stopAirportCode__() {
        return this.stopAirportCode as any;
    }
    @Prop("到达城市代码", { readonly: true })
    stopCityCode: string;
    @Prop("经停机场代码", { power: S })
    stopAirportCode: string;
    @Prop("经停机场名称", { readonly: true })
    stopAirportName: string;

    @Adapter(Rules.adapter.strToDateWrite)
    @Check(/([01][0-9]|2[0-3]):[0-5]/)
    @Prop("经停时间")
    stopTime: string;
    @Prop("经停时长/分")
    stopMinutes: number;
    @OneToOne({ searchKey: "code" })
    @Prop("目的机场代码", { power: C | U })
    set __endAirportCode__(airport: AirportManage) {
        if (airport && typeof airport != 'string') {
            this.endAirportCode = airport.code;
            this.endAirportName = airport.name;
            this.stopCityCode = airport.cityCode as any;
        }
    }
    get __endAirportCode__() {
        return this.endAirportCode as any;
    }
    @Prop("到达机场代码", { power: S })
    endAirportCode: string;
    @Prop("到达机场", { readonly: true })
    endAirportName: string;
    @Adapter(Rules.adapter.strToDateWrite)
    @Check(/([01][0-9]|2[0-3]):[0-5]/)
    @Prop("到达时间")
    endTime: string;
    /**到达时间加减天数*/
    @Check({ $nlt: 0 })
    @Prop("到达天数")
    plusDays: number;
}

@MetaEntity({ objectName: "航班", objectCode: EntityEnum.Flight })
export class FlightManageSearch implements Table<Flight>{
    @Prop('航空公司', { power: C | U })
    airCompanyName: string;
    @Prop("航班代码", { power: S })
    code: string;
    @Prop("航班信息")
    flightInfo: string;
    @Prop('航司代码', { readonly: true })
    airCompanyCode: string;
    @Prop("出发机场代码", { power: S })
    startAirportCode: string;
    // @Prop("出发机场名称", { readonly: true })
    // startAirportName: string;
    // @Prop("经停机场代码", { power: S })
    // stopAirportCode: string;
    @Prop("经停机场名称", { readonly: true })
    stopAirportName: string;

    @Adapter(Rules.adapter.strToDateWrite)
    @Check(/([01][0-9]|2[0-3]):[0-5]/)
    @Prop("经停时间")
    stopTime: string;
    @Prop("经停时长/分")
    stopMinutes: number;
    @Prop("到达机场代码", { power: S })
    endAirportCode: string;
    @Prop("到达机场", { readonly: true })
    endAirportName: string;
    @Adapter(Rules.adapter.strToDateWrite)
    @Check(/([01][0-9]|2[0-3]):[0-5]/)
    @Prop("到达时间")
    endTime: string;
    /**到达时间加减天数*/
    @Check({ $nlt: 0 })
    @Prop("到达天数", { power: S })
    plusDays: number;
} 