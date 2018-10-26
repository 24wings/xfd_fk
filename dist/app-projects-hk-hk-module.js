(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-projects-hk-hk-module"],{

/***/ "./src/app/projects/hk/hk.module.ts":
/*!******************************************!*\
  !*** ./src/app/projects/hk/hk.module.ts ***!
  \******************************************/
/*! exports provided: HkModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HkModule", function() { return HkModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm5/ng-zorro-antd.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _pages_dynamic_menu_page_dynamic_menu_page_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/dynamic-menu-page/dynamic-menu-page.component */ "./src/app/projects/hk/pages/dynamic-menu-page/dynamic-menu-page.component.ts");
/* harmony import */ var _pages_login_page_login_page_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/login-page/login-page.component */ "./src/app/projects/hk/pages/login-page/login-page.component.ts");
/* harmony import */ var app_layout_layout_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/layout/layout.module */ "./src/app/layout/layout.module.ts");
/* harmony import */ var app_layout_default_default_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/layout/default/default.component */ "./src/app/layout/default/default.component.ts");
/* harmony import */ var _hk_api_controller__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./hk.api.controller */ "./src/app/projects/hk/hk.api.controller.ts");
/* harmony import */ var app_SyncDataRegisterFactory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/SyncDataRegisterFactory */ "./src/app/SyncDataRegisterFactory.ts");
/* harmony import */ var dexie__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! dexie */ "./node_modules/dexie/dist/dexie.es.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! . */ "./src/app/projects/hk/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













// import { OnlineStrategyService } from '@core/service/data-strategy/OnlineStrategy.service';
var data = app_SyncDataRegisterFactory__WEBPACK_IMPORTED_MODULE_10__["SyncDataRegisterFactory"].exportSyncDatas();
// 先拿出菜单,建立本地数据库;   
var menus = app_SyncDataRegisterFactory__WEBPACK_IMPORTED_MODULE_10__["SyncDataRegisterFactory"].exportSyncMenu();
var menu = menus.find(function (menu) { return menu.database == ___WEBPACK_IMPORTED_MODULE_12__["HkDbName"]; });
var db = new dexie__WEBPACK_IMPORTED_MODULE_11__["default"](menu.database, { autoOpen: true });
var table = {};
var databaseMenu = menus.find(function (menu) { return menu.database == menu.database; });
var fields = databaseMenu.metaComs
    .map(function (metaCom) {
    var metaObject = metaCom;
    var tableName = metaObject.objectCode.split('.').pop();
    var tablePkField = metaObject.metaFields.find(function (field) { return field.isPk; });
    var fields = metaObject.metaFields.filter(function (field) { return !field.isPk; });
    var tableFields = "++" + tablePkField.fieldName + "," + fields.map(function (field) { return field.fieldName; }).join(',');
    return { tableName: tableName, tableFields: tableFields };
});
fields.forEach(function (field) {
    table[field.tableName] = field.tableFields;
});
console.error(table);
db.version(2).stores(table);
db.open().catch(function (err) { return console.log(err); });
console.warn(data);
var database = data[0];
database.tables.forEach(function (table) {
    var tableName = table.objectCode.split('.').pop();
    console.warn("sync data", table.dataItems);
    table.dataItems.forEach(function (dataItem) {
        var menu = menus.find(function (menu) { return !!menu.metaComs.find(function (metacom) { return metacom.objectCode == table.objectCode; }); });
        var metacom = menu.metaComs.find(function (metacom) { return metacom.objectCode == table.objectCode; });
        var pk = metacom.metaFields.find(function (field) { return field.isPk; });
        if (dataItem.metaCom)
            dataItem = JSON.parse(JSON.stringify(dataItem));
        console.log(dataItem[pk.fieldName]);
        db.table(tableName).put(dataItem);
    });
});
var CommonProverders = [
    _hk_api_controller__WEBPACK_IMPORTED_MODULE_9__["HkApiController"],
];
var CommonComponents = [_pages_dynamic_menu_page_dynamic_menu_page_component__WEBPACK_IMPORTED_MODULE_5__["DynamicMenuPageComponent"], _pages_login_page_login_page_component__WEBPACK_IMPORTED_MODULE_6__["LoginPageComponent"]];
/**
 * 航空公司项目
 */
