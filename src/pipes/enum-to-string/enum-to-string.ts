import { Pipe, PipeTransform } from '@angular/core';

// On importe toutes les Enumérations de l'application ici
import { PeopleType, GenderType } from '../../models/people/people.model';
import { SquadCategory } from '../../models/team/team.model'

@Pipe({
  name: 'enumToString',
})
export class EnumToStringPipe implements PipeTransform {
  
  transform(value: any, type: Object) {
    
    // On repère l'énumération, on repèrera ensuite la valeur
    switch(type) {
      case PeopleType:
        switch(value) {
          case PeopleType.player:
            return 'Joueur';
          case PeopleType.coach:
            return 'Entraineur';
          case PeopleType.coachplayer:
            return 'Entraineur / joueur';
          case PeopleType.supporter:
            return 'Supporter';
          default:
            return '';
        }
      case GenderType:
        switch(value) {
          case GenderType.male:
            return 'Masculin';
          case GenderType.female:
            return 'Féminin';
          default:
            return '';
        }
      case SquadCategory:
        switch(value) {
          case SquadCategory.U5:
            return '- de 5';
          case SquadCategory.U6:
            return '- de 6';
          case SquadCategory.U7:
            return '- de 7';
          case SquadCategory.U8:
            return '- de 8';
          case SquadCategory.U9:
            return '- de 9';
          case SquadCategory.U10:
            return '- de 10';
          case SquadCategory.U11:
            return '- de 11';
          case SquadCategory.U12:
            return '- de 12';
          case SquadCategory.U13:
            return '- de 13';
          case SquadCategory.U14:
            return '- de 14';
          case SquadCategory.U15:
            return '- de 15';
          case SquadCategory.U16:
            return '- de 16';
          case SquadCategory.U17:
            return '- de 17';
          case SquadCategory.U18:
            return '- de 18';
          case SquadCategory.U19:
            return '- de 19';
          case SquadCategory.U20:
            return '- de 20';
          case SquadCategory.U21:
            return '- de 21';
          case SquadCategory.UP18:
            return 'Séniors';
          case SquadCategory.UP35:
            return '+ de 35';
          case SquadCategory.UP40:
            return '+ de 40';
          case SquadCategory.UP45:
            return '+ de 45';
          case SquadCategory.UP50:
            return '+ de 50';
          case SquadCategory.UP55:
            return '+ de 55';
          case SquadCategory.UP60:
            return '+ de 60';
          default:
            return '';
        }
      // ...
      // Rajouter ici les futures énumérations
      // ...
      default:
      return '';
    }
  }
}
