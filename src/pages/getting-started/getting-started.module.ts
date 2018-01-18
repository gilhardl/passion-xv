import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GettingStartedPage } from './getting-started';

@NgModule({
  declarations: [
    GettingStartedPage,
  ],
  imports: [
    IonicPageModule.forChild(GettingStartedPage),
  ],
})
export class GettingStartedPageModule {}
