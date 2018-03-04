
import { GenderType } from '../people/people.model';
import { Stadium } from '../stadium/stadium.model';

export interface Team {
    id?: string;
    name: string;
    primaryColor: string;
    secondaryColor: string;
    slogan?: string;
    supportersId?: any[];
    stadium?: Stadium;
}

export class Squad {
    id?: string;
    name: string;
    gender: GenderType;
    category: SquadCategory;
    coachsId?: string[];
    playersId?: string[];
}

export enum SquadCategory {
    U5,
    U6,
    U7,
    U8,
    U9,
    U10,
    U11,
    U12,
    U13,
    U14,
    U15,
    U16,
    U17,
    U18,
    U19,
    U20,
    U21,
    UP18,
    UP35,
    UP40,
    UP45,
    UP50,
    UP55,
    UP60
}