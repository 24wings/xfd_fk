import { Injectable } from "@angular/core";
import { MyHttpService } from "@core/service/http.service";
import { CommonService } from "@core/service/common.service";
import { MetaCom } from "@core/util/meta/MetaCom";

@Injectable()
export class ActionService {
    do(action: number, metaCom: MetaCom, data?) {

    }

    query() {

    }
    create
    /**
     * 默认事件处理器
     * @param $event 
     */
    defaultActionHandle($event) {

    }
    constructor(public http: MyHttpService, public common: CommonService) { }
}