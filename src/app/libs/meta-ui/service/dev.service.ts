import { Injectable } from '@angular/core';
import { MyHttpService } from './http.service';
import { CommonService } from 'app/libs/meta-ui/service/common.service';
import { Menu } from '@delon/theme';



@Injectable()
export class DevService {
    api = {
        menuDetailByMenuCode: '/api/menu/getByMenuCode',
        metaObjectDataUpdate: '/api/metaObject/data/update',
        metaObjectDelete: '/api/metaObject/delete',
        metaObjectDataPage: '/api/metaObject/data/page',
        metaObjectList: '/api/metaObject/list',
        metaObjectDetail: '/api/metaObject/detail',
        metaObjectCreate: '/api/metaObject/create',
        metaObjectUpdate: '/api/metaObject/update',
        sqlDetail: '/api/design/field',
        /**
        * Post 
        * username ,password
        */
        login: '/dev/login',
        syncMenu: '/dev/menu/sync',
        syncRole: '/dev/role/sync',
        syncOrg: '/dev/org/sync',
        syncUser: '/dev/user/sync'

    }
    menuSync(menus: Menu[]) {
        return this.http.Post(this.api.syncMenu, menus);
    }



    metaObjectDelete(objectCode: string, data) {
        return this.http.Post(this.api.metaObjectDelete, data, { params: { objectCode } });
    }

    devLogin(userName: string, password: string) {
        return this.http.Post(this.api.login, { userName, password });
    }
    constructor(public http: MyHttpService,
        public common: CommonService) { }

}
