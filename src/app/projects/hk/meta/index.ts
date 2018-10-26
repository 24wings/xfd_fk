import { AirCompanyManage } from "./AirCompanyManage";
import { AirportManage } from "./AirportManage";
import { CityManage } from "./CityManager";
import { FlightManage } from "./FlightManage";
import { MemberManage } from "./MemberManage";
import { OrderCreate } from "./OrderCreate";
import { ProductManage } from "./ProductManage";
import { MemberRegisterNotify } from "../notify/MemberRegisterNotify";
import { CountryMange } from "./CountryManage";


export let hk = [
    AirCompanyManage,
    AirportManage,
    CityManage,
    CountryMange,
    FlightManage,
    MemberManage,
    MemberRegisterNotify,
    OrderCreate,
    ProductManage,
];