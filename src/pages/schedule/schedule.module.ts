
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular/module';

import { SchedulePage } from './schedule';

@NgModule({
    declarations: [
        SchedulePage
    ],
    imports: [
        IonicPageModule.forChild(SchedulePage)
    ]
})
export class SchedulePageModule {

}