
import { People } from '../people/people.model';
import { Stadium } from '../stadium/stadium.model';

export interface Team {
    key?: string;
    name: string;
    gender: GenderType;
    category: TeamCategory;
    primaryColor?: number;
    secondaryColor?: number;
    slogan?: string;
    coachs: People[];
    players: People[];
    supporters: People[];
    stadium?: Stadium;
}

export enum GenderType {
    male = 'Masculin',
    female = 'Féminin'
}

export enum TeamCategory {
    U5 = 'U5',
    U6 = 'U6',
    U7 = 'U7',
    U8 = 'U8',
    U9 = 'U9',
    U10 = 'U10',
    U11 = 'U11',
    U12 = 'U12',
    U13 = 'U13',
    U14 = 'U14',
    U15 = 'U15',
    U16 = 'U16',
    U17 = 'U17',
    U18 = 'U18',
    U19 = 'U19',
    U20 = 'U20',
    U21 = 'U21',
    UP18 = 'Séniors',
    UP35 = '+ de 35 ans',
    UP40 = '+ de 40 ans',
    UP45 = '+ de 45 ans',
    UP50 = '+ de 50 ans',
    UP55 = '+ de 55 ans',
    UP60 = '+ de 60 ans'
}