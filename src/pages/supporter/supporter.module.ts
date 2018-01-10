
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular/module';

import { SupporterPage } from './supporter';

@NgModule({
    declarations: [
        SupporterPage
    ],
    imports: [
        IonicPageModule.forChild(SupporterPage)
    ]
})
export class SupporterPageModule { }