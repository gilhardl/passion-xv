import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AddTeamPage } from './add-team';
import { TeamProvider } from '../../providers/team/team.provider';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AddTeamPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTeamPage),
    PipesModule,
    ComponentsModule
  ]
})
export class AddTeamPageModule {}
