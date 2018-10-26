import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ValidService } from '@core/service/validate.service';
import { DateComSpec } from '@core/util/spec/field/date.comspec';

@Component({
  selector: 'app-field-date',
  templateUrl: './field-date-zorro.component.html',
  styles: []
})
export class FieldDateZorroComponent extends DateComSpec implements OnInit {
  dateFormat = 'yyyy/MM/dd';
  constructor(public validService: ValidService) { super(validService); }

  ngOnInit() {
  }
  submitChange() {
    this.valueChange.emit(this.value);
  }

}
