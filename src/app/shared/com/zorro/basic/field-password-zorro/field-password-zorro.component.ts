import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ValidService } from '@core/service/validate.service';
import { StringComSpec } from '@core/util/spec/field/string.comspec';

@Component({
  selector: 'app-field-password-zorro',
  templateUrl: './field-password-zorro.component.html',
  styles: []
})
export class FieldPasswordZorroComponent extends StringComSpec implements OnInit {
  constructor(public validService: ValidService) {
    super(validService)
  }
  ngOnInit() {
  }


}
