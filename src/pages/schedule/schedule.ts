import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { ViewController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage({
  name: 'page-schedule'
})
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
    public appCtrl: App, public menuCtrl: MenuController) {
  }

}
