import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal, Button } from 'ionic-angular';

import { UtilsProvider } from '../../providers/utils/utils.provider';

import { Team, Squad, SquadCategory } from '../../models/team/team.model';
import { GenderType } from '../../models/people/people.model';
import { TeamProvider } from '../../providers/team/team.provider';
import { ColorPickerComponent } from '../../components/color-picker/color-picker';

@IonicPage({
  name: 'page-add-team'
})
@Component({
  selector: 'page-add-team',
  templateUrl: 'add-team.html',
})
export class AddTeamPage {

  // Variables globales
  private callback: Function;

  @ViewChild('primaryColorBtn') primaryColorBtn: Button;
  @ViewChild('secondaryColorBtn') secondaryColorBtn: Button;
  private primaryColorPickerModal: Modal;
  private secondaryColorPickerModal: Modal;

  private team: Team;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    private teamProvider: TeamProvider) {
      
      this.team = this.teamProvider.create();
      this.callback = this.navParams.get("callback")

  }

  ionViewDidLoad() {
    // Définition de la couleur de fond de boutons de sélection des couleurs
    this.primaryColorBtn.setElementStyle('background-color', this.team.primaryColor);
    this.secondaryColorBtn.setElementStyle('background-color', this.team.secondaryColor);
  }

  submitNewTeam() {
    // On appelle le callback avant de retourner à la page GettingStartedPage
    this.callback(this.team).then(() => {
      this.navCtrl.pop();
    });
  }

  selectColor(target: string) {
    
    // On ouvre la modal en fonction de la couleur à définir
    switch(target) {
      case 'primary':
        // Définition de la modal permettant de définir la couleur primaire de l'équipe
        this.primaryColorPickerModal = this.modalCtrl.create(ColorPickerComponent, {'colorParam': this.team.primaryColor});
        // Définition du callback (Que fait-on au retour de la modal ?)
        this.primaryColorPickerModal.onDidDismiss( color => {
          // Vérifie que quelque chose a été renvoyé par la modal
          if(color == undefined) {
            return;
          }

          this.team.primaryColor = color;
          this.primaryColorBtn.setElementStyle('background-color', this.team.primaryColor);
        });
        // Affichage de la modal
        this.primaryColorPickerModal.present();
        break;
      case 'secondary':
        // Définition de la modal permettant de définir la couleur secondaire de l'équipe
        this.secondaryColorPickerModal = this.modalCtrl.create(ColorPickerComponent, {'colorParam': this.team.secondaryColor});
        // Définition du callback (Que fait-on au retour de la modal ?)
        this.secondaryColorPickerModal.onDidDismiss( color => {
          // Vérifie que quelque chose a été renvoyé par la modal
          if(color == undefined) {
            return;
          }

          this.team.secondaryColor = color;
          this.secondaryColorBtn.setElementStyle('background-color', this.team.secondaryColor);
        });
        // Affichage de la modal
        this.secondaryColorPickerModal.present();
        break;
    }
  }

}
