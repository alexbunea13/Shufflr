import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/root/app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [AppComponent]
})
export class CoreModule { }
