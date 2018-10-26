import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';

// ng -json 
// import { NgJsonEditorModule } from 'ang-jsoneditor'
// region: third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
import { MetaObjectComponent } from './com/meta-object/meta-object.component';
import { EnumPipe } from './pipe/enum.pipe';

import { DynamicDirective } from '../dynamic.directive';
import { DemoStringComponent } from '@shared/com/dynamic-com/demo-string/demo-string.component';
import { FieldDynamicComponent } from '@shared/com/meta-object/field-dynamic/field-dynamic.component';
import { FieldBooleanZorroComponent } from '@shared/com/zorro/basic/field-boolean-zorro/field-boolean-zorro.component';
import { FieldDateZorroComponent } from '@shared/com/zorro/basic/field-date-zorro/field-date-zorro.component';
import { FieldNumberZorroComponent } from '@shared/com/zorro/basic/field-number-zorro/field-number-zorro.component';
import { FieldSelectZorroComponent } from '@shared/com/zorro/basic/field-select-zorro/field-select-zorro.component';
import { FieldPasswordZorroComponent } from '@shared/com/zorro/basic/field-password-zorro/field-password-zorro.component';
import { FieldStringZorroComponent, } from '@shared/com/zorro/basic/field-string-zorro/field-string-zorro.component';
import { FieldDateArrayZorroComponent } from '@shared/com/zorro/multiple/field-date-array-zorro/field-date-array-zorro.component';
import { FieldJsonComponent } from '@shared/com/dynamic-com/field-json/field-json.component';
import { FieldRefTableZorroComponent } from '@shared/com/zorro/ref/field-ref-table-zorro/field-ref-table-zorro.component';
import { FieldRefSelectZorroComponent } from './com/zorro/ref/field-ref-select-zorro/field-ref-select-zorro.component';
import { ProdQueryComponent } from './com/dynamic-com/prod-query/prod-query.component';
import { FieldRefTreeZorroComponent } from '@shared/com/zorro/ref/field-ref-tree-zorro/field-ref-tree-zorro.component';
import { FieldRefTableManyZorroComponent } from '@shared/com/zorro/multiple/field-ref-table-many-zorro/field-ref-table-many-zorro.component';
import { FieldRefTreeManyZorroComponent } from '@shared/com/zorro/multiple/field-ref-tree-many-zorro/field-ref-tree-many-zorro.component';
import { FieldPictureZorroComponent } from '@shared/com/zorro/basic/field-picture-zorro/field-picture.component-zorro';
import { MetaEditorComponent } from './com/meta-object/meta-editor/meta-editor.component';
import { MyOrderQueryToolbarComponent } from '@shared/com/dynamic-com/my-order-query-toolbar/my-order-query-toolbar.component';
import { EditorDirective } from 'app/editor.direcive';
import { IcCardReaderComponent } from './com/zorro/basic/ic-card-reader/ic-card-reader.component';
import { OrderQueryComponent } from './com/dynamic-com/order-query/order-query.component';
import { MemberQueryComponent } from './com/dynamic-com/member-query/member-query.component';
const THIRDMODULES = [
  NgZorroAntdModule,
  CountdownModule
];
// endregion

// region: your componets & directives
const COMPONENTS = [
  MetaObjectComponent,
  FieldSelectZorroComponent,
  FieldJsonComponent,
  FieldStringZorroComponent,
  FieldPasswordZorroComponent,
  FieldDateZorroComponent,
  FieldPictureZorroComponent,
  FieldNumberZorroComponent,
  FieldDateArrayZorroComponent,
  FieldBooleanZorroComponent,
  FieldDateZorroComponent,
  DemoStringComponent,
  FieldDynamicComponent,
  FieldRefTableZorroComponent,
  FieldRefSelectZorroComponent,
  ProdQueryComponent,
  FieldRefTreeZorroComponent,
  FieldRefTableManyZorroComponent,
  FieldRefTreeManyZorroComponent,
  MyOrderQueryToolbarComponent,
  IcCardReaderComponent,
  OrderQueryComponent,
  MemberQueryComponent
];
const DIRECTIVES = [EnumPipe, DynamicDirective, EditorDirective];
// endregion

@NgModule({
  imports: [
    // NgJsonEditorModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgZorroAntdModule.forRoot(),
    AlainThemeModule.forChild(),
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,

    // third libs 
    ...THIRDMODULES,
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    EnumPipe,
    FieldRefSelectZorroComponent,
    FieldRefTreeManyZorroComponent,
    MetaEditorComponent,
    IcCardReaderComponent,
    OrderQueryComponent,


  ],
  exports: [
    // NgJsonEditorModule,
    ...COMPONENTS,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...DIRECTIVES,
  ],
  entryComponents: [
    ...COMPONENTS
  ]
})
export class SharedModule { }
