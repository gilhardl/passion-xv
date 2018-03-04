import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Slides, AlertController } from 'ionic-angular';
// Firestore
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { firestore } from 'firebase/app';
import { DocumentReference } from '@firebase/firestore-types'
// Imports pour la recherche
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/count';

// import { UtilsProvider } from '../../providers/utils/utils.provider';
import { People, PeopleType, GenderType} from '../../models/people/people.model';
import { PeopleProvider } from '../../providers/people/people.provider';
import { Team, Squad } from '../../models/team/team.model';
import { TeamProvider } from '../../providers/team/team.provider';
import { UtilsProvider } from '../../providers/utils/utils.provider';
import { FirebaseApp } from 'angularfire2';

@IonicPage({
  name: 'page-getting-started'
})
@Component({
  selector: 'page-getting-started',
  templateUrl: 'getting-started.html'
})
export class GettingStartedPage {

  ///////////////////////////////////
  // VARIABLES GLOBALES

  // Gestion des champs
  @ViewChild(Slides) slides: Slides;  // Récupère le component Slide depuis l'IHM

  // Variables IHM
  pageTitle: string = 'Infos perso';
  isNextSlide: boolean = true;
  
  // Utilisateur
  private user: People;
  private peopleTypeValues: number[] = [];
  private peopleTypeEnum: any = PeopleType;

  // Sélection club
  searchTeamStartAt: BehaviorSubject<string|null> = new BehaviorSubject("");      // BehaviorSubject is used here to initializing the observable correctly
  searchTeamEndAt: BehaviorSubject<string|null> = new BehaviorSubject("\uf8ff");  // and avoid an empty search result until a key is pressed in the search input
  searchedTeamList$: Observable<Team[]>;
  searchedTeamNumber$: Observable<number>;
  selectedTeam: Team = undefined;
  
  // Sélection équipe
  selectedTeamSquads$: Observable<Squad[]>;
  selectedTeamSquadsNumber$: Observable<number>;
  selectedSquad: Squad = undefined;

  registrationSubmited: boolean = false;

