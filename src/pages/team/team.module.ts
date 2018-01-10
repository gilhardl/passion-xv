
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular/module";

import { TeamPage } from "./team";

@NgModule({
    declarations: [
        TeamPage
    ],
    imports: [
        IonicPageModule.forChild(TeamPage)
    ]
})
export class TeamPageModule { }