import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { People } from '../../models/people/people.model';

/**
 * Generated class for the GettingStartedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-getting-started'
})
@Component({
  selector: 'page-getting-started',
  templateUrl: 'getting-started.html',
})
export class GettingStartedPage {

  user: People;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

}
