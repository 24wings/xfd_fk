
import { MetaEditorComponent } from './com/meta-object/meta-editor/meta-editor.component';

import { FieldRefSelectZorroComponent } from './com/zorro/ref/field-ref-select-zorro/field-ref-select-zorro.component';
import { MetaObjectComponent } from './com/meta-object/meta-object.component';
import { EnumPipe } from './enum/enum.pipe';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FieldSelectZorroComponent } from './com/zorro/basic/field-select-zorro/field-select-zorro.component';
import { FieldStringZorroComponent } from './com/zorro/basic/field-string-zorro/field-string-zorro.component';
import { FieldPasswordZorroComponent } from './com/zorro/basic/field-password-zorro/field-password-zorro.component';
import { FieldDateZorroComponent } from './com/zorro/basic/field-date-zorro/field-date-zorro.component';
import { FieldPictureZorroComponent } from './com/zorro/basic/field-picture-zorro/field-picture.component-zorro';
import { FieldNumberZorroComponent } from './com/zorro/basic/field-number-zorro/field-number-zorro.component';
import { FieldDateArrayZorroComponent } from './com/zorro/multiple/field-date-array-zorro/field-date-array-zorro.component';
import { FieldBooleanZorroComponent } from './com/zorro/basic/field-boolean-zorro/field-boolean-zorro.component';
import { FieldRefTreeZorroComponent } from './com/zorro/ref/field-ref-tree-zorro/field-ref-tree-zorro.component';
import { FieldRefTableManyZorroComponent } from './com/zorro/multiple/field-ref-table-many-zorro/field-ref-table-many-zorro.component';
import { FieldRefTreeManyZorroComponent } from './com/zorro/multiple/field-ref-tree-many-zorro/field-ref-tree-many-zorro.component';
import { FieldDynamicComponent } from './com/meta-object/field-dynamic/field-dynamic.component';
import { FieldRefTableZorroComponent } from './com/zorro/ref/field-ref-table-zorro/field-ref-table-zorro.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicDirective } from './dynamic.directive';
import { CommonService } from './service/common.service';
import { ConfigService } from './service/config.service';
import { ExcelService } from './service/excel.service';
import { DevService } from './service/dev.service';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonChartModule } from '@delon/chart';
import { DelonAuthModule } from '@delon/auth';
import { DelonACLModule } from '@delon/acl';
import { DelonCacheModule } from '@delon/cache';
import { DelonUtilModule } from '@delon/util';
import { EditorDirective } from './editor.direcive';
import { StorageService } from './service/StorageService';
import { MyHttpService } from './service/http.service';
import { UserService } from './service/user.service';
import { ValidService } from './service/validate.service';
import { CustomUrlService } from './service/CustomUrl.service';
import { DynamicLinkPageComponent } from './page/dynamic-link-page/dynamic-link-page.component';
import { IcCardReaderComponent } from './com/zorro/basic/ic-card-reader/ic-card-reader.component';

const Directives: any[] = [EditorDirective, DynamicDirective, EnumPipe]
export const CommonProviders: any[] = [
    CommonService,
    ConfigService,
    ExcelService,
    DevService,
    StorageService,
    MyHttpService,
    UserService,
    ValidService,
    CustomUrlService,
]

const Components: any[] = [

    DynamicLinkPageComponent,
    MetaObjectComponent,
    FieldSelectZorroComponent,
    FieldStringZorroComponent,
    FieldPasswordZorroComponent,
    FieldDateZorroComponent,
    FieldPictureZorroComponent,
    FieldNumberZorroComponent,
    FieldDateArrayZorroComponent,
    FieldBooleanZorroComponent,
    FieldDateZorroComponent,
    FieldRefTreeZorroComponent,
    FieldRefTableManyZorroComponent,
    FieldRefTreeManyZorroComponent,
    FieldDynamicComponent,
    FieldRefTableZorroComponent,
    FieldRefSelectZorroComponent,
    IcCardReaderComponent,
    MetaEditorComponent,
];

@NgModule({
    imports: [
        HttpClientModule,
        NgZorroAntdModule,
        AlainThemeModule.forRoot(),
        DelonABCModule.forRoot(),
        DelonChartModule.forRoot(),
        DelonAuthModule.forRoot(),
        DelonACLModule.forRoot(),
        DelonCacheModule.forRoot(),
        DelonUtilModule.forRoot(),
        CommonModule,
        FormsModule,
    ],
    declarations: [...Components, ...Directives],
    entryComponents: [...Components],
    exports: [...Components, ...Directives],
    providers: [...CommonProviders]
})
export class MetaUiModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: MetaUiModule,

            providers: [...CommonProviders]
        }
    }
}