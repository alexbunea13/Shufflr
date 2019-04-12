import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/root/app.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [AppComponent]
})
export class CoreModule { }
