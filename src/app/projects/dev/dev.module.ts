import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignPageComponent } from './pages/design-page/design-page.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: DesignPageComponent }])
  ],
  declarations: [DesignPageComponent]
})
export class DevModule { }