var HkModule = /** @class */ (function () {
    function HkModule() {
    }
    HkModule_1 = HkModule;
    HkModule.forRoot = function () {
        return {
            ngModule: HkModule_1,
            providers: CommonProverders.slice(),
        };
    };
    var HkModule_1;
    HkModule = HkModule_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                app_layout_layout_module__WEBPACK_IMPORTED_MODULE_7__["LayoutModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NgZorroAntdModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    { path: '', redirectTo: '/hk/admin/login', pathMatch: 'full' },
                    { path: 'admin/login', component: _pages_login_page_login_page_component__WEBPACK_IMPORTED_MODULE_6__["LoginPageComponent"], data: { title: '登录', titleI18n: 'pro-login' } },
                    {
                        path: 'admin/user',
                        component: app_layout_default_default_component__WEBPACK_IMPORTED_MODULE_8__["LayoutDefaultComponent"],
                        children: [
                            { path: '', component: _pages_dynamic_menu_page_dynamic_menu_page_component__WEBPACK_IMPORTED_MODULE_5__["DynamicMenuPageComponent"] },
                            { path: 'dynamic-menu/', component: _pages_dynamic_menu_page_dynamic_menu_page_component__WEBPACK_IMPORTED_MODULE_5__["DynamicMenuPageComponent"] },
                            { path: 'dynamic-menu/menu', component: _pages_dynamic_menu_page_dynamic_menu_page_component__WEBPACK_IMPORTED_MODULE_5__["DynamicMenuPageComponent"] },
                            { path: 'dynamic-menu/org', component: _pages_dynamic_menu_page_dynamic_menu_page_component__WEBPACK_IMPORTED_MODULE_5__["DynamicMenuPageComponent"] },
                            { path: 'dynamic-menu/role', component: _pages_dynamic_menu_page_dynamic_menu_page_component__WEBPACK_IMPORTED_MODULE_5__["DynamicMenuPageComponent"] },
                            { path: 'dynamic-menu/user', component: _pages_dynamic_menu_page_dynamic_menu_page_component__WEBPACK_IMPORTED_MODULE_5__["DynamicMenuPageComponent"] },
                            { path: 'dynamic-menu/air-company', component: _pages_dynamic_menu_page_dynamic_menu_page_component__WEBPACK_IMPORTED_MODULE_5__["DynamicMenuPageComponent"] },
                            { path: 'dynamic-menu/country-manage', component: _pages_dynamic_menu_page_dynamic_menu_page_component__WEBPACK_IMPORTED_MODULE_5__["DynamicMenuPageComponent"] },
                            { path: 'dynamic-menu/city-manage', component: _pages_dynamic_menu_page_dynamic_menu_page_component__WEBPACK_IMPORTED_MODULE_5__["DynamicMenuPageComponent"] },
                            { path: 'dynamic-menu/airport-manage', component: _pages_dynamic_menu_page_dynamic_menu_page_component__WEBPACK_IMPORTED_MODULE_5__["DynamicMenuPageComponent"] },
                            { path: 'dynamic-menu/prod-manage', component: _pages_dynamic_menu_page_dynamic_menu_page_component__WEBPACK_IMPORTED_MODULE_5__["DynamicMenuPageComponent"] },
                            { path: 'dynamic-menu/flight-manage', component: _pages_dynamic_menu_page_dynamic_menu_page_component__WEBPACK_IMPORTED_MODULE_5__["DynamicMenuPageComponent"] },
                            { path: 'dynamic-menu/member-manage', component: _pages_dynamic_menu_page_dynamic_menu_page_component__WEBPACK_IMPORTED_MODULE_5__["DynamicMenuPageComponent"] },
                            { path: 'dynamic-menu/member-info', component: _pages_dynamic_menu_page_dynamic_menu_page_component__WEBPACK_IMPORTED_MODULE_5__["DynamicMenuPageComponent"] },
                            { path: 'dynamic-menu/prod-buy', component: _pages_dynamic_menu_page_dynamic_menu_page_component__WEBPACK_IMPORTED_MODULE_5__["DynamicMenuPageComponent"] },
                            { path: 'dynamic-menu/Unsubmit-order', component: _pages_dynamic_menu_page_dynamic_menu_page_component__WEBPACK_IMPORTED_MODULE_5__["DynamicMenuPageComponent"] },
                            { path: 'dynamic-menu/order-verify', component: _pages_dynamic_menu_page_dynamic_menu_page_component__WEBPACK_IMPORTED_MODULE_5__["DynamicMenuPageComponent"] },
                        ],
                    },
                ])
            ],
            declarations: CommonComponents.slice(),
            providers: CommonProverders.slice(),
        })
    ], HkModule);
    return HkModule;
}());



