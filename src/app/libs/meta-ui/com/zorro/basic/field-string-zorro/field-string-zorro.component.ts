import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ValidService } from '../../../../service/validate.service';
import { StringComSpec } from '../../../../util/spec/field/string.comspec';

@Component({
  selector: 'app-field-string-zorro',
  templateUrl: './field-string-zorro.component.html',
  styles: []
})
export class FieldStringZorroComponent extends StringComSpec implements OnInit {
  constructor(public valid: ValidService) { super(valid) }
  ngOnInit() {
  }

}
