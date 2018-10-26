import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ValidService } from '@core/service/validate.service';
import { SelectComSpec } from '@core/util/spec/field/select.comspec';
@Component({
  selector: 'app-field-select',
  templateUrl: './field-select-zorro.component.html',
  styles: []
})
export class FieldSelectZorroComponent extends SelectComSpec implements OnInit {

  ngOnInit(): void {
    if (this.options.length > 0 && !this.value) {
      this.value = this.options[0].value;
    }


  }
  constructor(public validService: ValidService) {
    super(validService)
  }

}