/***/ }),

/***/ "./src/app/projects/hk/pages/dynamic-menu-page/dynamic-menu-page.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/projects/hk/pages/dynamic-menu-page/dynamic-menu-page.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"metaObject\">\n    <app-meta-object (onAction)=\"doAction($event)\" [metaObject]=\"metaObject\" [power]=\"power\"></app-meta-object>\n</ng-container>\n<!-- 自定义的创建 -->\n<ng-container *ngIf=\"orderCreateMetaCom\">\n    <app-meta-object (onAction)=\"orderCreateAction($event)\" [metaObject]=\"orderCreateMetaCom\" [power]=\"power\"></app-meta-object>\n</ng-container>\n<nz-modal nzTitle=\"选择通知种类\" [nzVisible]=\"selectReasonVisible\" (nzOnCancel)=\"selectReasonVisible=false\" (nzOnOk)=\"selectReasonVisible=false;createNotify()\">\n    <nz-radio-group [(ngModel)]=\"radioValue\">\n        <label nz-radio [ngStyle]=\"style\" [nzValue]=\"reason\" *ngFor=\"let reason of reasons\">{{reason}}</label>\n    </nz-radio-group>\n    <textarea rows=\"4\" nz-input [(ngModel)]=\"radioValue\"></textarea>\n</nz-modal>"

/***/ }),

/***/ "./src/app/projects/hk/pages/dynamic-menu-page/dynamic-menu-page.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/projects/hk/pages/dynamic-menu-page/dynamic-menu-page.component.ts ***!
  \************************************************************************************/
/*! exports provided: DynamicMenuPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicMenuPageComponent", function() { return DynamicMenuPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm5/ng-zorro-antd.js");
/* harmony import */ var _core_service_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/service/storage.service */ "./src/app/core/service/storage.service.ts");
/* harmony import */ var _core_service_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/service/common.service */ "./src/app/core/service/common.service.ts");
/* harmony import */ var app_SyncDataRegisterFactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/SyncDataRegisterFactory */ "./src/app/SyncDataRegisterFactory.ts");
/* harmony import */ var _core_service_data_strategy_OnlineStrategy_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/service/data-strategy/OnlineStrategy.service */ "./src/app/core/service/data-strategy/OnlineStrategy.service.ts");
/* harmony import */ var _core_service_data_strategy_IDataStrategy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/service/data-strategy/IDataStrategy */ "./src/app/core/service/data-strategy/IDataStrategy.ts");
/* harmony import */ var _core_service_http_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/service/http.service */ "./src/app/core/service/http.service.ts");
/* harmony import */ var app_app_config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/app.config */ "./src/app/app.config.ts");
/* harmony import */ var _built_in_app_menu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../built-in/app.menu */ "./src/app/projects/hk/built-in/app.menu.ts");
/* harmony import */ var _core_util_meta_IMetaNotify__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @core/util/meta/IMetaNotify */ "./src/app/core/util/meta/IMetaNotify.ts");
/* harmony import */ var _core_util_meta_MetaEntity__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @core/util/meta/MetaEntity */ "./src/app/core/util/meta/MetaEntity.ts");
/* harmony import */ var _core_util_meta_Mode_enum__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @core/util/meta/Mode.enum */ "./src/app/core/util/meta/Mode.enum.ts");
/* harmony import */ var _core_util_event_custom_action_event__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @core/util/event/custom-action.event */ "./src/app/core/util/event/custom-action.event.ts");
/* harmony import */ var _meta_OrderCreate__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../meta/OrderCreate */ "./src/app/projects/hk/meta/OrderCreate.ts");
/* harmony import */ var app_entity_enum__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! app/entity.enum */ "./src/app/entity.enum.ts");
/* harmony import */ var _meta_MsgNotify__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../meta/MsgNotify */ "./src/app/projects/hk/meta/MsgNotify.ts");
/* harmony import */ var _enum_MsgType_enum__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../enum/MsgType.enum */ "./src/app/projects/hk/enum/MsgType.enum.ts");
/* harmony import */ var _enum_AuditStatus_enum__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../enum/AuditStatus.enum */ "./src/app/projects/hk/enum/AuditStatus.enum.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















