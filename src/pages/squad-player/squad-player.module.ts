import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SquadPlayerPage } from './squad-player';

@NgModule({
  declarations: [
    SquadPlayerPage,
  ],
  imports: [
    IonicPageModule.forChild(SquadPlayerPage),
  ],
})
export class SquadPlayerPageModule {}
