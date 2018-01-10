import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage({
  name: 'page-supporter'
})
@Component({
  selector: 'page-supporter',
  templateUrl: 'supporter.html'
})
export class SupporterPage {

  supporterSegment: string = 'news';

  constructor(public navCtrl: NavController) {

  }

}
