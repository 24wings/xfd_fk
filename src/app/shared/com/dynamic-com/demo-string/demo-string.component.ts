import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { ValidService } from '@core/service/validate.service';
import { StringComSpec } from '@core/util/spec/field/string.comspec';
import { Flight } from 'app/projects/hk/entity/Flight';
import { MetaEditorComponent } from '@shared/com/meta-object/meta-editor/meta-editor.component';
import { NzMessageService } from 'ng-zorro-antd';
import { MyHttpService } from '@core/service/http.service';
import { IDataStrategy } from '@core/service/data-strategy/IDataStrategy';
import { CustomUrlService } from '@core/service/CustomUrl.service';
import { Member } from 'app/projects/xfd_fk/entity/Member';
// import { CommonService } from '@core/service/common.service';
// import { EntityEnum } from '../../../../entity.enum';

@Component({
  selector: 'app-demo-string',
  templateUrl: './demo-string.component.html',
  styles: []
})
export class DemoStringComponent extends MetaEditorComponent implements OnInit {
  newDataItem: Member = {} as any;
  flightInfo: Flight;
  flghtInfoVisible: boolean = false;
  constructor(public validService: ValidService,
    public msg: NzMessageService,
    public http: MyHttpService,
    public ref: ChangeDetectorRef,
    public dataStrategy: IDataStrategy,
    public customUrl: CustomUrlService) { super(validService, msg, http, ref, dataStrategy, customUrl) };

  ngOnInit() {
    //   this.queryFlightInfo()
  }

  // async  queryFlightInfo() {
  //   let data = await this.commonService.singleTableQuery(EntityEnum.Flight, { code: this.value });
  //   if (data.paging.rows.length > 0) this.flightInfo = data.paging.rows[0];
  // }


}