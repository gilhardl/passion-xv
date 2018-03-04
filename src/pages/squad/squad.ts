import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { People } from '../../models/people/people.model';
import { PeopleProvider } from '../../providers/people/people.provider';
import { ToastProvider } from '../../providers/toast/toast.provider';
import { Subscription } from 'rxjs/Subscription';

@IonicPage({
  name: 'page-squad'
})
@Component({
  selector: 'page-squad',
  templateUrl: 'squad.html'
})
export class SquadPage {

  playerList$: Subscription;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
    public toastService: ToastProvider, public peopleProvider: PeopleProvider) { }

  ionViewDidLoad() {
    this.playerList$ = this.peopleProvider.getAll().subscribe();
  }

  addPlayer() {
    this.navCtrl.push('page-squad-player');
  }

  ionViewWillUnload() {
  }
}
