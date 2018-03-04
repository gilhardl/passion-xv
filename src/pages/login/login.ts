import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { ToastProvider } from '../../providers/toast/toast.provider';

@IonicPage({
  name: 'page-login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  entryComponents: [ ]
})
export class LoginPage {

  private userEmail: string = "";
  private userPassword: string = "";
  private loading: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public afAuth: AngularFireAuth, public modalCtrl: ModalController,
    public toastProvider: ToastProvider) {
     }

  ionViewDidLoad() {
    // Timeout avant de masquer le loader
    setTimeout(() => this.loading = false, 4100)
  }

  // Créer un utilisateur Firebase
  createUser() {
    // Vérification saisie
    if(this.userEmail == '' || this.userPassword == '') {
      this.toastProvider.show('Veuillez renseigner une adresse email et un mot de passe');
      return;
    }

    // Crée l'utilisateur sur Firebase
    this.afAuth.auth.createUserWithEmailAndPassword(this.userEmail, this.userPassword)
      .then( result => {
          console.log(result);
      })
      .catch( error => {
        // Si il y a une erreur on affiche un toast
        switch(error.code) {
          case 'auth/email-already-in-use':
            this.toastProvider.show("Un utilisateur avec cette adresse mail existe déjà");
            break;
          case 'auth/invalid-email':
            this.toastProvider.show("Adresse mail incorrect");
            break;
          case 'auth/weak-password':
            this.toastProvider.show("Mot de passe trop faible");
            break;
          case undefined:
            this.toastProvider.show(error.message);
        }
      });    
  }

  logIn() {
    this.afAuth.auth.signInWithEmailAndPassword(this.userEmail, this.userPassword)
      .then( result => {
        var token = result.credential.accessToken;  // This gives you a Google Access Token. You can use it to access the Google API.
        var user = result.user;
        console.log(token);
        console.log(user);
      })
      .catch( (error) => {
        // Si il y a une erreur on affiche un toast
        switch(error.code) {
          case 'auth/invalid-email':
            this.toastProvider.show("Adresse mail incorrect");
            break;
          case 'auth/user-disabled':
            this.toastProvider.show("Votre compte a été désactivé");
            break;
          case 'auth/user-not-found':
            this.toastProvider.show("Utilisateur inconnu");
            break;
          case 'auth/wrong-password':
            this.toastProvider.show("Mot de passe incorrect")
            break;;
          case undefined:
            this.toastProvider.show(error.message);
            break;
        }
      });
  }

  // Connexion / Inscription avec Google
  logInGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then( result => {
        var token = result.credential.accessToken;  // This gives you a Google Access Token. You can use it to access the Google API.
        var user = result.user;
      })
      .catch( (error) => {
        // Si il y a une erreur on affiche un toast
        switch(error.code) {
          case 'auth/invalid-email':
            this.toastProvider.show("Adresse mail incorrect");
            break;
          case 'auth/user-disabled':
            this.toastProvider.show("Votre compte a été désactivé");
            break;
          case 'auth/user-not-found':
            this.toastProvider.show("Utilisateur inconnu");
            break;
          case 'auth/wrong-password':
            this.toastProvider.show("Mot de passe incorrect");
            break;
          case undefined:
            this.toastProvider.show(error.message);
            break;
        }
      });
    // this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    //   .then( () => {
    //     return firebase.auth().getRedirectResult();
    //   })
    //   .then( result => {
    //     var token = result.credential.accessToken;  // This gives you a Google Access Token. You can use it to access the Google API.
    //     var user = result.user;
    //     console.log(token);
    //     console.log(user);
    //   })
    //   .catch( (error) => {
    //     // Si il y a une erreur on affiche un toast
    //     switch(error.code) {
    //       case 'auth/invalid-email':
    //         this.toastProvider.show("Adresse mail incorrect");
    //         break;
    //       case 'auth/user-disabled':
    //         this.toastProvider.show("Votre compte a été désactivé");
    //         break;
    //       case 'auth/user-not-found':
    //         this.toastProvider.show("Utilisateur inconnu");
    //         break;
    //       case 'auth/wrong-password':
    //         this.toastProvider.show("Mot de passe incorrect");
    //         break;
    //       case undefined:
    //         this.toastProvider.show(error.message);
    //         break;
    //     }
    //   });
  }

  // Connexion / Inscription avec Facebook
  logInFacebook() {
    // Création du provider FB
    let provider = new firebase.auth.FacebookAuthProvider();
    // On indique dans le provider qu'on veut récupérer le profile public de l'utilisateur
    provider.addScope('public_profile');

    // Demande de connexion FB
    this.afAuth.auth.signInWithPopup(provider)
      .then( result => {
        console.log(result);
      })
      .catch( error => {
        // Si il y a une erreur on affiche un toast
        switch(error.code) {
          case 'auth/invalid-email':
            this.toastProvider.show("Adresse mail incorrect");
            break;
          case 'auth/user-disabled':
            this.toastProvider.show("Votre compte a été désactivé");
            break;
          case 'auth/user-not-found':
            this.toastProvider.show("Utilisateur inconnu");
            break;
          case 'auth/wrong-password':
            this.toastProvider.show("Mot de passe incorrect");
            break;
          case undefined:
            this.toastProvider.show(error.message);
            break;
        } 
      })
  }
}
