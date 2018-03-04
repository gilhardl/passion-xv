
import { Injectable } from "@angular/core";
import { firestore } from "firebase/app";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';

import { People, PeopleType } from '../../models/people/people.model';
import { snapshotChanges } from "angularfire2/database";

@Injectable()
export class PeopleProvider {

    private peoplesRef: AngularFirestoreCollection<People>

    constructor(private db: AngularFirestore) {
        this.peoplesRef = this.db.collection<People>('peoples');
    }

    create(): People {
        return {
            lastname: '',
            firstname: '',
            type: PeopleType.player
        };
    }

    // Renvoi tous les utilisateurs
    getAll(): Observable<People[]> {
        return this.peoplesRef.snapshotChanges().map(actions => {
            return actions.map(action => {
                const data = action.payload.doc.data() as People;
                const id = action.payload.doc.id;
                return { id, ...data };
            });
          });
    }

    // Renvoi une personne
    get(id: string): Observable<People> {
        return this.peoplesRef.doc<People>(id).valueChanges();
    }

    exists(id: string) {
        return this.db.firestore.collection('/teams').doc(id).get();
    }

    // Ajoute une pesonne sur Firestore (People) : /peoples
    add(people: People): Promise<void> {
        return this.peoplesRef.doc(people.userUid).set(people);
    }

    // Modifie une personne
    update(people: People): Promise<void> {
        return this.peoplesRef.doc<People>(people.id).update(people);
    }

    // Supprime une personne
    remove(people: People): Promise<void> {
        // TODO: Supprimer toutes les occurences de son id dans toutes ses équipes
        return this.peoplesRef.doc<People>(people.id).delete();
    }
}