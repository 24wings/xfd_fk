import { Valid } from "../../../meta/Valid";

export interface IBeforeDelete {
    beforeDelete?: (dataItem: any) => { ok: boolean, errMsg };
}