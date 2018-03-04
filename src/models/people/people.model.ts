
export interface People {
    id?: string;
    userUid?: string;
    lastname: string;
    firstname: string;
    birthdate?: string;
    email?: string;
    phone?: string;
    type: PeopleType;
}

export enum PeopleType {
    player,
    coach,
    coachplayer,
    supporter
}

export enum GenderType {
    male,
    female
}