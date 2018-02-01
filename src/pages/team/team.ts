import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { People } from '../../models/people/people.model';
// import { PeopleType } from '../../models/people/people-type.enum';
import { PeopleService } from '../../services/people/people.service';
import { ToastService } from '../../services/toast/toast.service';

@IonicPage({
  name: 'page-team'
})
@Component({
  selector: 'page-team',
  templateUrl: 'team.html'
})
export class TeamPage {

  playerList$: Observable<People[]>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
    public toastService: ToastService, public peopleService: PeopleService) { }

  ionViewDidLoad() {
    this.playerList$ = this.peopleService.getAll()
      .snapshotChanges()
      .map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val()
          }));
        }
      );
  }

  addPlayer() {
    this.navCtrl.push('page-team-player');
  }
}
