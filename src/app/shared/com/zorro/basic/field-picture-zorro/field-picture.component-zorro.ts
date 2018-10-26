import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile, UploadXHRArgs, UploadFileStatus } from 'ng-zorro-antd';
import { ValidService } from '@core/service/validate.service';
import { HttpRequest, HttpEvent, HttpEventType, HttpClient, HttpResponse } from '@angular/common/http';
import { AppConfig } from 'app/app.config';
import { StringComSpec } from '@core/util/spec/field/string.comspec';
import { Picture } from '@core/util/meta/types/Picture';

@Component({
  selector: 'app-field-picture-zorro',
  templateUrl: './field-picture.component-zorro.html',
  styles: []
})
export class FieldPictureZorroComponent extends StringComSpec implements OnInit {
  limit: number = 0;
  __fileList__: {
    uid: number,
    name: string,
    status: UploadFileStatus,
    url: string
  }[] = [];
  get fileList() {
    return this.__fileList__;
  };
  set fileList(fileList: {
    uid: number,
    name: string,
    status: UploadFileStatus,
    url: string
  }[]) {
    this.value = fileList.map(file => file.url).join(',');
    this.__fileList__ = fileList;
  }
  previewImage = '';
  previewVisible = false;
  //private msg: NzMessageService, 
  constructor(public validService: ValidService, public http: HttpClient, public appConfig: AppConfig) { super(validService) }
  beforeUpload = (file: UploadFile): boolean => {
    // this.fileList.push(file);
    return false;
  }

  handlePreview = (file: UploadFile) => {

    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }
  upload = async ($event: UploadFile) => {
    if ($event) {
      let base64 = await this.readFileToBase64($event as any);
      this.customReq($event, { base64, name: $event.name, size: $event.size });
    }
    // this.fileList.push({ uid: this.fileList.length + 1, name: $event.file.name, status: 'done', url: result.url })
  }
  readFileToBase64(file: File) {
    return new Promise<string>(resolve => {
      let reader = new FileReader();
      reader.onload = (evt) => {
        resolve(evt.target['result'])
      }
      reader.readAsDataURL(file);
    })
  }
  customReq = async (item: UploadFile, data: { base64: string, name: string, size: number }) => {
    // 构建一个 FormData 对象，用于存储文件或其他参数
    // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
    await this.http.post(this.appConfig.ip + '/common/upload', data, { responseType: 'json' }).toPromise().then((event: HttpEvent<{}>) => {
      this.fileList = this.fileList.concat({ url: event['url'], status: 'done', name: data.name, uid: Math.random() });
    }
    );
    this.fileList = this.fileList.filter(file => file.status != 'uploading');
  }
  ngOnInit() {
    if (this.field.type == Picture) {
      this.limit = 1;
    }
  }


}
