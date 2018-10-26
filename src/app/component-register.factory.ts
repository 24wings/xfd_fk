import { ComponentType } from "@angular/cdk/portal";
import { FieldStringZorroComponent } from "@shared/com/zorro/basic/field-string-zorro/field-string-zorro.component";
import { FieldPictureZorroComponent } from "@shared/com/zorro/basic/field-picture-zorro/field-picture.component-zorro";

import { FieldBooleanZorroComponent } from "@shared/com/zorro/basic/field-boolean-zorro/field-boolean-zorro.component";
import { FieldDateZorroComponent } from "@shared/com/zorro/basic/field-date-zorro/field-date-zorro.component";
import { FieldNumberZorroComponent } from "@shared/com/zorro/basic/field-number-zorro/field-number-zorro.component";
import { FieldSelectZorroComponent } from "@shared/com/zorro/basic/field-select-zorro/field-select-zorro.component";
import { FieldPasswordZorroComponent } from "@shared/com/zorro/basic/field-password-zorro/field-password-zorro.component";
import { FieldDateArrayZorroComponent } from "@shared/com/zorro/multiple/field-date-array-zorro/field-date-array-zorro.component";
import { FieldJsonComponent } from "@shared/com/dynamic-com/field-json/field-json.component";
import { FieldRefTableZorroComponent } from "@shared/com/zorro/ref/field-ref-table-zorro/field-ref-table-zorro.component";
import { FieldRefTableManyZorroComponent } from "@shared/com/zorro/multiple/field-ref-table-many-zorro/field-ref-table-many-zorro.component";
import { FieldRefTreeZorroComponent } from "@shared/com/zorro/ref/field-ref-tree-zorro/field-ref-tree-zorro.component";
import { FieldRefTreeManyZorroComponent } from "@shared/com/zorro/multiple/field-ref-tree-many-zorro/field-ref-tree-many-zorro.component";
import { Picture } from "@core/util/meta/types/Picture";
import { Select } from "@core/util/meta/types/Select";
import { Password } from "@core/util/meta/types/Password";
import { DateArray } from "@core/util/meta/types/DateArray";
import { RefTable } from "@core/util/meta/types/RefTable";
import { RefTablees } from "@core/util/meta/types/RefTablees";
import { RefTree } from "@core/util/meta/types/RefTree";
import { RefTreees } from "@core/util/meta/types/RefTreees";



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