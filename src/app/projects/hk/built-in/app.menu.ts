import 'reflect-metadata';
import { C, U, D, Q, AC1 } from 'app/libs/meta-ui/util/meta/Power';
import { UserManage } from 'app/blueprint/rbac/meta/UserManage';
import { RoleManage } from 'app/blueprint/rbac/meta/RoleManage';
import { AirCompanyManage } from '../meta/AirCompanyManage';
import { CountryMange } from '../meta/CountryManage';
import { CityManage } from '../meta/CityManager';
import { AirportManage } from '../meta/AirportManage';
import { FlightManage } from '../meta/FlightManage';
import { MemberManage } from '../meta/MemberManage';
import { MemberInfo } from '../meta/MemberInfo';
import { OrderVerify } from '../meta/OrderVerify';
import { ProductBuy } from '../meta/ProductBuy';
import { UnsubmitOrderQuery } from '../meta/Unsubmit-Order.query';
import { OrgManage } from 'app/blueprint/rbac/meta/OrgManage';
import { MenuManage } from 'app/blueprint/rbac/meta/MenuManage';
import { ProductManage } from '../meta/ProductManage';


export interface MenuMetaCom {
    menuId: number;
    text: string;
    parentId: number,
    menuCode?: number;
    link?: string, metaCom?: any;
}
const MenuLink = '/hk/admin/user/dynamic-menu';
/**
 * 开发者菜单
 */
export const DevMenu: MenuMetaCom[] = [
    // 系统设置
    { menuId: 100, text: "系统设置", parentId: 0 },
    // 开发者管理
    { menuId: 101, text: "用户管理", parentId: 100, link: MenuLink + '/user', metaCom: UserManage },
    { menuId: 105, text: "用户添加", parentId: 101, menuCode: C, },
    { menuId: 106, text: "用户更新", parentId: 101, menuCode: U, },
    { menuId: 107, text: "用户删除", parentId: 101, menuCode: D, },
    { menuId: 108, text: "用户查询", parentId: 101, menuCode: Q, },
    // 组织
    { menuId: 102, text: "组织管理", parentId: 100, link: MenuLink + '/org', metaCom: OrgManage },
    { menuId: 110, text: "组织添加", parentId: 102, menuCode: C },
    { menuId: 111, text: "组织更新", parentId: 102, menuCode: U },
    { menuId: 112, text: "组织删除", parentId: 102, menuCode: D },
    { menuId: 113, text: "组织查询", parentId: 102, menuCode: Q },
    //角色
    { menuId: 103, text: "角色管理", parentId: 100, link: MenuLink + '/role', metaCom: RoleManage },
    { menuId: 150, text: "角色添加", parentId: 103, menuCode: C },
    { menuId: 151, text: "组织更新", parentId: 103, menuCode: U },
    { menuId: 152, text: "组织删除", parentId: 103, menuCode: D },
    { menuId: 153, text: "组织查询", parentId: 103, menuCode: Q },
    //  菜单
    { menuId: 104, text: "菜单管理", parentId: 100, link: MenuLink + '/menu', metaCom: MenuManage },
    { menuId: 160, text: "菜单添加", parentId: 104, menuCode: C },
    { menuId: 161, text: "菜单更新", parentId: 104, menuCode: U },
    { menuId: 162, text: "菜单删除", parentId: 104, menuCode: D },
    { menuId: 163, text: "菜单查询", parentId: 104, menuCode: Q },
]


