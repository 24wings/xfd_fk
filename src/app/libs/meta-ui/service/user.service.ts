import { Injectable } from '@angular/core';
import { MyHttpService } from './http.service';
import { CommonService } from 'app/libs/meta-ui/service/common.service';
import { StorageService } from './storage.service';


@Injectable()
export class UserService {
    api = {
        login: '/user/login',
    }
    constructor(public http: MyHttpService,
        public storage: StorageService,
        public comonn: CommonService
    ) {

    }

    async userLogin(userName: string, password: string) {
        return this.http.Post(this.api.login, { userName, password });
    }


}
