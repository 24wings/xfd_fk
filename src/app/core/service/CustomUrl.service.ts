import { Injectable } from "@angular/core";
import { RequestOptionsArgs } from "@angular/http";
import { MyHttpService } from "./http.service";

@Injectable()
export class CustomUrlService {
    Get(url: string, options?: RequestOptionsArgs) {
        return this.myHttp.Get(url, options);
    }
    Post(url: string, body: any, options?: RequestOptionsArgs) {
        return this.myHttp.Post(url, body, options);
    }
    constructor(public myHttp: MyHttpService) { }
}