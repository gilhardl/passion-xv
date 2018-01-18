import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastService } from '../../services/toast/toast.service';
import { PeopleService } from '../../services/people/people.service';
import { People } from '../../models/people/people.model';
// import { PeopleType } from '../../models/people/people-type.enum';

@IonicPage({
  name: 'page-team-player'
})
@Component({
  selector: 'page-team-player',
  templateUrl: 'team-player.html',
})
export class TeamPlayerPage {

  private player: People;
  private newPlayer: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastService: ToastService, private peopleService: PeopleService) {
  }

  ionViewWillLoad() {
    this.player = this.navParams.get('player');
    
    if (this.player == undefined) {
      this.player = this.peopleService.getBlank();
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
    this.peopleService.update(this.player)
      .then(() => {
        this.toastService.show(`${this.player.firstname} ${this.player.lastname} enregistré`);        
        this.navCtrl.pop();
      })
  }

  addPlayer() {
    this.peopleService.add(this.player)
      .then(ref => {
        this.toastService.show(`${this.player.firstname} ${this.player.lastname} enregistré`);
        this.navCtrl.pop();
      });
  }

}
