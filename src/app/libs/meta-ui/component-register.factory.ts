import { ComponentType } from "@angular/cdk/portal";

import { Picture } from "app/libs/meta-ui/util/meta/types/Picture";
import { Select } from "app/libs/meta-ui/util/meta/types/Select";
import { Password } from "app/libs/meta-ui/util/meta/types/Password";
import { DateArray } from "app/libs/meta-ui/util/meta/types/DateArray";
import { RefTable } from "app/libs/meta-ui/util/meta/types/RefTable";
import { RefTablees } from "app/libs/meta-ui/util/meta/types/RefTablees";
import { RefTree } from "app/libs/meta-ui/util/meta/types/RefTree";
import { RefTreees } from "app/libs/meta-ui/util/meta/types/RefTreees";
import { FieldStringZorroComponent } from "./com/zorro/basic/field-string-zorro/field-string-zorro.component";
import { FieldPictureZorroComponent } from "./com/zorro/basic/field-picture-zorro/field-picture.component-zorro";
import { FieldBooleanZorroComponent } from "./com/zorro/basic/field-boolean-zorro/field-boolean-zorro.component";
import { FieldDateZorroComponent } from "./com/zorro/basic/field-date-zorro/field-date-zorro.component";
import { FieldNumberZorroComponent } from "./com/zorro/basic/field-number-zorro/field-number-zorro.component";
import { FieldSelectZorroComponent } from "./com/zorro/basic/field-select-zorro/field-select-zorro.component";
import { FieldPasswordZorroComponent } from "./com/zorro/basic/field-password-zorro/field-password-zorro.component";
import { FieldDateArrayZorroComponent } from "./com/zorro/multiple/field-date-array-zorro/field-date-array-zorro.component";
import { FieldJsonComponent } from "@shared/com/dynamic-com/field-json/field-json.component";
import { FieldRefTableZorroComponent } from "./com/zorro/ref/field-ref-table-zorro/field-ref-table-zorro.component";
import { FieldRefTableManyZorroComponent } from "./com/zorro/multiple/field-ref-table-many-zorro/field-ref-table-many-zorro.component";
import { FieldRefTreeZorroComponent } from "./com/zorro/ref/field-ref-tree-zorro/field-ref-tree-zorro.component";
import { FieldRefTreeManyZorroComponent } from "./com/zorro/multiple/field-ref-tree-many-zorro/field-ref-tree-many-zorro.component";



export let registerCompoenentFactorys: { type: any, component: ComponentType<any> }[] = [
    { type: String, component: FieldStringZorroComponent },
    { type: Picture, component: FieldPictureZorroComponent },
    { type: Boolean, component: FieldBooleanZorroComponent },
    { type: Date, component: FieldDateZorroComponent },
    { type: Number, component: FieldNumberZorroComponent },
    { type: Select, component: FieldSelectZorroComponent },
    { type: Password, component: FieldPasswordZorroComponent },
    { type: DateArray, component: FieldDateArrayZorroComponent },
    { type: JSON, component: FieldJsonComponent },
    { type: RefTable, component: FieldRefTableZorroComponent as any },
    { type: RefTablees, component: FieldRefTableManyZorroComponent as any },
    { type: RefTree, component: FieldRefTreeZorroComponent },
    { type: RefTreees, component: FieldRefTreeManyZorroComponent },
];