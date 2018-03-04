
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';

import { People, PeopleType } from '../../models/people/people.model';
import { firestore } from "firebase/app";

@Injectable()
export class PeopleProvider {

    private peopleCollection: AngularFirestoreCollection<People>

    constructor(private aFirestore: AngularFirestore) {
        this.peopleCollection = this.aFirestore.collection<People>('peoples');
    }

    create(): People {
        return {
            lastname: '',
            firstname: '',
            type: PeopleType.player
        };
    }

    getAll(): Observable<People[]> {
        return this.peopleCollection.valueChanges();
    }

    get(peopleRef: firestore.DocumentReference): Observable<People> {
        return this.peopleCollection.doc<People>(peopleRef.path).valueChanges();
    }

    getByUserUid(userUid: string) {
        return undefined;
        // this.peopleRef.query
        //     .orderByChild('userKey').equalTo(userKey)
        //     .once('value', snapchot => {
        //       console.log(snapchot.val());
        //     });
    }

    add(people: People) {
        return this.peopleCollection.add(people);
    }

    update(people: People) {
        // return this.peopleCollection.update(people.key, people);
    }

    remove(people: People) {
        // return this.peopleRef.remove(people.key);
    }
}