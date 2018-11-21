import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StringComSpec } from '../../../../util/spec/field/string.comspec';
import { ValidService } from 'app/libs/meta-ui/service/validate.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'ic-card-reader',
  templateUrl: './ic-card-reader.component.html',
  styleUrls: ['./ic-card-reader.component.css']
})
export class IcCardReaderComponent extends StringComSpec implements OnInit {
  constructor(private valid: ValidService, private httpClient: HttpClient, public msg: NzMessageService) { super(valid) }
  ngOnInit() {
  }
  async  blur() {
    this.value = await this.getCardNo();
  }
  async getCardNo(): Promise<any> {
    let baseUrl = "http://localhost:8000/GetICNO";
    return new Promise(resolve => this.httpClient.get(baseUrl).toPromise().then(rtn => {
      if (rtn['ICNO']) {
        resolve(rtn['ICNO']);
      } else {
        this.msg.error("找不到卡号")
      }
    }).catch(err => {
      this.msg.error("没有安装IC卡驱动");
    }))
  }
}
