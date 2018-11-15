import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import { Router } from "@angular/router";
interface LoginOption {
  label: string;
  value: {
    url: string;
  };
}
import { ReuseTabService } from "@delon/abc";
import { SettingsService, Menu } from "@delon/theme";
import { StorageService } from "app/libs/meta-ui/service/storage.service";
import { MyHttpService } from "app/libs/meta-ui/service/http.service";
import { DevService } from "app/libs/meta-ui/service/dev.service";
import { UserService } from "app/libs/meta-ui/service/user.service";
import { IDataStrategy } from "app/libs/meta-ui/service/data-strategy/IDataStrategy";
import { User } from "app/blueprint/rbac/entity/User";
import { Member } from "../../entity/Member";
import { HkApiController } from "../../hk.api.controller";
import { hkApi } from "../../hk.api";
@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  username: string = "";
  password: string = "";
  selectedLoginOption: LoginOption;
  isElectron: boolean = false;
  loading: boolean = false;


  constructor(
    public router: Router,
    public storage: StorageService,
    public http: MyHttpService,
    public lowHttp: Http,
    public dev: DevService,
    public user: UserService,
    public reuseTab: ReuseTabService,
    public setting: SettingsService,
    private dataStrategy: IDataStrategy,
    private myHttp: MyHttpService,
    private hkService: HkApiController
  ) { }



  async ngOnInit() {

  }
  async login() {
    if (!this.loading) {
      this.loading = true;
      let result: { employee: User, menus: Menu[], token: string, roleNames: string, member: Member } = await this.hkService.Post(hkApi.login, { userName: this.username, password: this.password }) as any;
      this.loading = false;
      if (result) {
        this.storage.trueUser = result.employee as User;
        // this.storage.trueUser = result.employee;
        this.storage.menuList = result.menus as any;
        this.storage.token = result.token;
        if (result.member)
          this.storage.member = result.member as any;

        this.setting.setUser({ name: result.employee.name, email: result.roleNames })
        this.reuseTab.clear()
        this.router.navigateByUrl('/hk/admin/user/dynamic-menu/org')
      }
    }
  }


}
