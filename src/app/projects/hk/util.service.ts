
/** 获取本地角色权限Ids */
export function getRoleIds(): number[] {
    return localStorage.getItem('employee') ? JSON.parse(localStorage.getItem('employee')).roleIds.split(',') : [];
}
export function checkDev(): boolean {
    return !!(getRoleIds().find(id => id == 100));
}
export function checkAdmin(): boolean {
    return !!(getRoleIds().find(id => id == 101));
}
export function checkUser(): boolean {
    return !!(getRoleIds().find(id => id == 102));
}


