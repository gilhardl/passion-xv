import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastProvider } from '../../providers/toast/toast.provider';
import { PeopleProvider } from '../../providers/people/people.provider';
import { People } from '../../models/people/people.model';

@IonicPage({
  name: 'page-squad-player'
})
@Component({
  selector: 'page-squad-player',
  templateUrl: 'squad-player.html',
})
export class SquadPlayerPage {

  private player: People;
  private newPlayer: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastProvider: ToastProvider, private peopleProvider: PeopleProvider) {
  }

  ionViewWillLoad() {
    this.player = this.navParams.get('player');
    
    if (this.player == undefined) {
      this.player = this.peopleProvider.create();
      this.newPlayer = true;
    }
  }

  formValidate() {
    if(this.newPlayer) {
      this.addPlayer()
    } else {
      this.savePlayer();
    }
  }

  savePlayer() {
    // this.peopleProvider.update(this.player)
    //   .then(() => {
    //     this.toastProvider.show(`${this.player.firstname} ${this.player.lastname} enregistré`);        
    //     this.navCtrl.pop();
    //   })
  }

  addPlayer() {
    this.peopleProvider.add(this.player)
      .then(ref => {
        this.toastProvider.show(`${this.player.firstname} ${this.player.lastname} enregistré`);
        this.navCtrl.pop();
      });
  }

}
