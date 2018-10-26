import { MemberTypeEnum } from '../enum/MemberType.enum';
import { AuditStatusEnum } from '../enum/AuditStatus.enum';

/**
 * @author liaoweimin
 * @version 1.0
 * @created 2018/9/22 11:19:13
 */
/**会员信息*/
export class Member {
    /**会员Id*/
    id: number;
    /**代码（前缀+会员流水号,前缀:供应商S，采购商B，个人C，流水号8位)*/
    code: string;
    /**名称*/
    name: string;
    /**手机号(用来收验证码)*/
    mobile: string;
    /**负责人姓名*/
    principal: string;
    /**联系地址*/
    address: string;
    /**银行账号*/
    bankInfo: string;
    /**企业税号*/
    taxCode: string;
    /**会员类型*/
    memberType: MemberTypeEnum | any;
    /**审核状态*/
    memberStatus: AuditStatusEnum | any;

    /**前端字段 */
    password?: string | any;
    /** 前端字段 */
    orgId?: number | any;
}