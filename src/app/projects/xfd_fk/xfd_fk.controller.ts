import { Injectable } from "@angular/core";
import { LoginBean } from "../hk/bean/LoginBean";
import Dexie from "dexie";
import { XFD_FKDbName } from ".";
import { XfdFxEntityEnum } from "./xfd_fk.EntityEnum";
import { Res } from "../../libs/meta-ui/util/res/res";
import { NzMessageService } from "ng-zorro-antd";
import { success } from "../../libs/meta-ui/util/res/success";
import { err } from "../../libs/meta-ui/util/res/err";
import { Member } from "./entity/Member";
import { MemberStatusEnum } from "./enums/MemberStatus.enum";
import { Order } from "./entity/Order";
import { StorageService } from "app/libs/meta-ui/service/storage.service";
import { OrderStatusEnum } from "./enums/OrderStatus.enum";
import *  as _ from "lodash";
import { ResetRecord } from "./entity/ResetRecord";
import { CardStatusEnum } from "./enums/CardStatus.enum";
import { Card } from "./entity/Card";
import { Get, Post, HkApiController, getKey, postKey } from "../hk/hk.api.controller";
import { RequestOptionsArgs } from "@angular/http";
import { OnlineStrategyService } from "app/libs/meta-ui/service/data-strategy/OnlineStrategy.service";
import { IndexedDbStrategyService } from "app/libs/meta-ui/service/data-strategy/IndexedDbStrategy.service";
import { IDataStrategy } from "app/libs/meta-ui/service/data-strategy/IDataStrategy";
import { MyHttpService } from "app/libs/meta-ui/service/http.service";


@Injectable()
export class XfdFkController {
    public static api = {
        memberCreate: "/xfd_fk/member/create",
        login: '/xfd/user/login',
        disabledCard: "/xfd_fk/disabledCard",
        recharge: '/xfd_fk/recharge',
        rechargeAll: '/xfd_fk/recharge-all'
    }

