import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { DynamicMenuPageComponent } from './pages/dynamic-menu-page/dynamic-menu-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LayoutModule } from 'app/layout/layout.module';
import { LayoutDefaultComponent } from 'app/layout/default/default.component';
import { HkApiController } from './hk.api.controller';
import { IndexedDbStrategyService } from '@core/service/data-strategy/IndexedDbStrategy.service';
import { MyHttpService } from '@core/service/http.service';
import { CoreModule } from '@core/core.module';
import { IDataStrategy } from '@core/service/data-strategy/IDataStrategy';
import { StorageService } from '@core/service/storage.service';
import { AppConfig } from 'app/app.config';
import { SyncDataRegisterFactory } from 'app/SyncDataRegisterFactory';
import Dexie from 'dexie';
import { MetaCom } from '@core/util/meta/MetaCom';
import { MenuMetaCom } from '../xfd_fk/bulit-in/app.menu';
import { HkDbName } from '.';
// import { OnlineStrategyService } from '@core/service/data-strategy/OnlineStrategy.service';
let data = SyncDataRegisterFactory.exportSyncDatas();
// 先拿出菜单,建立本地数据库;   
let menus = SyncDataRegisterFactory.exportSyncMenu();
let menu = menus.find(menu => menu.database == HkDbName);
let db = new Dexie(menu.database, { autoOpen: true });
let table = {};
let databaseMenu = menus.find(menu => menu.database == menu.database)
let fields = databaseMenu.metaComs
  .map(metaCom => {
    let metaObject: MetaCom = metaCom;
    let tableName = metaObject.objectCode.split('.').pop();
    let tablePkField = metaObject.metaFields.find(field => field.isPk);
    let fields = metaObject.metaFields.filter(field => !field.isPk);
    let tableFields = "++" + tablePkField.fieldName + "," + fields.map(field => field.fieldName).join(',')
    return { tableName, tableFields }
  });
fields.forEach(field => {
  table[field.tableName] = field.tableFields;
});
console.error(table);
db.version(2).stores(table);
db.open().catch(err => console.log(err))
console.warn(data);

let database = data[0]
database.tables.forEach(table => {
  let tableName = table.objectCode.split('.').pop();
  console.warn(`sync data`, table.dataItems);
  table.dataItems.forEach((dataItem: MenuMetaCom) => {
    let menu = menus.find(menu => !!menu.metaComs.find(metacom => metacom.objectCode == table.objectCode));
    let metacom = menu.metaComs.find(metacom => metacom.objectCode == table.objectCode);
    let pk = metacom.metaFields.find(field => field.isPk);
    if (dataItem.metaCom) dataItem = JSON.parse(JSON.stringify(dataItem));
    console.log(dataItem[pk.fieldName]);
    db.table(tableName).put(dataItem);
  });
});

const CommonProverders: any[] = [
  HkApiController,
  // AppConfig,
  // MyHttpService, StorageService
];
const CommonComponents: any[] = [DynamicMenuPageComponent, LoginPageComponent]
/**
 * 航空公司项目
 */
@NgModule({
  imports: [
    LayoutModule,
    CommonModule,
    NgZorroAntdModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: '/hk/admin/login', pathMatch: 'full' },
      { path: 'admin/login', component: LoginPageComponent, data: { title: '登录', titleI18n: 'pro-login' } },
      {
        path: 'admin/user',
        component: LayoutDefaultComponent,
        children: [

          { path: '', component: DynamicMenuPageComponent },
          { path: 'dynamic-menu/', component: DynamicMenuPageComponent },
          { path: 'dynamic-menu/menu', component: DynamicMenuPageComponent },
          { path: 'dynamic-menu/org', component: DynamicMenuPageComponent },
          { path: 'dynamic-menu/role', component: DynamicMenuPageComponent },
          { path: 'dynamic-menu/user', component: DynamicMenuPageComponent },
          { path: 'dynamic-menu/air-company', component: DynamicMenuPageComponent },
          { path: 'dynamic-menu/country-manage', component: DynamicMenuPageComponent },
          { path: 'dynamic-menu/city-manage', component: DynamicMenuPageComponent },
          { path: 'dynamic-menu/airport-manage', component: DynamicMenuPageComponent },
          { path: 'dynamic-menu/prod-manage', component: DynamicMenuPageComponent },
          { path: 'dynamic-menu/flight-manage', component: DynamicMenuPageComponent },
          { path: 'dynamic-menu/member-manage', component: DynamicMenuPageComponent },
          { path: 'dynamic-menu/member-info', component: DynamicMenuPageComponent },
          { path: 'dynamic-menu/prod-buy', component: DynamicMenuPageComponent },
          { path: 'dynamic-menu/Unsubmit-order', component: DynamicMenuPageComponent },
          { path: 'dynamic-menu/order-verify', component: DynamicMenuPageComponent },
        ],
      },
    ])
  ],
  declarations: [...CommonComponents],
  providers: [...CommonProverders],
  // exports: [...CommonComponents]
})
export class HkModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: HkModule,
      providers: [...CommonProverders],
    }
  }
}
