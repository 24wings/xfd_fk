import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ValidService } from 'app/libs/meta-ui/service/validate.service';
import { StringComSpec } from '../../../../util/spec/field/string.comspec';

@Component({
  selector: 'app-field-password-zorro',
  templateUrl: './field-password-zorro.component.html',
  styles: []
})
export class FieldPasswordZorroComponent extends StringComSpec implements OnInit {
  passwordVisible: boolean = false;
  constructor(public validService: ValidService) {
    super(validService)
  }
  ngOnInit() {
  }

  security(val: string) {
    return val.replace(/./g, "*")
  }

}
