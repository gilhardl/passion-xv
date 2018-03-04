import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AddSquadPage } from './add-squad';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    AddSquadPage,
  ],
  imports: [
    IonicPageModule.forChild(AddSquadPage),
    PipesModule
  ],
})
export class AddSquadPageModule {}
