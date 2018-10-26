import { BasicComspce } from "./basic.comspec";
import { Select } from "../../meta/types/Select";
import { IGetAlias } from "../basic/ablity/IGetAlias.ablity";
import { Field } from "../../meta/Field";

export abstract class SelectComSpec extends BasicComspce<Select<any>> implements IGetAlias {
    options: { alias: string, value: any }[] = [];
    getAlias(val) {
        let option = this.options.find(op => op.value == val);
        return option ? option.alias : val;
    }
    __value__: any
    set field(field: Field) {
        this.__field__ = field;
        this.options = field.options;
        if (this.options.length > 0) {
            this.__value__ = this.options[0].value;
        }
    }
    get field() {
        return this.__field__;
    }

}