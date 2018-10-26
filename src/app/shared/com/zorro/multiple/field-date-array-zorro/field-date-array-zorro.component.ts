import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ValidService } from '@core/service/validate.service';
import { DateArrComSpec } from '@core/util/spec/field/multiple/date-arr.comspec';

@Component({
  selector: 'app-field-date-array-zorro',
  templateUrl: './field-date-array-zorro.component.html',
  styles: []
})
export class FieldDateArrayZorroComponent extends DateArrComSpec implements OnInit {

  showCalander: boolean = false;
  selectedDate: Date = new Date();
  get displayStr() { return '已选择了日期:' + this.__value__.map(d => d.format('yyyy-MM-dd')).join(',') }
  clearSelectedDt(i: number) {
    this.value.splice(i, 1);
  }
  onValueChange($event) {
    if (!this.value) {
      this.value = []
    }
    this.value = this.value.concat($event);
    this.valueChange.emit(this.value);
  }
  constructor(public validService: ValidService) { super(validService) }
  ngOnInit() {
  }

}