    // Post(url: string, body) {
    //     console.log(url, body);
    //     switch (url) {
    //         case XfdFkController.api.memberCreate:
    //             this.memberCreate(body);
    //             break;
    //         case XfdFkController.api.login:
    //             return this.login(body);
    //     }
    // }
    Get(url: string, options?: RequestOptionsArgs) {
        if (this.dataStrategy instanceof OnlineStrategyService) {
            return this.myHttp.Get(url, options);
        }
        if (this.dataStrategy instanceof IndexedDbStrategyService) {
            let urlMethods: { url: string, method: string }[] = Reflect.getMetadata(getKey, HkApiController);
            console.log(urlMethods);
            let urlMethod = urlMethods.find(urlMethod => urlMethod.url == url);
            return this[urlMethod.method];
        }
    }
    Post(url: string, body: any, options?: RequestOptionsArgs) {
        if (this.dataStrategy instanceof OnlineStrategyService) {
            return this.myHttp.Post(url, body, options);
        }
        if (this.dataStrategy instanceof IndexedDbStrategyService) {
            let urlMethods: { url: string, method: string }[] = Reflect.getMetadata(postKey, HkApiController.prototype);
            console.log(urlMethods);
            let urlMethod = urlMethods.find(urlMethod => urlMethod.url == url);
            return this[urlMethod.method](body, options);
        }
    }
    @Post(XfdFkController.api.memberCreate)
    async  memberCreate(member: Member) {
        console.log(member);
        let db = await new Dexie(XFD_FKDbName).open();
        let card = new Card();
        let countCard = await db.table(this.getTableName(XfdFxEntityEnum.Card)).count();
        let countMember = await db.table(this.getTableName(XfdFxEntityEnum.Member)).count();
        member.code = _.padStart(++countMember + '', 5, '0');
        card = Object.assign(card,
            {
                cardNo: _.padStart(++countCard + '', 5, '0'),
                cardStatus: CardStatusEnum.Enable,
                merchNo: member.code
            } as Card);
        card = await db.table(this.getTableName(XfdFxEntityEnum.Card)).add(card);
        member = await db.table(this.getTableName(XfdFxEntityEnum.Member)).add(member);
        this.success({ card, member });
    }
    @Post(XfdFkController.api.login)
    async login(loginBean: LoginBean) {
        let db = await new Dexie(XFD_FKDbName).open();
        let admin = await db.table(this.getTableName(XfdFxEntityEnum.User)).where({ userName: loginBean.userName }).first();
        let member = await db.table(this.getTableName(XfdFxEntityEnum.Member)).where({ mobile: loginBean.userName }).first();
        if (member || admin) {
            let role = await db.table(this.getTableName(XfdFxEntityEnum.Role)).where({ roleId: parseInt(admin.roleIds) }).first();
            console.log(role);
            let menus = await db.table(this.getTableName(XfdFxEntityEnum.Menu)).filter(menu => (role.menuIds as string).includes(menu.menuId)).toArray();
            return this.success({ employee: admin, member, menus });
        } else {
            return this.err(400, '用户不存在');
        }
    }
    /**会员充值 */
    @Post('/xfd_fk/recharge')
    async charge(member: Member, options: RequestOptionsArgs) {
        let db = await new Dexie(XFD_FKDbName).open();
        let countOrder = await db.table(this.getTableName(XfdFxEntityEnum.Order)).count();
        let order = new Order();
        order = Object.assign(order, {
            buyMerchCode: member.code,
            buyMerchName: member.name,
            operatorName: this.store.trueUser.userName,
            status: OrderStatusEnum[OrderStatusEnum.SUBMITTED] as any,
            operatorNo: this.store.trueUser.userName,
            actTime: new Date(),
            createTime: new Date(),
            amount: 0,
            orderNo: _.padStart(++countOrder + '', 5, '0')
        } as Order);
        await db.table(this.getTableName(XfdFxEntityEnum.Member)).update(member.id, { amount: options.params['amount'] });
        await db.table(this.getTableName(XfdFxEntityEnum.Order)).add(order);
        return this.success({});
    }

    async chargeAll(amount) {
        let db = await new Dexie(XFD_FKDbName).open();
        let resetRecord = new ResetRecord();
        let members: Member[] = await db
            .table(this.getTableName(XfdFxEntityEnum.Member))
            .where({ memberStatus: MemberStatusEnum[MemberStatusEnum.Enable] })
            .toArray();
        resetRecord = Object.assign(resetRecord, {
            amount,
            operatorName: this.store.trueUser.userName,
            operatorNo: this.store.trueUser.userName,
            relationMemberNames: members.map(member => member.name).join(','),
            createTime: new Date()
        } as ResetRecord);
        await db
            .table(this.getTableName(XfdFxEntityEnum.ResetRecord))
            .add(resetRecord);
        await db
            .table(this.getTableName(XfdFxEntityEnum.Member))
            .where({ memberStatus: MemberStatusEnum.Enable })
            .modify({ amount });
        return this.success({});
    }
    @Post(XfdFkController.api.disabledCard)
    async disabledCard(member: Member) {
        let db = await new Dexie(XFD_FKDbName).open();
        let card = await db
            .table(this.getTableName(XfdFxEntityEnum.Card))
            .update({ merchNo: member.code }, { cardStatus: CardStatusEnum.Disabled });
        this.success({ member, card });
    }


    private getTableName(entityEnum: XfdFxEntityEnum): string {
        return entityEnum.split('.').pop();

    }

    private success(data) {
        return this.to(success(data));
    }
    private err(status: number, errMsg: string) {
        return this.to(err(status, errMsg));
    }

    private to(res: Res) {
        if (res.ok) {
            return res.data;
        } else {
            this.msg.error(res.msg);
            return false;
        }
    }

    constructor(private msg: NzMessageService,
        private store: StorageService,
        private dataStrategy: IDataStrategy, private myHttp: MyHttpService) { }
}