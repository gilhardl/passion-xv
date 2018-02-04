import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  name: 'page-tabs'
})
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'page-schedule';
  tab2Root = 'page-squad';
  tab3Root = 'page-supporter';

  constructor() { }
}