var DynamicMenuPageComponent = /** @class */ (function () {
    function DynamicMenuPageComponent(route, router, store, modalService, commonService, appConfig, dataStrategy, myHttp) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.store = store;
        this.modalService = modalService;
        this.commonService = commonService;
        this.appConfig = appConfig;
        this.dataStrategy = dataStrategy;
        this.myHttp = myHttp;
        // 显示情况
        this.selectReasonVisible = false;
        this.power = 0;
        this.reasons = [
            '已经支付定金,请执行下一步操作1',
            '已经支付定金,请执行下一步操作2',
            '已经支付定金,请执行下一步操作3',
            '已经支付定金,请执行下一步操作4',
            '已经支付定金,请执行下一步操作5',
        ];
        this.radioValue = 'A';
        this.style = {
            display: 'block',
            height: '30px',
            lineHeight: '30px'
        };
        var data = app_SyncDataRegisterFactory__WEBPACK_IMPORTED_MODULE_5__["SyncDataRegisterFactory"].exportSyncDatas();
        if (this.dataStrategy instanceof _core_service_data_strategy_OnlineStrategy_service__WEBPACK_IMPORTED_MODULE_6__["OnlineStrategyService"]) {
            // this.myHttp.Post('/dev/sync', data);
        }
        this.router.events.forEach(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]) {
                var params_1 = _this.route.snapshot.queryParams;
                if (params_1.viewType == 'info' && params_1.dataId && params_1.viewName) {
                    console.log(_this.appConfig.registerMsgNotifyFactorys);
                    var metas = _this.appConfig.registerMsgNotifyFactorys.filter(function (notitfyclass) { return Object(_core_util_meta_IMetaNotify__WEBPACK_IMPORTED_MODULE_11__["getMetaNotify"])(notitfyclass).viewName == params_1.viewName; }).map(function (notifyClass) { return Object(_core_util_meta_MetaEntity__WEBPACK_IMPORTED_MODULE_12__["getMetaEntity"])(notifyClass); });
                    var metaObject = metas[0];
                    metaObject.data.presetObject = { id: params_1.dataId };
                    _this.metaObject = metaObject;
                    _this.metaObject.database = 'hk';
                    _this.metaObject.defaultMode = _core_util_meta_Mode_enum__WEBPACK_IMPORTED_MODULE_13__["ModeEnum"].Update;
                    console.log(_this.metaObject);
                    if (_this.metaObject.power) {
                        _this.power = _this.metaObject.power;
                    }
                    else {
                        var menus = Object(_built_in_app_menu__WEBPACK_IMPORTED_MODULE_10__["loadBuiltInMenus"])();
                        var activeMetaCom_1 = menus.find(function (menu) { return menu.link ? new RegExp(menu.link, 'g').test(_this.router.url) : false; });
                        var powers = _this.store.menuList.filter(function (menu) { return menu.parentId == activeMetaCom_1.menuId; }).map(function (menu) { return menu.menuCode; });
                        if (powers && powers.length > 0)
                            _this.power = powers.reduce(function (pre, after) { return pre | after; });
                    }
                }
            }
        });
    }
    DynamicMenuPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        var menus = Object(_built_in_app_menu__WEBPACK_IMPORTED_MODULE_10__["loadBuiltInMenus"])();
        var activeMetaCom = menus.find(function (menu) { return menu.link ? new RegExp(menu.link, 'g').test(_this.router.url) : false; });
        if (activeMetaCom) {
            this.metaObject = Object(_core_util_meta_MetaEntity__WEBPACK_IMPORTED_MODULE_12__["getMetaEntity"])(activeMetaCom.metaCom);
            this.metaObject.database = 'hk';
            var queryParam = this.route.snapshot.queryParams;
            if (this.route.snapshot.fragment) {
                this.metaObject.defaultMode = this.route.snapshot.fragment;
                this.metaObject.data.presetObject = queryParam;
            }
            if (this.metaObject.power) {
                this.power = this.metaObject.power;
            }
            else {
                var powers = this.store.menuList.filter(function (menu) { return menu.parentId == activeMetaCom.menuId; }).map(function (menu) { return menu.menuCode; });
                if (powers && powers.length > 0)
                    this.power = powers.reduce(function (pre, after) { return pre | after; });
            }
        }
    };
    DynamicMenuPageComponent.prototype.doAction = function ($event) {
        if ($event instanceof _core_util_event_custom_action_event__WEBPACK_IMPORTED_MODULE_14__["CustomActionEvent"]) {
            if ($event.eventName == 'product-buy') {
                this.orderCreateMetaCom = Object(_core_util_meta_MetaEntity__WEBPACK_IMPORTED_MODULE_12__["getMetaEntity"])(_meta_OrderCreate__WEBPACK_IMPORTED_MODULE_15__["OrderCreate"]);
                var product = $event.data[0];
                this.orderCreateMetaCom.defaultNewDataItem = Object.assign(new _meta_OrderCreate__WEBPACK_IMPORTED_MODULE_15__["OrderCreate"](), {
                    productName: product.name,
                    productCode: product.code,
                    returnFlightCode: product.returnFlight.code,
                    boundFlightCode: product.boundFlight.code,
                    price_a: product.price2B_a,
                    price_c: product.price2B_c,
                });
                var returnDateField = this.orderCreateMetaCom.metaFields.find(function (field) { return field.fieldName == 'returnDate'; });
                returnDateField.options = product.returnDates.split(',').map(function (dt) {
                    return {
                        alias: dt, value: new Date(Number(dt.substring(0, 4)), Number(dt.substring(4, 6)), Number(dt.substring(6)))
                    };
                });
                var boundDateField = this.orderCreateMetaCom.metaFields.find(function (field) { return field.fieldName == 'boundDate'; });
                boundDateField.options = product.boundDates.split(',').map(function (dt) { return { alias: dt, value: new Date(Number(dt.substring(0, 4)), Number(dt.substring(4, 6)), Number(dt.substring(6))) }; });
                this.orderCreateMetaCom.defaultMode = _core_util_meta_Mode_enum__WEBPACK_IMPORTED_MODULE_13__["ModeEnum"].Create;
            }
            else if ($event.eventName == 'notify-admin') {
                this.selectReasonVisible = true;
                this.selectedOrder = $event.data[0];
                console.log($event);
            }
            else {
                this.createCustomButtonModal($event);
            }
        }
    };
    DynamicMenuPageComponent.prototype.createNotify = function () {
        this.commonService.entityInsert(app_entity_enum__WEBPACK_IMPORTED_MODULE_16__["EntityEnum"].MsgNotify, Object.assign(new _meta_MsgNotify__WEBPACK_IMPORTED_MODULE_17__["MsgNotify"](), {
            orgId: 2,
            userId: null,
            msgType: _enum_MsgType_enum__WEBPACK_IMPORTED_MODULE_18__["MsgTypeEnum"].Task,
            title: "订单通知",
            content: this.radioValue,
            addition: JSON.stringify({ id: this.selectedOrder.id, }),
            createTime: new Date(),
            creatorId: this.store.trueUser.id,
            creator: this.store.trueUser.name,
            isRead: false,
            isJPush: false,
            isWebpush: true,
            viewName: "order-notify-task"
        }));
    };
    DynamicMenuPageComponent.prototype.createCustomButtonModal = function ($event) {
        var _this = this;
        var data = $event.data[0];
        data.auditStatus = _enum_AuditStatus_enum__WEBPACK_IMPORTED_MODULE_19__["AuditStatusEnum"].approved;
        var modal = this.modalService.create({
            nzTitle: '审核产品',
            nzContent: '请审查产品的细节',
            nzFooter: [
                {
                    label: '取消',
                    shape: 'default',
                    onClick: function () { return modal.destroy(); }
                },
                {
                    label: '通过',
                    type: 'primary',
                    onClick: function () {
                        // this.commonService.entityUpdate($event['metaCom'].objectCode, data as any);
                        _this.selectReasonVisible = false;
                        modal.destroy();
                    }
                },
                {
                    label: '不通过',
                    type: 'danger',
                    onClick: function () {
                    }
                }
            ]
        });
        this.selectReasonVisible = false;
    };
    DynamicMenuPageComponent.prototype.orderCreateAction = function ($event) {
        this.orderCreateMetaCom = null;
    };
    DynamicMenuPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dynamic-menu-page',
            template: __webpack_require__(/*! ./dynamic-menu-page.component.html */ "./src/app/projects/hk/pages/dynamic-menu-page/dynamic-menu-page.component.html"),
            styles: []
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _core_service_storage_service__WEBPACK_IMPORTED_MODULE_3__["StorageService"],
            ng_zorro_antd__WEBPACK_IMPORTED_MODULE_2__["NzModalService"],
            _core_service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            app_app_config__WEBPACK_IMPORTED_MODULE_9__["AppConfig"],
            _core_service_data_strategy_IDataStrategy__WEBPACK_IMPORTED_MODULE_7__["IDataStrategy"],
            _core_service_http_service__WEBPACK_IMPORTED_MODULE_8__["MyHttpService"]])
    ], DynamicMenuPageComponent);
    return DynamicMenuPageComponent;
}());



