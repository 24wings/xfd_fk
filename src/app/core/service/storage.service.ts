import { Injectable } from "@angular/core";
import { Member } from "app/projects/hk/entity/Member";
import { Menu } from "app/blueprint/rbac/entity/Menu";
import { User } from "app/blueprint/rbac/entity/User";
@Injectable()
export class StorageService {
  set member(member: Member) {
    localStorage.setItem('member', JSON.stringify(member));
  }
  set name(name: string) {
    localStorage.setItem("name", name);
  }
  set token(str: string) {
    localStorage.setItem('token', str);
  }
  get token() {
    return localStorage.getItem('token');

  }
  get name() {
    return localStorage.getItem("name");
  }

  get dev() {
    return localStorage.getItem("dev") ? JSON.parse(localStorage.getItem("dev")) : false;
  }
  set shop_user_name(user_name: string) {
    localStorage.setItem("shop_user_name", user_name);
  }
  get shop_user_name() {
    return localStorage.getItem("shop_user_name");
  }
  get menuList(): Menu[] {
    return localStorage.getItem("menu-list")
      ? JSON.parse(localStorage.getItem("menu-list"))
      : [];
  }
  set menuList(menus: Menu[]) {
    localStorage.setItem("menu-list", JSON.stringify(menus));
  }
  get gcId() {
    return sessionStorage.getItem('gcId') ? parseInt(sessionStorage.getItem('gcId')) : 0
  }
  set gcId(gcId: number) {
    sessionStorage.setItem('gcId', gcId + '')
  }
  set trueUser(user: User) {
    localStorage.setItem("employee", JSON.stringify(user))
  }
  get trueUser(): User {
    return localStorage.getItem("employee") ? JSON.parse(localStorage.getItem("employee")) : {};
  }

  set lockPassword(lockPassword: string) {
    sessionStorage.setItem("lock", lockPassword)
  }

  get lockPassword() {
    return sessionStorage.getItem("lock")
  }
  constructor() { }
}
