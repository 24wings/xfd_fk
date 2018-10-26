

// @Entity()

export abstract class BaseAduitEntity {
    createdBy: string = '系统管理员';
    createdDate: Date = new Date()
    modifiedBy: string = '系统管理员';
    modifiedDate: Date = new Date();
}