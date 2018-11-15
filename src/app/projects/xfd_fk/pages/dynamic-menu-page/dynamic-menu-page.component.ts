import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { StorageService } from '@core/service/storage.service';
import { CommonService } from '@core/service/common.service';
import { IDataStrategy } from '@core/service/data-strategy/IDataStrategy';
import { MyHttpService } from '@core/service/http.service';
import { MetaCom } from '@core/util/meta/MetaCom';
import { AppConfig } from 'app/app.config';
import { getMetaNotify } from '@core/util/meta/IMetaNotify';
import { getMetaEntity } from '@core/util/meta/MetaEntity';
import { ModeEnum } from '@core/util/meta/Mode.enum';
import { CustomActionEvent } from '@core/util/event/custom-action.event';
import { Order } from 'app/projects/hk/entity/Order';
import { EntityEnum } from 'app/entity.enum';
import { MsgNotify } from 'app/projects/hk/meta/MsgNotify';
import { MsgTypeEnum } from 'app/projects/hk/enum/MsgType.enum';
import { loadBuiltInMenus } from '../../bulit-in/app.menu';
import { XFD_FKDbName } from '../..';
import { Rules } from '@core/util/regexp';
import { Member } from '../../entity/Member';
import { XfdFkController } from '../../xfd_fk.controller';
import { MemberStatusEnum } from '../../enums/MemberStatus.enum';
import { C, U, D, Q } from '@core/util/meta/Power';
import { MetaObjectComponent } from 'app/libs/meta-ui/com/meta-object/meta-object.component';


@Component({
  selector: 'app-dynamic-menu-page',
  templateUrl: './dynamic-menu-page.component.html',
  styles: []
})
export class DynamicMenuPageComponent implements OnInit {
  @ViewChild("metaObjectComponent") metaObjectComponent: MetaObjectComponent;

  chargeAmount: number = 0;
  chargeAllModalVisible: boolean = false;
  chargeAllAmount: number = 0;
  chargeModalVisible: boolean = false;
  disabledCardModalVisible: boolean = false;

  rmbFormmatter = Rules.pipe.formatterRmb
  rmbParser = Rules.pipe.parserRmb;
  chargeMember: Member;
  // 显示情况
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
    private myHttp: MyHttpService,
    private xfdService: XfdFkController,
    private msgService: NzMessageService
  ) {

    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        let params = this.route.snapshot.queryParams;
        if (params.viewType == 'info' && params.dataId && params.viewName) {
          console.log(this.appConfig.registerMsgNotifyFactorys)
          let metas = this.appConfig.registerMsgNotifyFactorys.filter(notitfyclass => getMetaNotify(notitfyclass).viewName == params.viewName).map(notifyClass => getMetaEntity(notifyClass));
          let metaObject = metas[0];
          // metaObject.data.prs = { id: params.dataId };
          this.metaObject = metaObject;
          this.metaObject.database = XFD_FKDbName;
          this.metaObject.defaultMode = ModeEnum.Update;
          console.log(this.metaObject)
        }

      }
    })
  }
  ngOnInit() {
    let menus = loadBuiltInMenus();
    let activeMetaCom = menus.find(menu => menu.link ? new RegExp(menu.link, 'g').test(this.router.url) : false);
    if (activeMetaCom) {
      this.metaObject = getMetaEntity(activeMetaCom.metaCom);
      this.metaObject.database = XFD_FKDbName;
      let queryParam = this.route.snapshot.queryParams;
      if (this.route.snapshot.fragment) {
        this.metaObject.defaultMode = this.route.snapshot.fragment as ModeEnum;
        // this.metaObject.data.presetObject = queryParam;
      }
      let powers = this.store.menuList.filter(menu => menu.parentId == activeMetaCom.menuId).map(menu => menu.menuCode);

      if (powers && powers.length > 0)
        this.power = powers.reduce((pre, after) => pre | after);
      // alert(JSON.stringify(this.metaObject))
      if (this.metaObject.power) {
        this.power = this.metaObject.power;
        // alert(this.power)
      } else {
        let menus = loadBuiltInMenus();
        let activeMetaCom = menus.find(menu => menu.link ? new RegExp(menu.link, 'g').test(this.router.url) : false);
        let powers = this.store.menuList.filter(menu => menu.parentId == activeMetaCom.menuId).map(menu => menu.menuCode);
        if (powers && powers.length > 0)
          this.power = powers.reduce((pre, after) => pre | after);
      }


    }
    // this.power = C | U | Q | D;
  }

  doAction($event: { action: { checkPower: number, eventName }, data: any[], metaObject: MetaCom }) {
    if ($event instanceof CustomActionEvent) {
      if ($event.eventName == 'charge') {
        this.createCustomButtonModal($event);
      } else if ($event.eventName == 'all-charge') {
        this.chargeAll()
      } else if ($event.eventName == 'disabled-card') {
        this.disabledCard($event)
      } else if ($event.eventName == "fee-member") {
        this.metaObjectComponent.query({ amount: { $lt: 0 } });
      } else if ($event.eventName == 'all-member') {
        this.metaObjectComponent.query({});
      } else if ($event.eventName == 'reset') {
        // alert('重置');
        this.reset($event);
      }
    }
  }
  reset($event) {
    console.log($event);
    let member: Member = $event.data[0];
    this.modalService.confirm({
      nzTitle: '确认重置用户<span style="color:red">' + member.name + '</span>的金额吗?',
      nzContent: '<b>请检查数据</b>',
      nzOnOk: async () => {
        await this.xfdService.Post('/xfd_fk/reset', $event.data[0], { params: { actorName: this.store.trueUser.userName } });
        await this.metaObjectComponent.query({});
      }
    });
  }

  disabledCard($event: { action: { checkPower: number, eventName }, data: any[], metaObject: MetaCom }) {
    this.modalService.confirm({
      nzTitle: '<i>确认禁用卡吗?</i>',
      nzContent: '<b>请检查数据</b>',
      nzOnOk: () => this.xfdService.Post(XfdFkController.api.disabledCard, $event.data[0], { params: { actorName: this.store.trueUser.userName } })
    });
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
    } as MsgNotify));

  }
  /***充值会员 */
  createCustomButtonModal($event: { action: { checkPower: number }, data: any[], metaObject: MetaCom }) {
    this.chargeMember = $event.data[0];
    if (this.chargeMember.memberStatus == MemberStatusEnum.Disabled) {
      return this.msgService.warning("禁用会员无法充值")
    }
    this.chargeModalVisible = true;

  }
  orderCreateAction($event) {
    this.orderCreateMetaCom = null;
  }


  async charge() {
    if (this.chargeAmount < 0) {
      return this.modalService.confirm({
        nzTitle: '充值金额不小于0',
        // nzContent: '全员充值将会将所有人的金额重置到会员分组的金额',
        nzOnOk: () => null
      });
    }
    await this.xfdService.Post(XfdFkController.api.recharge, this.chargeMember, { params: { amount: this.chargeAmount, actorName: this.store.trueUser.userName } });
    await this.metaObjectComponent.query({});
  }
  async chargeAll() {
    this.modalService.confirm({
      nzTitle: '确认全员充值?',
      nzContent: '全员充值将会将所有人的金额重置到会员分组的金额',
      nzOnOk: async () => {
        await this.xfdService.Post(XfdFkController.api.rechargeAll, {}, { params: { amount: this.chargeAllAmount, actorName: this.store.trueUser.userName } });
        await this.metaObjectComponent.query();
      }
    });

  }
}
