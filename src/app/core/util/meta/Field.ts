import { MetaCom } from "./MetaCom";
import { FieldConfig } from "./FieldConfig";
import { FieldType } from "./types/indext";
import { Valid } from "./Valid";
import { Transform } from "./Transform";
import { Flow } from "./Flow";
import { GroupOptions } from "./Group";
import { ISummary } from "./Summary";

/**
 * queryTemplate
 * 元数据
 */
export class Field {
    /**分组选项 */
    groupOptions?: GroupOptions;
    isPk?: boolean;
    summarys?: ISummary[];
    flow?: { create?: Flow, update?: Flow };
    state?: { create?: string, update?: string };
    id?: number;
    objectCode?: string;
    type?: FieldType;
    dynamicComponent?: any;
    sort?: "DESC" | "ASC";
    options?: { alias: string, value: any }[]
    /**
     * 能力
     * 位操作来附加能力,简化操作
     * power = Show|Query|Update|Create
     */
    power?: number | Function;
    isQuery?: boolean;
    isShow?: boolean;
    isUpdate?: boolean;
    placeholder?: string;
    config?: FieldConfig;
    fieldName?: string;
    recno?: number;
    alias?: string;
    dynamicHtml?: string;
    presetValue?: string;
    displayWidth?: number;
    metaObject?: MetaCom;
    readonly?: boolean;
    isRef?: boolean;
    valid?: Valid;
    transform?: Transform
}

