import { ValidStatusEnum } from "../../../meta/ValidStatus.enum";

export interface IValidateAblity {
    validStatus: ValidStatusEnum;
    errMsg: string;
    validAfterValueChange: () => any
}