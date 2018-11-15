
/** S 显示  Show*/
export const S = 0b1;
/**C 创建  Create */
export const C = 0b10;
/** U更新  Update*/
export const U = 0b100;
/** Q查询 Query  */
export const Q = 0b1000;
/** D删除 Delete*/
export const D = 0b10000;
/** I信息 Info */
export const I = 0b100000;
export const Aud = 0b100000;

// 操作
export const AC1 = 0b100000000000;
export const AC2 = 0b1000000000000;
export const AC3 = 0b10000000000000;
export const AC4 = 0b100000000000000;
export const AC5 = 0b1000000000000000;



/**
 * 判断是否拥有权限
 *```typescript
let has = checkPower(Q, C | S | U);
console.log(has);   
```
 */
export function checkPower(power: number, value: number | Function, ) {
    if (typeof value == 'function') {
        value = value();
    }
    return !!(power & value as number);
}

