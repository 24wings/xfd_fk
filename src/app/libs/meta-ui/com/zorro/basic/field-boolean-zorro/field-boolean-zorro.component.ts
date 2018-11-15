import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ValidService } from 'app/libs/meta-ui/service/validate.service';
import { BooleanComSpec } from '../../../../util/spec/field/boolean.comspec';

@Component({
  selector: 'app-field-boolean',
  templateUrl: './field-boolean-zorro.component.html',
  styles: []
})
export class FieldBooleanZorroComponent extends BooleanComSpec implements OnInit {

  constructor(public validService: ValidService) { super(validService) }

  ngOnInit() {
  }

}
