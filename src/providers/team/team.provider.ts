
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';
// Imports pour la recherche
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/zip";

import { Team, Squad } from '../../models/team/team.model';
import { People } from "../../models/people/people.model";
import { Stadium } from "../../models/stadium/stadium.model";

import { StadiumProvider } from "../stadium/stadium.provider";

@Injectable()
export class TeamProvider {

    private teamCollection: AngularFirestoreCollection<Team>

    constructor(private aFirestore: AngularFirestore, private stadiumProvider: StadiumProvider) {
        this.teamCollection = this.aFirestore.collection<Team>('teams');
    }

    create(): Team {
        return {
            name: '',
            primaryColor: '#1952b4',
            secondaryColor: '#ebbb00',
            slogan: '',
            stadium: this.stadiumProvider.create(),
            supportersId: new Array<string>()
        };
    }

    getAll(): Observable<Team[]> {
        return this.teamCollection.valueChanges();
    }

    get(uid: string): Observable<Team> {
        return this.teamCollection.doc<Team>(uid).valueChanges();
    }

    add(team: Team) {
        return this.teamCollection.add(team);
    }

    update(team: Team) {
        return this.teamCollection.doc<Team>(team.name).set(team);
    }

    remove(team: Team) {
        return this.teamCollection.doc<Team>(team.name).delete();
    }

    getSquads(team: Team): Observable<Squad[]> {
        return this.teamCollection.doc<Team>(team.name).collection<Squad>('squads').valueChanges();
    }

    search( start: BehaviorSubject<string>, end: BehaviorSubject<string>): Observable<Team[]> {
        return this.getAll();
        
        // Observable.zip(start, end).switchMap( param => {
        //     return this.db.list("/teams", ref =>
        //         ref.orderByChild("name")
        //             .limitToFirst(10)
        //             .startAt(param[0])
        //             .endAt(param[1])
        //     )
        //     .snapshotChanges()
        //     .map(changes => {
        //     return changes.map(c => ({
        //         key: c.payload.key,
        //         ...c.payload.val()
        //         }));
        //     });
        // });
      }
}