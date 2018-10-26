import { MetaCom } from "../../meta/MetaCom";
import { Flow } from "../../meta/Flow";
import { IState } from "../../meta/State";

export class FlowToActionEvent {
    metaCom: MetaCom;
    flow: Flow;
    currentFlowState: IState;
    nextId: any;
}
