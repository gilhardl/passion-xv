import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { GettingStartedPage } from './getting-started';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    GettingStartedPage,
  ],
  imports: [
    IonicPageModule.forChild(GettingStartedPage),
    PipesModule
  ],
  entryComponents: [
  ],
})
export class GettingStartedPageModule {}