/***/ }),

/***/ "./src/app/projects/hk/pages/login-page/login-page.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/projects/hk/pages/login-page/login-page.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\r\n    background: #f0f2f5;\r\n    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);\r\n    width: 100%;\r\n    min-height: 100%;\r\n    background-repeat: no-repeat;\r\n    background-position: center;\r\n    background-size: 100%;\r\n    padding: 110px 0 144px 0;\r\n    position: relative;\r\n}\r\n\r\n.logo {\r\n    height: 44px;\r\n    vertical-align: top;\r\n    margin-right: 16px;\r\n}\r\n\r\n.main {\r\n    width: 368px;\r\n    margin: 0 auto;\r\n}\r\n\r\n.login-form {\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    max-width: 300px;\r\n}\r\n\r\n.login-form-forgot {\r\n    float: right;\r\n}\r\n\r\n.login-form-button {\r\n    width: 100%;\r\n}\r\n\r\n.desc {\r\n    font-size: 14px;\r\n    color: rgba(0, 0, 0, 0.45);\r\n    margin-top: 12px;\r\n    margin-bottom: 40px;\r\n}\r\n\r\n.footer {\r\n    position: absolute;\r\n    width: 100%;\r\n    bottom: 0;\r\n}\r\n\r\n.golbal-footer {\r\n    padding: 0 16px;\r\n    margin: 48px 0 24px 0;\r\n    text-align: center;\r\n}\r\n\r\n.footer .copyright {\r\n    color: rgba(0, 0, 0, 0.45);\r\n    font-size: 14px;\r\n}\r\n\r\nnz-input {\r\n    margin: 10px 0;\r\n}"