  // FIN VARIABLES GLOBALES
  ////////////////////////////////////

  
  // CONSTRUCTEUR
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
    private alertCtrl: AlertController, private utilsProvider: UtilsProvider, private db: AngularFirestore,
    private peopleProvider: PeopleProvider, private teamProvider: TeamProvider) {
    
    this.user = {
      lastname: '',
      firstname: '',
      type: PeopleType.player,
    };
    // Initioalisation des PeopleType
    this.peopleTypeValues = this.utilsProvider.getEnumValues(PeopleType);
  
  }

  

  // INITIALISATION IHM
  ionViewWillLoad() {
    // On bloque le swipe sur le slide
    if (this.slides.getActiveIndex() == 1 && !this.selectedTeam) {
      this.slides.lockSwipes(true);
    } else {
      this.slides.lockSwipes(false);
    }

    // (SLIDE 1) Initialise le People
    this.user.userUid = this.navParams.get('userUid');  // Lie User et People
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

    // (SLIDE 2) Initilise la liste des équipes recherchées
    this.searchedTeamList$ = this.db.collection<Team>('teams').snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Team;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
    this.searchedTeamNumber$ = this.searchedTeamList$.count();

    // (SLIDE 3) Initialise les équipes
    // Rien à faire, tout sera fait lorsqu'une équipe aura été sélectionnée
  }
  // FIN INITIALISATION IHM
  /////////////////////////////////



  // Méthode de mise à jour les Subject de recherche
  updateSearchTerms(terms: string) {
    // Met à jour l'objet Subject
    this.searchTeamStartAt.next(terms);
    this.searchTeamEndAt.next(terms+'\uf8ff');
  }


  /////////////////////////////////
  // NAVIGATION
  /////////////////////////////////
  slideChanged(){
    let realActiveSlideIndex: number = this.slides.getActiveIndex();
    // Si l'utilisateur est un supporter et qu'on est après la slide du club, on modifie l'index (car la slide 2 disparait)
    if (this.user.type == PeopleType.supporter && realActiveSlideIndex == 2) {
      realActiveSlideIndex++
    }
    // Change le titre de la page en fonction de la slide
    switch(realActiveSlideIndex){
      case 0:
        this.pageTitle = 'Infos perso';
        this.slides.lockSwipes(false);
        break;
      case 1:
        this.pageTitle = 'Votre club';
        if (!this.selectedTeam) {
          this.slides.lockSwipes(true); // On autorisera le swipe quand l'utilisateur aura choisi un club
        } 
        break;
      case 2:
        this.pageTitle = 'Votre équipe';
        this.slides.lockSwipes(false);
        if(!this.selectedTeam) { this.slides.slidePrev(); }
        if (!this.selectedSquad) {
          this.slides.lockSwipes(true); // On autorisera le swipe quand l'utilisateur aura choisi une équipe
        }
        break;
      case 3:
        this.pageTitle = '';
        this.slides.lockSwipes(true);
        this.isNextSlide = false;
        this.submitRegistration() // On enregistre l'utilisateur
      break;
    }
  }
  

  ///////////////////////////////////
  //  Selection du club            //
  ///////////////////////////////////
  selectExistingTeam(team: Team) {

    // Si l'utilisateur a déjà sélectionné un club qui a été crée et non enregistré
    if (this.selectedTeam && this.selectedTeam.id == undefined) {
      let alert = this.alertCtrl.create({
        title: 'Vous-êtes sûr(e)?',
        message: 'En déselectionnant votre club vous perdrez les infos que vous venez de renseigner. Continuer ?',
        buttons: [
          {
            text: 'Non',
            role: 'cancel'
          },
          {
            text: 'Oui',
            handler: () => {
              this.selectedTeam = team;
              this.deselectSquad();
              this.slides.lockSwipes(false);
              this.updateTeamSquads();
            }
          }
        ]
      });
      alert.present();
    } else {
      this.selectedTeam = team;
      this.deselectSquad();
      this.slides.lockSwipes(false);
      this.updateTeamSquads();
    }

  }

  addNewTeam() {
    let self = this;
    // Définition d'un callback qu'on passe à la page AddTeamPage et qu'elle appelera avant de pop()
    let addTeamCallback = function(_params) {
      return new Promise((resolve, reject) => {
          self.selectedTeam = _params;
          self.deselectSquad();
          self.slides.lockSwipes(false);
          self.updateTeamSquads();
          resolve();
      });
    }
    this.navCtrl.push('page-add-team', {callback: addTeamCallback});
  }

  // Déselection
  deselectTeam() {

    // Si l'utilisateur a déjà sélectionné un club qui a été crée et non enregistré
    if (this.selectedTeam && this.selectedTeam.id == undefined) {
      let alert = this.alertCtrl.create({
        title: 'Vous-êtes sûr(e)?',
        message: 'En déselectionnant votre club vous perdrez les infos que vous venez de renseigner. Continuer ?',
        buttons: [
          {
            text: 'Non',
            role: 'cancel'
          },
          {
            text: 'Oui',
            handler: () => {
              this.selectedTeam = undefined;
              this.deselectSquad();
              this.slides.lockSwipes(true);
            }
          }
        ]
      });
      alert.present();
    } else {
      this.selectedTeam = undefined;
      this.deselectSquad();
      this.slides.lockSwipes(true);
    }

  }

  ///////////////////////////////////
  //  Selection de l'equipe        //
  ///////////////////////////////////
  updateTeamSquads() {
    if (this.selectedTeam && this.selectedTeam.id) {
      this.selectedTeamSquads$ = this.db.collection<Team>('teams')
        .doc(this.selectedTeam.id).collection<Squad>('squads').snapshotChanges().map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Squad;
            const id = action.payload.doc.id;
            return { id, ...data };
          });
        });
      this.selectedTeamSquadsNumber$ = this.selectedTeamSquads$.count();
    } else {
      this.selectedTeamSquads$ = undefined;
    }
  }

  selectExistingSquad(squad: Squad) {

    // Si l'utilisateur a déjà sélectionné une équipe qui a été crée et non enregistrée
    if (this.selectedSquad && this.selectedSquad.id == undefined) {
      let alert = this.alertCtrl.create({
        title: 'Vous-êtes sûr(e)?',
        message: 'En déselectionnant votre équipe vous perdrez les infos que vous venez de renseigner. Continuer ?',
        buttons: [
          {
            text: 'Non',
            role: 'cancel'
          },
          {
            text: 'Oui',
            handler: () => {
              this.selectedSquad = squad;
              this.slides.lockSwipes(false);
            }
          }
        ]
      });
      alert.present();
    } else {
      this.selectedSquad = squad;
      this.slides.lockSwipes(false);
    }

  }

  deselectSquad() {

    // Si l'équipe sélectionnée a été crée et non enregistrée
    if (this.selectedSquad && this.selectedSquad.id == undefined) {
      let alert = this.alertCtrl.create({
        title: 'Vous-êtes sûr(e)?',
        message: 'En déselectionnant votre équipe vous perdrez les infos que vous venez de renseigner. Continuer ?',
        buttons: [
          {
            text: 'Non',
            role: 'cancel'
          },
          {
            text: 'Oui',
            handler: () => {
              this.selectedSquad = undefined;
              this.slides.lockSwipes(true);
            }
          }
        ]
      });
      alert.present();
    } else {
      this.selectedSquad = undefined;
      this.slides.lockSwipes(true);
    }
  }

  addNewSquad() {
    let self = this;
    // Définition d'un callback qu'on passe à la page AddSquadPage et qu'elle appelera avant de pop()
    let addSquadCallback = function(_params) {
      return new Promise((resolve, reject) => {
          self.selectedSquad = _params;
          self.slides.lockSwipes(false);
          resolve();
      });
    }
    this.navCtrl.push('page-add-squad', {callback: addSquadCallback, teamName: this.selectedTeam.name });
  }



  ///////////////////////////////////
  //    C'est parti !!!            //
  ///////////////////////////////////
  goHome() {

    this.menuCtrl.enable(true); // Active le menu
    this.menuCtrl.swipeEnable(true);  // Active le swipe sur le menu
    this.navCtrl.setRoot('page-tabs');  // Affiche la oage d'accueil
  }

  submitRegistration() {
    // Ajoute l'utilisateur sur Firestore (People) : /peoples
    this.db.collection<People>('peoples').add(this.user)
      .then(userRef => {

        console.log('Utilisateur ajouté');
        console.log(userRef)

        // Ajout de l'utilisateur (People) dans le tableau qui lui correspond
        switch(this.user.type) {
          case PeopleType.player:
            if (!this.selectedSquad.playersId) { this.selectedSquad.playersId = new Array<string>(); }  // On s'assure que le tableau existe
            this.selectedSquad.playersId.push(userRef.id);
          break;
          case PeopleType.coach:
            if (!this.selectedSquad.coachsId) { this.selectedSquad.coachsId = new Array<string>(); }  // On s'assure que le tableau existe
            this.selectedSquad.coachsId.push(userRef.id);
          break;
          case PeopleType.coachplayer:
            if (!this.selectedSquad.coachsId) { this.selectedSquad.coachsId = new Array<string>(); }  // On s'assure que le tableau existe
            if (!this.selectedSquad.playersId) { this.selectedSquad.playersId = new Array<string>(); }  // On s'assure que le tableau existe
            this.selectedSquad.coachsId.push(userRef.id);
            this.selectedSquad.playersId.push(userRef.id);
          break;
          case PeopleType.supporter:
            if (!this.selectedTeam.supportersId) { this.selectedTeam.supportersId = new Array<string>(); }  // On s'assure que le tableau existe
            this.selectedTeam.supportersId.push(userRef.id);
          break;
        }

        // Ajoute le club sur Firestore (Team) : /teams
        if (!this.selectedTeam.id) {
          console.log('Club nouveau');
          this.db.collection<Team>('teams').add(this.selectedTeam)
            .then(selectedTeamRef => {
  
              console.log('Club ajouté');
              console.log(selectedTeamRef);
              
              // On n'ajoute/modifie une équipe que si l'utilisateur n'est pas un supporter, dans ce cas il a déjà été enregistré avec le club
              if (this.user.type != PeopleType.supporter) {
                
                // Ajout de l'équipe (Squad) : /teams/selectedTeamRef/squads
                if (!this.selectedSquad.id) {
                  this.db.collection<Squad>(selectedTeamRef.path+'/squads').add(this.selectedSquad)
                    .then( selectedSquadRef => {
      
                      console.log('Equipe ajoutée');
                      console.log(selectedSquadRef);

                      this.registrationSubmited = true;   // Utilisateur enregistré
                    })
                    .catch(err => {
                      console.error('Erreur lors de l\'ajout de l\'equipe');
                      console.error(err);
                    });

                // Modifie l'équipe sur Firestore
                } else {
                  this.db.doc<Team>('teams/'+selectedTeamRef.id+'/squads/'+this.selectedSquad.id).update(this.selectedSquad)
                    .then( () => {
        
                      console.log('Equipe modifiée');
                      
                      this.registrationSubmited = true;   // Utilisateur enregistré
                    })
                    .catch(err => {
                      console.error('Erreur lors de l\'ajout de l\'equipe');
                      console.error(err);
                    });
                }
              }
            })
            .catch(err => {
              console.error('Erreur lors de l\'ajout du club');
              console.error(err);
            });

        // Modifie le club sur Firestore
        } else {
          console.log('Club existant');
          // Le club n'est a modifié que si l'utilisateur est de type supporter (sinon c'est l'équipe qu'on modifie/ajoute)
          if (this.user.type == PeopleType.supporter) {
            this.db.collection<Team>('teams').doc(this.selectedTeam.id).update(this.selectedTeam)
              .then(() => {
                console.log('Club modifié');
                      
                this.registrationSubmited = true;   // Utilisateur enregistré
              })
              .catch(err => {
                console.error('Erreur lors de la modification du club');
                console.error(err);
              })
          } else {
            // Ajout de l'équipe (Squad) : /teams/selectedTeamRef/squads
            if (!this.selectedSquad.id) {
              this.db.collection<Squad>('teams/'+this.selectedTeam.id+'/squads').add(this.selectedSquad)
                .then( selectedSquadRef => {
  
                  console.log('Equipe ajoutée');
                  console.log(selectedSquadRef);
                      
                  this.registrationSubmited = true;   // Utilisateur enregistré
                })
                .catch(err => {
                  console.error('Erreur lors de l\'ajout de l\'equipe');
                  console.error(err);
                });
            // Modifie l'équipe sur Firestore
            } else {
              this.db.doc<Team>('teams/'+this.selectedTeam.id+'/squads/'+this.selectedSquad.id).update(this.selectedSquad)
                .then( () => {
    
                  console.log('Equipe modifiée');
                      
                  this.registrationSubmited = true;   // Utilisateur enregistré
                })
                .catch(err => {
                  console.error('Erreur lors de l\'ajout de l\'equipe');
                  console.error(err);
                });
            }
          }
        }
      })
      .catch(err => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur');
        console.error(err);
      });
  }
}
