import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[dynamic-editor-host]',
})
export class EditorDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
