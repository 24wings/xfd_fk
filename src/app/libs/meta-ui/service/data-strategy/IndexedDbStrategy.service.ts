import { IDataStrategy } from "./IDataStrategy";
import Dexie from "dexie";
import { Injectable } from "@angular/core";
import { QueryParam } from "../../util/stq/QueryParameter";
import { MetaCom } from "../../util/meta/MetaCom";



/**本地数据库策略 
 * 
 * 数据库名称
 * 表名称
 * 多个相同实体的数据库和表名称的维护
*/
@Injectable()
export class IndexedDbStrategyService implements IDataStrategy {
    async entityQuery(metaCom: MetaCom, queryParam: QueryParam) {
        // 1. 检查数据库是否存在
        let db = await new Dexie(metaCom.database).open();
        console.log(`------${metaCom.database}-------`)
        let tableName = metaCom.objectCode.split('.').pop();
        let rows = await db.table(tableName).toArray() as any;
        return { paging: { rows, count: rows.length } }

    }
    async entityInsert(metaCom: MetaCom, dataItem: any) {
        let db = await new Dexie(metaCom.database).open()
        let tableName = metaCom.objectCode.split('.').pop();
        let pk = metaCom.metaFields.find(field => field.isPk);
        delete dataItem[pk.fieldName]
        return db.table(tableName).add(dataItem);

    }
    async entityDelete(metaCom: MetaCom, dataItem) {
        return new Dexie(metaCom.database).open().then(db => {
            let pk = metaCom.metaFields.find(field => field.isPk);
            let tableName = metaCom.objectCode.split('.').pop();
            return db.table(tableName).delete(dataItem[pk.fieldName]);
        })
    }
    async entityUpdate(metaCom: MetaCom, dataItem) {
        return new Dexie(metaCom.database).open().then(db => {
            let tableName = metaCom.objectCode.split('.').pop();
            let pk = metaCom.metaFields.find(field => field.isPk);
            return db.table(tableName).update(dataItem[pk.fieldName], dataItem);
        });
    }
} 