/***/ }),

/***/ "./src/app/projects/hk/pages/login-page/login-page.component.html":
/*!************************************************************************!*\
  !*** ./src/app/projects/hk/pages/login-page/login-page.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n    <div class=\"main\">\r\n        <div class=\"top text-center\">\r\n            <div class=\"desc\">梭日科技市场管理</div>\r\n        </div>\r\n        <div class=\"login-form\">\r\n            <div>\r\n                <nz-input-group [nzSuffix]=\"suffixTemplate\" nzPrefixIcon=\"anticon anticon-user\">\r\n                    <input type=\"text\" nz-input placeholder=\"用户名\" [(ngModel)]=\"username\">\r\n                </nz-input-group>\r\n                <ng-template #suffixTemplate>\r\n                    <i class=\"anticon anticon-close-circle\" (click)=\"username=null\" *ngIf=\"username\"></i>\r\n                </ng-template>\r\n            </div>\r\n            <div style=\"margin:20px auto;\">\r\n                <nz-input-group [nzSuffix]=\"suffixTemplate\" nzPrefixIcon=\"anticon anticon-user\">\r\n                    <input type=\"password\" nz-input placeholder=\"密码\" [(ngModel)]=\"password\">\r\n                </nz-input-group>\r\n                <ng-template #suffixTemplate>\r\n                    <i class=\"anticon anticon-close-circle\" (click)=\"password=null\" *ngIf=\"password\"></i>\r\n                </ng-template>\r\n            </div>\r\n            <div>\r\n            </div>\r\n            <div style=\"display: FLEX;\r\n            justify-content: space-around;\r\n            margin: 20px;\">\r\n                <!-- <a class=\"login-form-forgot\" routerLink=\"/admin/forgot-password\" class=\"login-form-forgot\">忘记密码</a>\r\n                <a routerLink=\"/admin/signup\">注册</a> -->\r\n            </div>\r\n            <button nz-button class=\"login-form-button\" [nzType]=\"'primary'\" [nzSize]=\"'large'\" (click)=\"login()\">登录</button>\r\n        </div>\r\n    </div>\r\n    <!-- footer -->\r\n    <div class=\"footer golbal-footer \">\r\n        <span class=\"copyright\">\r\n      由刺月无影提供\r\n    </span>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/projects/hk/pages/login-page/login-page.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/projects/hk/pages/login-page/login-page.component.ts ***!
  \**********************************************************************/
