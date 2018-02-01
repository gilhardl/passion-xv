import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Slides } from 'ionic-angular';

import { People } from '../../models/people/people.model';
import { PeopleType } from '../../models/people/people-type.enum';
import { PeopleService } from '../../services/people/people.service';

@IonicPage({
  name: 'page-getting-started'
})
@Component({
  selector: 'page-getting-started',
  templateUrl: 'getting-started.html',
})
export class GettingStartedPage {

  @ViewChild(Slides) slides: Slides;  // Récupère le component Slide depuis l'IHM

  user: People;
  pageTitle: string = 'Infos perso';
  isNextSlide: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menuCtrl: MenuController, private peopleService: PeopleService) {
    
    // On crée un People vide
    this.user = this.peopleService.getBlank();
  }

  ionViewWillLoad() {
    // On bloque le swipe sur le slide
    this.slides.lockSwipeToNext(true);

    // Initialise le People
    this.user.userKey = this.navParams.get('userKey');  // Lie User et People
    this.user.email = this.navParams.get('email');
    // Parse le nom complet en nom de famille et prénom
    let displayName = this.navParams.get('displayName');
    let names = displayName.split(' ');
    switch(names.length) {
      case 1:
        this.user.firstname = names[0];
        break;
      case 2:
        this.user.firstname = names[0];
        this.user.lastname = names[1];
        break;
      case 3:
        this.user.firstname = names[0];
        this.user.lastname = names[1] + ' ' + names[2];
        break;
    }
  }

  goHome(){
    this.menuCtrl.enable(true); // Active le menu
    this.menuCtrl.swipeEnable(true); // Permet le swipe sur le menu
    this.navCtrl.setRoot('page-tabs');  // Affiche la page d'accueil
  }

  nextSlide(){
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    // Change le titre de la page en fonction de la slide
    switch(this.slides.getActiveIndex()){
      case 0:
        this.pageTitle = 'Infos perso';
        break;
      case 1:
        this.pageTitle = 'Votre équipe';
        break;
      case 2:
        this.pageTitle = '';
        this.isNextSlide = false;
        break;
    }
  }

}
