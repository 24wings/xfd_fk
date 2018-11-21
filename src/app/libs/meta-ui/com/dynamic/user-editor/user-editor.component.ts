import { Component } from "@angular/core";
import { MetaEditorComponent } from "../../meta-object/meta-editor/meta-editor.component";

@Component({
    selector: 'user-editor',
    templateUrl: './user-editor.component.html',
    styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent extends MetaEditorComponent {

    getField(fieldName: string) {
        return this.metaCom.metaFields.find(field => field.fieldName == fieldName);
    }
    async changeProp($event, prop) {
        if (prop == 'orgId') {
            console.warn(prop, $event);
            let field = this.getField('roleIds');
            if (field) {
                field.metaObject.data.presetConditions = [{ field: 'orgId', compare: '=', value: $event, andOr: 'and' }];
            }
        }
        await super.changeProp($event, prop);

    }
    async changeSelectProp($event, prop) {
        if (prop == 'orgId') {
            console.warn(prop, $event);
            let field = this.getField('roleIds');
            if (field) {
                field.metaObject.data.presetConditions = [{ field: 'orgId', compare: '=', value: $event, andOr: 'and' }];
            }
        }
        await super.changeSelectProp($event, prop)
    }
    onPropChange(fieldName: string, value) {
        this.newDataItem[fieldName] = value;
    }
    ngOnInit() {
        console.log(this.selectedData);
    }
} 