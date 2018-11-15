import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { StorageService } from 'app/libs/meta-ui/service/storage.service';
import { CommonService } from 'app/libs/meta-ui/service/common.service';
import { SyncDataRegisterFactory } from 'app/SyncDataRegisterFactory';
import { OnlineStrategyService } from 'app/libs/meta-ui/service/data-strategy/OnlineStrategy.service';
import { IDataStrategy } from 'app/libs/meta-ui/service/data-strategy/IDataStrategy';
import { IndexedDbStrategyService } from 'app/libs/meta-ui/service/data-strategy/IndexedDbStrategy.service';
import Dexie from 'dexie';
import { MyHttpService } from 'app/libs/meta-ui/service/http.service';
import { MetaCom } from 'app/libs/meta-ui/util/meta/MetaCom';
import { AppConfig } from 'app/app.config';
import { MenuMetaCom, loadBuiltInMenus } from '../../built-in/app.menu';
import { getMetaNotify } from 'app/libs/meta-ui/util/meta/IMetaNotify';
import { getMetaEntity } from 'app/libs/meta-ui/util/meta/MetaEntity';
import { ModeEnum } from 'app/libs/meta-ui/util/meta/Mode.enum';
import { CustomActionEvent } from 'app/libs/meta-ui/util/event/custom-action.event';
import { Product } from '../../entity/Product';
import { OrderCreate } from '../../meta/OrderCreate';
import { Flight } from '../../entity/Flight';
import { Order } from '../../entity/Order';
import { EntityEnum } from 'app/entity.enum';
import { MsgNotify } from '../../meta/MsgNotify';
import { MsgTypeEnum } from '../../enum/MsgType.enum';
import { AuditStatusEnum } from '../../enum/AuditStatus.enum';


