import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from '../home/components/home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
