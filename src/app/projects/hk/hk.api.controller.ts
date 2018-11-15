// import { Injectable } from "@angular/core";
// import { RequestOptionsArgs } from "@angular/http";
import { LoginBean } from "./bean/LoginBean";
import Dexie from "dexie";
import { HkDbName } from ".";
import { EntityEnum } from "app/entity.enum";
import { success } from "app/libs/meta-ui/util/res/success";
import { RequestOptionsArgs } from "@angular/http";
import { IDataStrategy } from "app/libs/meta-ui/service/data-strategy/IDataStrategy";
import { OnlineStrategyService } from "app/libs/meta-ui/service/data-strategy/OnlineStrategy.service";
import { MyHttpService } from "app/libs/meta-ui/service/http.service";
import { IndexedDbStrategyService } from "app/libs/meta-ui/service/data-strategy/IndexedDbStrategy.service";
import { Injectable } from "@angular/core";
import { hkApi } from "./hk.api";

export const getKey = Symbol("get");
export const postKey = Symbol("post")

export function Get(url: string) {
    return (target, prop, descriptor: PropertyDescriptor) => {
        let urlMethodKeyPair: { url: string, method: string, }[] = Reflect.getMetadata(getKey, target);
        if (!urlMethodKeyPair) urlMethodKeyPair = [];
        urlMethodKeyPair.push({ url, method: prop });
        Reflect.defineMetadata(getKey, urlMethodKeyPair, target);
    }
}
export function Post(url: string) {
    return (target, prop, descriptor: PropertyDescriptor) => {
        let urlMethodKeyPair: { url: string, method: string, }[] = Reflect.getMetadata(postKey, target);
        if (!urlMethodKeyPair) urlMethodKeyPair = [];
        urlMethodKeyPair.push({ url, method: prop });
        Reflect.defineMetadata(postKey, urlMethodKeyPair, target);
    }
}


@Injectable()
export class HkApiController {
    @Post(hkApi.login)
    async  login(loginBean: LoginBean) {
        console.log(loginBean)
        if (loginBean.userName && loginBean.password) {
            let db = await new Dexie(HkDbName).open()
            let userTalble = db.table(EntityEnum.User.split('.').pop());
            let user = await userTalble.get({ userName: loginBean.userName });
            // let admin =await 
            return success({ user });
        } else {
            // return err()
        }
        return new Promise(resolve => resolve('hello'))
    }

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

    constructor(
        private dataStrategy: IDataStrategy,
        private myHttp: MyHttpService
    ) {

    }

}
// let ctrl = new HkApiController();
// ctrl.login({ userName: '123', password: '123' });