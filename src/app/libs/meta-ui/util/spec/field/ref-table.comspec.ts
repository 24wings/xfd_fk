import { BasicComspce } from "./basic.comspec";
import { Output, EventEmitter } from "@angular/core";
export abstract class RefTableComSpec extends BasicComspce<any>  {
    count: number = 0;
    __dataSet__: any[] = []
    set dataSet(dataSet: any[]) {
        this.__dataSet__ = dataSet;
        if (Array.isArray(this.__dataSet__)) {
            if (this.__dataSet__.length > 0) {
                this.__dataSet__[0].checked = true;
            }
        }
    }
    get dataSet() {
        return this.__dataSet__;
    }
    onQuery = new EventEmitter();

}  