export const AdminMenu: MenuMetaCom[] = [
    ///基本设置
    { menuId: 120, text: "基本设置", parentId: 0, },
    { menuId: 121, text: "航司管理", parentId: 120, link: MenuLink + '/air-company', metaCom: AirCompanyManage },
    { menuId: 122, text: "航司添加", parentId: 121, menuCode: C },
    { menuId: 123, text: "航司更新", parentId: 121, menuCode: U },
    { menuId: 124, text: "航司删除", parentId: 121, menuCode: D },
    { menuId: 125, text: "航司查询", parentId: 121, menuCode: Q },
    //国家管理
    { menuId: 130, text: "国家管理", parentId: 120, link: MenuLink + '/country-manage', metaCom: CountryMange },
    { menuId: 131, text: "国家添加", parentId: 130, menuCode: C },
    { menuId: 132, text: "国家修改", parentId: 130, menuCode: U },
    { menuId: 133, text: "国家删除", parentId: 130, menuCode: D },
    { menuId: 134, text: "国家查询", parentId: 130, menuCode: Q },
    //城市管理
    { menuId: 140, text: "城市管理", parentId: 120, link: MenuLink + '/city-manage', metaCom: CityManage },
    { menuId: 141, text: "城市添加", parentId: 140, menuCode: C },
    { menuId: 142, text: "城市更新", parentId: 140, menuCode: U },
    { menuId: 143, text: "城市删除", parentId: 140, menuCode: D },
    { menuId: 144, text: "城市查询", parentId: 140, menuCode: Q },
    // 机场管理
    { menuId: 170, text: "机场管理", parentId: 120, link: MenuLink + '/airport-manage', metaCom: AirportManage },
    { menuId: 171, text: "机场添加", parentId: 170, menuCode: C },
    { menuId: 172, text: "机场更新", parentId: 170, menuCode: U },
    { menuId: 173, text: "机场删除", parentId: 170, menuCode: D },
    { menuId: 174, text: "机场查询", parentId: 170, menuCode: Q },
    // 航班管理
    { menuId: 180, text: "航班管理", parentId: 120, link: MenuLink + '/flight-manage', metaCom: FlightManage },
    { menuId: 181, text: "机场添加", parentId: 180, menuCode: C },
    { menuId: 182, text: "机场更新", parentId: 180, menuCode: U },
    { menuId: 183, text: "机场删除", parentId: 180, menuCode: D },
    { menuId: 184, text: "机场查询", parentId: 180, menuCode: Q },

    { menuId: 199, text: "资源管理", parentId: 0, },
    //会员管理
    { menuId: 200, text: "会员管理", parentId: 199, link: MenuLink + '/member-manage', metaCom: MemberManage },
    { menuId: 201, text: "会员添加", parentId: 200, menuCode: C },
    { menuId: 202, text: "会员更新", parentId: 200, menuCode: U },
    { menuId: 203, text: "会员删除", parentId: 200, menuCode: D },
    { menuId: 204, text: "会员查询", parentId: 200, menuCode: Q },
    // {menuId:20}
    // 会员详情
    { menuId: 209, text: "会员详情", parentId: 120, link: MenuLink + '/member-info', metaCom: MemberInfo },
    { menuId: 220, text: "订单管理", parentId: 0 },
    { menuId: 221, text: "订单审核", parentId: 220, link: MenuLink + '/order-verify', metaCom: OrderVerify },
    { menuId: 223, text: "订单更新", parentId: 221, menuCode: U },
    //订单审批
];

export const UserMenu: MenuMetaCom[] = [
    // 系统设置
    { menuId: 190, text: "产品", parentId: 0 },
    { menuId: 191, text: "产品管理", parentId: 190, link: MenuLink + '/prod-manage', metaCom: ProductManage },
    { menuId: 192, text: "产品添加", parentId: 191, menuCode: C },
    { menuId: 193, text: "产品更新", parentId: 191, menuCode: U },
    { menuId: 194, text: "产品查询", parentId: 191, menuCode: Q },
    { menuId: 195, text: "产品删除", parentId: 191, menuCode: D },
    { menuId: 196, text: "产品审核", parentId: 191, menuCode: AC1 },

];

export const AgentMenu: MenuMetaCom[] = [
    { menuId: 300, text: "机票", parentId: 0 },
    { menuId: 301, text: "购买机票", parentId: 300, link: MenuLink + '/prod-buy', metaCom: ProductBuy },
    { menuId: 302, text: "购买", parentId: 301, menuCode: AC1 },
    { menuId: 303, text: "我的机票", parentId: 300, link: MenuLink + '/Unsubmit-order', metaCom: UnsubmitOrderQuery },
    { menuId: 304, text: "查询", parentId: 303, menuCode: Q },

];
/** 内置所有菜单 */
export function loadBuiltInMenus(): MenuMetaCom[] {
    return DevMenu.concat(...UserMenu).concat(...AdminMenu).concat(...AgentMenu)
}
export function loadDevMenus() {
    return DevMenu.concat(UserMenu).concat(AdminMenu)
}

export function loadAdminMenus() {
    return AdminMenu.concat(UserMenu);
}

export function loadAgentMenus() {
    return AgentMenu;
}


