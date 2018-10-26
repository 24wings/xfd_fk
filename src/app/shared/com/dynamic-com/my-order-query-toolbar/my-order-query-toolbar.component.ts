import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderStatusEnum } from 'app/projects/hk/enum/OrderStatus.enum';
import { getAlias } from '@core/util/meta/alias';

@Component({
  selector: 'my-order-query-toolbar',
  templateUrl: './my-order-query-toolbar.component.html',
  styleUrls: ['./my-order-query-toolbar.component.css']
})
export class MyOrderQueryToolbarComponent implements OnInit {
  value: string;
  options = getAlias(OrderStatusEnum);
  @Output() onAction = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

}
