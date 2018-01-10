
import { Component } from '@angular/core';
import { Platform, App, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase/app';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: string = 'page-login';
  
  currentUser: any;
  selectedTeam: string = 'rcbseniors';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public appCtrl: App, public menuCtrl: MenuController) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      splashScreen.hide();

      // Par défaut le menu est désactivé
      this.menuCtrl.enable(false);
      this.menuCtrl.swipeEnable(false);

      // Intercepte la connexion d'un utilisateur
      firebase.auth().onAuthStateChanged(user => {
        // Nom de la vue courante
        let currentView = this.appCtrl.getActiveNavs()[0].getActive().name;
        // Utilisateur connecté
        if (user) {
          this.currentUser = user;          
          if (currentView == 'LoginPage'){
            this.menuCtrl.enable(true); // Active le menu
            this.menuCtrl.swipeEnable(true); // Permet le swipe sur le menu
            this.appCtrl.getActiveNavs()[0].setRoot('page-tabs'); // Affiche l'accueil
          }
          // Utilisateur déconnecté
        } else {
          this.currentUser = undefined;
          if (currentView != 'LoginPage'){
            this.menuCtrl.enable(false);  // Désactive le menu
            this.menuCtrl.swipeEnable(false); // Annule le swipe sur le menu
            this.appCtrl.getActiveNavs()[0].setRoot('page-login');  // Affiche la page de connexion
          }
        }
      });
    });
  }

  logOut() {
    firebase.auth().signOut()
      .then(() => {
        this.currentUser = undefined;
        // Utilisation de getRootNav pour utiliser le NavController au dessus de TabsPage
        this.appCtrl.getRootNav().setRoot('page-login');
      })
      .catch(error => {
        console.log(error);
      });
  }
}
