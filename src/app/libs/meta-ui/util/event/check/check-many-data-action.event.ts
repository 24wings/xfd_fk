import { CheckDataActionEvent } from "./check-data-action.event";
import { MetaCom } from "../../meta/MetaCom";

export class CheckManyDataAction<T> extends CheckDataActionEvent {
    metaCom: MetaCom;
    data: T
}