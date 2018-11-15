import { NgModule, LOCALE_ID, APP_INITIALIZER, Provider } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DelonModule } from './delon.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { LayoutModule } from './layout/layout.module';
import { MyHttpService } from '@core/service/http.service';
import { CommonService } from '@core/service/common.service';
import { UserService } from '@core/service/user.service';
import { DevService } from '@core/service/dev.service';
import { ConfigService } from '@core/service/config.service';
import { StorageService } from '@core/service/storage.service';
import { ExcelService } from '@core/service/excel.service';
import { ValidService } from '@core/service/validate.service';
import { HttpModule } from '@angular/http';
// #region default language
// 参考：https://ng-alain.com/docs/i18n
import { default as ngLang } from '@angular/common/locales/zh-Hans';
import { NZ_I18N, zh_CN as zorroLang } from 'ng-zorro-antd';
import { DELON_LOCALE, zh_CN as delonLang } from '@delon/theme';
const LANG = {
  abbr: 'zh-Hans',
  ng: ngLang,
  zorro: zorroLang,
  delon: delonLang,
};
// register angular
import { registerLocaleData } from '@angular/common';
registerLocaleData(LANG.ng, LANG.abbr);
const LANG_PROVIDES = [
  { provide: LOCALE_ID, useValue: LANG.abbr },
  { provide: NZ_I18N, useValue: LANG.zorro },
  { provide: DELON_LOCALE, useValue: LANG.delon },
];
// #endregion
// #region i18n services
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ALAIN_I18N_TOKEN } from '@delon/theme';
import { I18NService } from '@core/i18n/i18n.service';
// 加载i18n语言文件
export function I18nHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `assets/tmp/i18n/`, '.json');
}

const I18NSERVICE_MODULES = [
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: I18nHttpLoaderFactory,
      deps: [HttpClient],
    },
  }),
];
const CommonProviders: Provider[] = [
  ActionService,
  MyHttpService,
  AppConfig,
  CommonService,
  UserService,
  DevService,
  ConfigService,
  StorageService,
  ExcelService,
  ValidService,
  HkApiController,
  { provide: IDataStrategy, useClass: DataStrategy },
  { provide: CustomUrlService, useClass: CustomUrlService }
];

const I18NSERVICE_PROVIDES = [
  { provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false },
];

// #endregion

// #region global third module
import { UEditorModule } from 'ngx-ueditor';
import { NgxTinymceModule } from 'ngx-tinymce';
const GLOBAL_THIRD_MDOULES = [
  UEditorModule.forRoot({
    // **注：** 建议使用本地路径；以下为了减少 ng-alain 脚手架的包体大小引用了CDN，可能会有部分功能受影响
    js: [
      `//apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.config.js`,
      `//apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.all.min.js`,
    ],
    options: {
      UEDITOR_HOME_URL: `//apps.bdimg.com/libs/ueditor/1.4.3.1/`,
    },
  }),
  NgxTinymceModule.forRoot({
    baseURL: '//cdn.bootcss.com/tinymce/4.7.4/',
  }),
];
// #endregion

// #region JSON Schema form (using @delon/form)
import { JsonSchemaModule } from '@shared/json-schema/json-schema.module';
const FORM_MODULES = [JsonSchemaModule];
// #endregion

// #region Http Interceptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '@core/net/default.interceptor';
const INTERCEPTOR_PROVIDES = [
  // { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
];
// #endregion

// #region Startup Service
import { StartupService } from '@core/startup/startup.service';
import { AppConfig } from './app.config';
import { ActionService } from '@core/service/action.service';
import { IDataStrategy } from '@core/service/data-strategy/IDataStrategy';
import { IndexedDbStrategyService } from '@core/service/data-strategy/IndexedDbStrategy.service';
import { HkApiController } from './projects/hk/hk.api.controller';
import { CustomUrlService } from '@core/service/CustomUrl.service';
import { OnlineStrategyService } from '@core/service/data-strategy/OnlineStrategy.service';
import { DataStrategy } from './app.data-strategy';
import { CallbackComponent } from './routes/callback/callback.component';
import { MetaUiModule } from './libs/meta-ui/meta-ui.module';

export function StartupServiceFactory(
  startupService: StartupService,
): Function {
  return () => startupService.load();
}
const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
];
// #endregion



@NgModule({
  declarations: [AppComponent, CallbackComponent],
  imports: [
    MetaUiModule.forRoot(),
    HttpModule,
    HttpClientModule,

    BrowserModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    DelonModule.forRoot(),
    CoreModule,
    SharedModule,
    LayoutModule,
    RoutesModule,
    ...I18NSERVICE_MODULES,
    ...GLOBAL_THIRD_MDOULES,
    ...FORM_MODULES,
  ],
  providers: [
    ...LANG_PROVIDES,
    ...INTERCEPTOR_PROVIDES,
    ...I18NSERVICE_PROVIDES,
    ...APPINIT_PROVIDES,
    ...CommonProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
