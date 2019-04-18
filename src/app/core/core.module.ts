import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/root/app.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [AppComponent]
})
export class CoreModule { }
