import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Jsonp, Http, RequestOptionsArgs } from "@angular/http";
import { Location } from "@angular/common";
import { CommonService } from "app/libs/meta-ui/service/common.service";


declare var WeixinJSBridge: any;
@Injectable()
export class ConfigService {
  // 根据ip获取用户地理位置
  // async ipLocalAddress() {
  //   let localAddress: Address = await this.api.Get('/api.ipAddress.go');
  //   return { code: localAddress.data.city_id, name: localAddress.data.city };
  // }
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public http: Http,
    public location: Location,
    public common: CommonService,

  ) { }

  clearObject(obj: Object): void {
    for (let key in obj) {
      if (typeof obj[key] == "object") {
        this.clearObject(obj[key]);
      } else {
        delete obj[key];
      }
    }
  }
}
