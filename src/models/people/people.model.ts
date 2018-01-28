
import { PeopleType } from './people-type.enum';

export interface People {
    key?: string;
    userKey?: string;
    lastname: string;
    firstname: string;
    birthdate?: string;
    mail?: string;
    phone?: string;
    type: PeopleType;
    teams: string[]; // Tableau de team.key auxquelles la personne est liée
}