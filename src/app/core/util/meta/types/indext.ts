import { Time } from "./Time";
import { Timestamp } from "./Timestamp";
import { Year } from "./Year";
// import { Prop } from "../Prop";
// import { MetaEntity, getMetaEntity } from "../MetaEntity";
import { Select } from "./Select";
import { Decimal } from "./Decimal";
import { RefTable } from "./RefTable";
import { RefTree } from "./RefTree";
import { RefTablees } from "./RefTablees";
import { RefTreees } from "./RefTreees";
import { Password } from "./Password";
import { DateArray } from "./DateArray";
export let Types = {
    Time, Timestamp, Date, Year,
    DateArray,
    String,
    Number,
    Boolean,
    Select,
    Decimal,
    RefTable,
    RefTree,
    RefTablees,
    RefTreees,
    Password,

}
export type FieldType =
    Password | String
    | DateArray | Time | Timestamp | Date | Year |
    Number | Boolean | Select<any> | Decimal |
    RefTable | RefTree | RefTablees | RefTreees;
