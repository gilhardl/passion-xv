import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TeamPlayerPage } from './team-player';

@NgModule({
  declarations: [
    TeamPlayerPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamPlayerPage),
  ],
})
export class TeamPlayerPageModule {}
