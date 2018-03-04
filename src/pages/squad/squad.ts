import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';

import { People } from '../../models/people/people.model';
import { PeopleProvider } from '../../providers/people/people.provider';
import { ToastProvider } from '../../providers/toast/toast.provider';

@IonicPage({
  name: 'page-squad'
})
@Component({
  selector: 'page-squad',
  templateUrl: 'squad.html'
})
export class SquadPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
    public toastService: ToastProvider, public peopleProvider: PeopleProvider) { }

  ionViewDidLoad() {
  }

  addPlayer() {
    this.navCtrl.push('page-squad-player');
  }

  ionViewWillUnload() {
  }
}
