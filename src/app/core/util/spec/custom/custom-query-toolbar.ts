import { EventEmitter } from "@angular/core";
import { MetaCom } from "../../meta/MetaCom";

export class CustomQueryToolbarComSpec {
    metaCom: MetaCom;
    queryResult = new EventEmitter<{ rows: any[], count: number }>();
    async query() {

    }
}