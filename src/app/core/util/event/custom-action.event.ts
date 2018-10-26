import { MetaCom } from "../meta/MetaCom";

export class CustomActionEvent<T>{
    metaCom?: MetaCom;
    multi: string;
    data: T[];
    config: any;
    eventName: string;
}