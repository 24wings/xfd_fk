import { analyzeAndValidateNgModules } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { QueryParam } from "../../util/stq/QueryParameter";
import { MetaCom } from "../../util/meta/MetaCom";
/**数据策略类 */
@Injectable()
export class IDataStrategy {
    entityQuery(metaCom: MetaCom, queryParameter: QueryParam): Promise<{ paging: { count: number, rows: any[] } }> {
        return null;
    }
    entityUpdate(metaCom: MetaCom, data: any): Promise<any> {
        return null;
    }
    entityInsert(metaCom: MetaCom, data: any): Promise<{ paging: {} }> {
        return null;
    }
    entityDelete(metaCom: MetaCom, data: any): Promise<any> {
        return null;
    }
}

