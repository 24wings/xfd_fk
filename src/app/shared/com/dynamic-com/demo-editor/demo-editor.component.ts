import { Component, ChangeDetectorRef, Input } from "@angular/core";
import { MetaEditorComponent } from "@shared/com/meta-object/meta-editor/meta-editor.component";
import { ValidService } from "@core/service/validate.service";
import { NzMessageService } from "ng-zorro-antd";
import { MyHttpService } from "@core/service/http.service";
import { CustomUrlService } from "@core/service/CustomUrl.service";
import { IDataStrategy } from "@core/service/data-strategy/IDataStrategy";
import { ModeEnum } from "@core/util/meta/Mode.enum";

@Component({
    selector: 'demo-editor',
    templateUrl: './demo-editor.component.html',
    styleUrls: [],

})
export class DemoEditorComponent extends MetaEditorComponent {
    ModeEnum = ModeEnum;
    valueObject = {};
    @Input() state = ModeEnum.Create


    constructor(private valid: ValidService,
        public msg: NzMessageService,
        public http: MyHttpService,
        public ref: ChangeDetectorRef,
        public dataStrategy: IDataStrategy,
        public customUrl: CustomUrlService
    ) {
        super(valid, msg, http, ref, dataStrategy, customUrl)
    }

    getField(fieldName: string) {
        return this.metaCom.metaFields.find(field => field.fieldName == fieldName);
    }

    count() {

    }
}