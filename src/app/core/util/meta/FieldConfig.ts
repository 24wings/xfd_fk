
export class FieldConfig {
    enum?: any;
    required?: boolean;
    $ref?: any;
    /**
     * 数据库数据类型
     * 如果 $ref  引用User
     * 而 databaseType 数据库类型是 Number
     * 则提交创建更新的时候显示出来
     * 
     */
    databaseType?: any;
    dateFormat?: string;
    dateMode?: 'decade' | 'year' | 'month' | 'date' | 'time';
    many?: boolean;
    searchKey?: string;
}