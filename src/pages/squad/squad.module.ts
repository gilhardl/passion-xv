
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular/module";

import { SquadPage } from "./squad";

@NgModule({
    declarations: [
        SquadPage
    ],
    imports: [
        IonicPageModule.forChild(SquadPage)
    ]
})
export class SquadPageModule { }