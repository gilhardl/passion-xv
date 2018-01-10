import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { BasicAuthComponent } from './basic-auth.component';
import { ToastService } from '../../services/toast/toast.service';

@IonicPage({
  name: 'page-login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  entryComponents: [
    BasicAuthComponent
  ]
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public afAuth: AngularFireAuth, public modalCtrl: ModalController,
    public toastService: ToastService) { }

  signUp() {
    let modal = this.modalCtrl.create(BasicAuthComponent);
    modal.present();
  }

  logIn() { }

  logInGoogle() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then( () => {
        return firebase.auth().getRedirectResult();
      })
      .then( result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(token);
        console.log(user);
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
      });
  }

  logInFacebook() {

  }
}
