import { CheckDataActionEvent } from "./check-data-action.event";
import { MetaCom } from "../../meta/MetaCom";

export class CheckOneDataAction<T> extends CheckDataActionEvent {
    metaCom: MetaCom;
    data: T;
    checked: boolean;
}