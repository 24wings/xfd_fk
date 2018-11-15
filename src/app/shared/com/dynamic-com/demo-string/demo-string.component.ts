import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { ValidService } from 'app/libs/meta-ui/service/validate.service';
import { Flight } from 'app/projects/hk/entity/Flight';
import { NzMessageService } from 'ng-zorro-antd';
import { MyHttpService } from 'app/libs/meta-ui/service/http.service';
import { IDataStrategy } from 'app/libs/meta-ui/service/data-strategy/IDataStrategy';
import { CustomUrlService } from 'app/libs/meta-ui/service/CustomUrl.service';
import { Member } from 'app/projects/xfd_fk/entity/Member';
import { MetaEditorComponent } from 'app/libs/meta-ui/com/meta-object/meta-editor/meta-editor.component';
// import { CommonService } from 'app/libs/meta-ui/service/common.service';
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