/*! exports provided: LoginPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageComponent", function() { return LoginPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _delon_abc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @delon/abc */ "./node_modules/@delon/abc/fesm5/abc.js");
/* harmony import */ var _delon_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @delon/theme */ "./node_modules/@delon/theme/fesm5/theme.js");
/* harmony import */ var _core_service_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @core/service/storage.service */ "./src/app/core/service/storage.service.ts");
/* harmony import */ var _core_service_http_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/service/http.service */ "./src/app/core/service/http.service.ts");
/* harmony import */ var _core_service_dev_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/service/dev.service */ "./src/app/core/service/dev.service.ts");
/* harmony import */ var _core_service_user_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/service/user.service */ "./src/app/core/service/user.service.ts");
/* harmony import */ var _core_service_data_strategy_IDataStrategy__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @core/service/data-strategy/IDataStrategy */ "./src/app/core/service/data-strategy/IDataStrategy.ts");
/* harmony import */ var _hk_api_controller__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../hk.api.controller */ "./src/app/projects/hk/hk.api.controller.ts");
/* harmony import */ var _hk_api__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../hk.api */ "./src/app/projects/hk/hk.api.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};












var LoginPageComponent = /** @class */ (function () {
    function LoginPageComponent(router, storage, http, lowHttp, dev, user, reuseTab, setting, dataStrategy, myHttp, hkService) {
        this.router = router;
        this.storage = storage;
        this.http = http;
        this.lowHttp = lowHttp;
        this.dev = dev;
        this.user = user;
        this.reuseTab = reuseTab;
        this.setting = setting;
        this.dataStrategy = dataStrategy;
        this.myHttp = myHttp;
        this.hkService = hkService;
        this.username = "";
        this.password = "";
        this.isElectron = false;
        this.loading = false;
    }
    LoginPageComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    LoginPageComponent.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.loading) return [3 /*break*/, 2];
                        this.loading = true;
                        return [4 /*yield*/, this.hkService.Post(_hk_api__WEBPACK_IMPORTED_MODULE_11__["hkApi"].login, { userName: this.username, password: this.password })];
                    case 1:
                        result = _a.sent();
                        this.loading = false;
                        if (result) {
                            this.storage.trueUser = result.employee;
                            // this.storage.trueUser = result.employee;
                            this.storage.menuList = result.menus;
                            this.storage.token = result.token;
                            if (result.member)
                                this.storage.member = result.member;
                            this.setting.setUser({ name: result.employee.name, email: result.roleNames });
                            this.reuseTab.clear();
                            this.router.navigateByUrl('/hk/admin/user/dynamic-menu/org');
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    LoginPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-login-page",
            template: __webpack_require__(/*! ./login-page.component.html */ "./src/app/projects/hk/pages/login-page/login-page.component.html"),
            styles: [__webpack_require__(/*! ./login-page.component.css */ "./src/app/projects/hk/pages/login-page/login-page.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _core_service_storage_service__WEBPACK_IMPORTED_MODULE_5__["StorageService"],
            _core_service_http_service__WEBPACK_IMPORTED_MODULE_6__["MyHttpService"],
            _angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"],
            _core_service_dev_service__WEBPACK_IMPORTED_MODULE_7__["DevService"],
            _core_service_user_service__WEBPACK_IMPORTED_MODULE_8__["UserService"],
            _delon_abc__WEBPACK_IMPORTED_MODULE_3__["ReuseTabService"],
            _delon_theme__WEBPACK_IMPORTED_MODULE_4__["SettingsService"],
            _core_service_data_strategy_IDataStrategy__WEBPACK_IMPORTED_MODULE_9__["IDataStrategy"],
            _core_service_http_service__WEBPACK_IMPORTED_MODULE_6__["MyHttpService"],
            _hk_api_controller__WEBPACK_IMPORTED_MODULE_10__["HkApiController"]])
    ], LoginPageComponent);
    return LoginPageComponent;
}());



/***/ })

}]);
//# sourceMappingURL=app-projects-hk-hk-module.js.map