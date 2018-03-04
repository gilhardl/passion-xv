import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UtilsProvider } from '../../providers/utils/utils.provider';
import { EnumToStringPipe } from '../../pipes/enum-to-string/enum-to-string';

import { Squad, SquadCategory } from '../../models/team/team.model';
import { GenderType } from '../../models/people/people.model';
import { SquadProvider } from '../../providers/squad/squad.provider';

@IonicPage({
  name: 'page-add-squad'
})
@Component({
  selector: 'page-add-squad',
  templateUrl: 'add-squad.html',
})
export class AddSquadPage {

  // Variables globales
  private callback: Function;
  private teamName: string;

  private genderTypeValues: number[] = [];
  private genderTypeEnum: any = GenderType;
  private squadCategoryValues: number[] = [];
  private squadCategoryEnum: any = SquadCategory;

  private squad: Squad;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private utilsProvider: UtilsProvider, private squadProvider: SquadProvider, private enumToStringPipe: EnumToStringPipe) {
      
      this.squad = this.squadProvider.create();
      this.callback = this.navParams.get("callback");
      this.teamName = this.navParams.get("teamName");

  }

  ionViewDidLoad() {
    // Initialise les genres et les catégories
    this.genderTypeValues = this.utilsProvider.getEnumValues(GenderType);
    this.squadCategoryValues = this.utilsProvider.getEnumValues(SquadCategory);

    // On initialise le nom de l'équipe en fonction du club et de la catégorie
    if(this.teamName) {
      this.squad.name = this.teamName + ' | ' + this.enumToStringPipe.transform(this.squadCategoryValues[this.squad.category], SquadCategory);
    }
  }

  submitNewSquad() {
    // On vérifie qu'un callback a bien été passé à l'ouverture, sinon on pop direct
    if(this.callback) {
      // On appelle le callback avant de retourner à la page GettingStartedPage
      this.callback(this.squad).then(() => {
        this.navCtrl.pop();
      });
    } else {
      this.navCtrl.pop();
    }
  }

}