@Component({
  selector: 'app-dynamic-menu-page',
  templateUrl: './dynamic-menu-page.component.html',
  styles: []
})
export class DynamicMenuPageComponent implements OnInit {
  // 显示情况
  selectReasonVisible: boolean = false;
  metaObject: MetaCom;
  orderCreateMetaCom: MetaCom;
  power: number = 0;
  reasons: string[] = [
    '已经支付定金,请执行下一步操作1',
    '已经支付定金,请执行下一步操作2',
    '已经支付定金,请执行下一步操作3',
    '已经支付定金,请执行下一步操作4',
    '已经支付定金,请执行下一步操作5',
  ]
  radioValue = 'A';
  style = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  };
  constructor(public route: ActivatedRoute,
    public router: Router,
    public store: StorageService,
    public modalService: NzModalService,
    public commonService: CommonService,
    public appConfig: AppConfig,
    private dataStrategy: IDataStrategy,
    private myHttp: MyHttpService
  ) {
    let data = SyncDataRegisterFactory.exportSyncDatas();
    if (this.dataStrategy instanceof OnlineStrategyService) {
      // this.myHttp.Post('/dev/sync', data);
    }
    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        let params = this.route.snapshot.queryParams;
        if (params.viewType == 'info' && params.dataId && params.viewName) {
          console.log(this.appConfig.registerMsgNotifyFactorys)
          let metas = this.appConfig.registerMsgNotifyFactorys.filter(notitfyclass => getMetaNotify(notitfyclass).viewName == params.viewName).map(notifyClass => getMetaEntity(notifyClass));
          let metaObject = metas[0];
          metaObject.data.presetConditions = [{ field: 'id', value: params.dataId, compare: "=", andOr: 'and' }];
          this.metaObject = metaObject;
          this.metaObject.database = 'hk';
          this.metaObject.defaultMode = ModeEnum.Update;
          console.log(this.metaObject);
          if (this.metaObject.power) {
            this.power = this.metaObject.power;
          } else {
            let menus = loadBuiltInMenus();
            let activeMetaCom = menus.find(menu => menu.link ? new RegExp(menu.link, 'g').test(this.router.url) : false);
            let powers = this.store.menuList.filter(menu => menu.parentId == activeMetaCom.menuId).map(menu => menu.menuCode);
            if (powers && powers.length > 0)
              this.power = powers.reduce((pre, after) => pre | after);
          }

        }
      }
    })
  }
  ngOnInit() {
    let menus = loadBuiltInMenus();
    let activeMetaCom = menus.find(menu => menu.link ? new RegExp(menu.link, 'g').test(this.router.url) : false);
    if (activeMetaCom) {
      this.metaObject = getMetaEntity(activeMetaCom.metaCom);
      this.metaObject.database = 'hk';
      let queryParam = this.route.snapshot.queryParams;
      if (this.route.snapshot.fragment) {
        this.metaObject.defaultMode = this.route.snapshot.fragment as ModeEnum;
        // this.metaObject.data.presetConditions = queryParam;
      }
      if (this.metaObject.power) {
        this.power = this.metaObject.power;
      } else {
        let powers = this.store.menuList.filter(menu => menu.parentId == activeMetaCom.menuId).map(menu => menu.menuCode);
        if (powers && powers.length > 0)
          this.power = powers.reduce((pre, after) => pre | after);
      }

    }
  }

  doAction($event: { action: { checkPower: number, eventName }, data: any[], metaObject: MetaCom }) {
    if ($event instanceof CustomActionEvent) {
      if ($event.eventName == 'product-buy') {
        this.orderCreateMetaCom = getMetaEntity(OrderCreate);
        let product: Product = $event.data[0];
        this.orderCreateMetaCom.defaultNewDataItem = Object.assign(new OrderCreate(), {
          productName: product.name,
          productCode: product.code,
          returnFlightCode: (product.returnFlight as Flight).code,
          boundFlightCode: (product.boundFlight as Flight).code,
          price_a: product.price2B_a,
          price_c: product.price2B_c,
        } as Order);
        let returnDateField = this.orderCreateMetaCom.metaFields.find(field => field.fieldName == 'returnDate');
        returnDateField.options = (product.returnDates as String).split(',').map(dt => {
          return {
            alias: dt, value: new Date(Number(dt.substring(0, 4)), Number(dt.substring(4, 6)), Number(dt.substring(6)))
          }
        });
        let boundDateField = this.orderCreateMetaCom.metaFields.find(field => field.fieldName == 'boundDate');
        boundDateField.options = (product.boundDates as String).split(',').map(dt => { return { alias: dt, value: new Date(Number(dt.substring(0, 4)), Number(dt.substring(4, 6)), Number(dt.substring(6))) } });
        this.orderCreateMetaCom.defaultMode = ModeEnum.Create;
      }
      else if ($event.eventName == 'notify-admin') {
        this.selectReasonVisible = true;
        this.selectedOrder = $event.data[0];
        console.log($event)
      }
      else {
        this.createCustomButtonModal($event);
      }
    }
  }
  selectedOrder: Order;
  createNotify() {
    this.commonService.entityInsert(EntityEnum.MsgNotify, Object.assign(new MsgNotify(), {
      orgId: 2,
      userId: null,// 发给app用户,为空时不限制Customer
      msgType: MsgTypeEnum.Task,// 消息类型
      title: "订单通知",// 消息摘要
      content: this.radioValue,// 消息内容
      addition: JSON.stringify({ id: this.selectedOrder.id, }),// 附加内容
      createTime: new Date(),// 创建时间
      creatorId: this.store.trueUser.id,// 创建人Id
      creator: this.store.trueUser.name,// 创建人姓名
      isRead: false,
      isJPush: false,
      isWebpush: true,
      viewName: "order-notify-task"
    } as MsgNotify))

  }
  createCustomButtonModal($event: { action: { checkPower: number }, data: any[], metaObject: MetaCom }): void {
    let data = $event.data[0] as Product;
    data.auditStatus = AuditStatusEnum.approved;
    const modal = this.modalService.create({
      nzTitle: '审核产品',
      nzContent: '请审查产品的细节',
      nzFooter: [
        {
          label: '取消',
          shape: 'default',
          onClick: () => modal.destroy()
        },
        {
          label: '通过',
          type: 'primary',
          onClick: () => {
            // this.commonService.entityUpdate($event['metaCom'].objectCode, data as any);
            this.selectReasonVisible = false;
            modal.destroy()
          }
        },
        {
          label: '不通过',
          type: 'danger',
          onClick(): void {
          }
        }]
    });
    this.selectReasonVisible = false;
  }
  orderCreateAction($event) {
    this.orderCreateMetaCom = null;
  }
}
