import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { ToastService } from '../../services/toast/toast.service';

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
    public toastService: ToastService) {
     }

  ionViewDidLoad() {
    // Timeout avant de masquer le loader
    setTimeout(() => this.loading = false, 4100)
  }

  // Créer un utilisateur Firebase
  createUser() {
    // Vérification saisie
    if(this.userEmail == '' || this.userPassword == '') {
      this.toastService.show('Veuillez renseigner une adresse email et un mot de passe');
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
            this.toastService.show("Un utilisateur avec cette adresse mail existe déjà");
          case 'auth/invalid-email':
            this.toastService.show("Adresse mail incorrect");
          case 'auth/weak-password':
            this.toastService.show("Mot de passe trop faible");
          case undefined:
            this.toastService.show(error.message);
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
            this.toastService.show("Adresse mail incorrect");
          case 'auth/user-disabled':
            this.toastService.show("Votre compte a été désactivé");
          case 'auth/user-not-found':
            this.toastService.show("Utilisateur inconnu");
          case 'auth/wrong-password':
            this.toastService.show("Mot de passe incorrect");
          case undefined:
          this.toastService.show(error.message);
        }
      });
  }

  // Connexion / Inscription avec Google
  logInGoogle() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then( () => {
        return firebase.auth().getRedirectResult();
      })
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
            this.toastService.show("Adresse mail incorrect");
          case 'auth/user-disabled':
            this.toastService.show("Votre compte a été désactivé");
          case 'auth/user-not-found':
            this.toastService.show("Utilisateur inconnu");
          case 'auth/wrong-password':
            this.toastService.show("Mot de passe incorrect");
          case undefined:
          this.toastService.show(error.message);
        }
      });
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
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential); 
      })
  }
}
