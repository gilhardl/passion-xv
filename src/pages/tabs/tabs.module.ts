
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular/module';

import { TabsPage } from './tabs';

@NgModule({
    declarations: [
        TabsPage,
    ],
    imports: [
        IonicPageModule.forChild(TabsPage)
    ]
})
export class TabsModule {

}