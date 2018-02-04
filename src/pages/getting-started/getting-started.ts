import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Slides } from 'ionic-angular';
// Imports pour la recherche
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { People } from '../../models/people/people.model';
import { PeopleType } from '../../models/people/people-type.enum';
import { PeopleService } from '../../services/people/people.service';
import { Team } from '../../models/team/team.model';
import { TeamService } from '../../services/team/team.service';

@IonicPage({
  name: 'page-getting-started'
})
@Component({
  selector: 'page-getting-started',
  templateUrl: 'getting-started.html',
})
export class GettingStartedPage {

  ///////////////////////////////////
  // VARIABLES GLOBALES

  // Gestion des champs
  @ViewChild(Slides) slides: Slides;  // Récupère le component Slide depuis l'IHM

  // Variables IHM
  pageTitle: string = 'Infos perso';
  isNextSlide: boolean = true;
  
  // Personne de l'appli liée à l'utilisateur
  user: People;

  // Recherche d'équipe
  searchTeamStartAt: BehaviorSubject<string|null> = new BehaviorSubject("");
  searchTeamEndAt: BehaviorSubject<string|null> = new BehaviorSubject("\uf8ff");
  //BehaviorSubject is used here to initializing the observable correctly
  // and avoid an empty search result until a key is pressed in the search input
  searchedTeamList$: Observable<Team[]>;;
  selectedTeam: Team;

  // FIN VARIABLES GLOBALES
  ////////////////////////////////////

  
  // CONSTRUCTEUR
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menuCtrl: MenuController, private peopleService: PeopleService, private teamService: TeamService) {
    
    // On crée un People vide
    this.user = this.peopleService.getBlank();
  }

  // INITIALISATION IHM
  ionViewWillLoad() {
    // On bloque le swipe sur le slide
    this.slides.lockSwipes(true);

    // Initialise le People (SLIDE 1)
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
    
    // Initilise la liste des équipes recherchées
    this.searchedTeamList$ = this.teamService.search(this.searchTeamStartAt, this.searchTeamEndAt);
  }
  // FIN INITIALISATION IHM
  /////////////////////////////////

  // Méthode métant à jour les Subject de recherche
  updateSearchTerms(terms: string) {
    // Met à jour l'objet Subject
    this.searchTeamStartAt.next(terms);
    this.searchTeamEndAt.next(terms+'\uf8ff');
  }

  /////////////////////////////////
  // NAVIGATION
  /////////////////////////////////
  goHome(){
    this.menuCtrl.enable(true); // Active le menu
    this.menuCtrl.swipeEnable(true); // Permet le swipe sur le menu
    this.navCtrl.setRoot('page-tabs');  // Affiche la page d'accueil
  }

  nextSlide(){
    // Change le titre de la page en fonction de la slide (avant le changement)
    switch(this.slides.getActiveIndex() + 1){
      case 0: // Ne sera jamais le cas
      this.pageTitle = 'Infos perso';
      break;
      case 1:
      this.pageTitle = 'Votre équipe';
      break;
      case 2:
      this.pageTitle = '';
      this.isNextSlide = false;
      this.slides.centeredSlides = true;
      break;
    }
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

}
