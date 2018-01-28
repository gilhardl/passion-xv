
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

import { People } from '../../models/people/people.model';
import { PeopleType } from "../../models/people/people-type.enum";

@Injectable()
export class PeopleService {

    // Liste des personnes dans Firebase
    private peopleRef = this.db.list<People>('people')

    constructor(private db: AngularFireDatabase) { }

    getAll() {
        return this.peopleRef;
    }

    get(key: string) {
        return this.peopleRef.query
            .once(key)
            .then(snapchot => {
                console.log(snapchot);
            })
    }

    getByUserKey(userKey: string) {
        return this.peopleRef.query
            .orderByChild('userKey').equalTo(userKey)
            .once('value', snapchot => {
              console.log(snapchot.val());
            });
    }

    getBlank() {
        return {
            lastname: '',
            firstname: '',
            type: PeopleType.p,
            teams: []
        }
    }

    add(people: People) {
        return this.peopleRef.push(people);
    }

    update(people: People) {
        return this.peopleRef.update(people.key, people);
    }

    remove(people: People) {
        return this.peopleRef.remove(people.key);
    }
}