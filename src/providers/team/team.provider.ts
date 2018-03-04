
import { Injectable } from "@angular/core";
import { firestore } from "firebase/app";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';
// Imports pour la recherche
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/zip";

import { Team, Squad } from '../../models/team/team.model';

import { StadiumProvider } from "../stadium/stadium.provider";

@Injectable()
export class TeamProvider {

    private teamsRef: AngularFirestoreCollection<Team>

    constructor(private db: AngularFirestore, private stadiumProvider: StadiumProvider) {
        this.teamsRef = this.db.collection<Team>('teams');
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

    // Renvoi tous les clubs
    getAll(): Observable<Team[]> {
        return this.teamsRef.snapshotChanges().map(actions => {
            return actions.map(action => {
                const data = action.payload.doc.data() as Team;
                const id = action.payload.doc.id;
                return { id, ...data };
            });
          });
    }

    // Renvoi  un Club
    get(id: string): Observable<Team> {
        return this.teamsRef.doc<Team>(id).valueChanges();
    }

    // Ajoute le club sur Firestore (Team) : /teams
    add(team: Team): Promise<firestore.DocumentReference> {
        return this.teamsRef.add(team);
    }

    // Modifie le club sur Firestore
    update(team: Team): Promise<void> {
        return this.teamsRef.doc<Team>(team.id).update(team);
    }

    // Supprime le club sur Firestore
    delete(team: Team) {
        return this.teamsRef.doc<Team>(team.id).delete();
    }

    // Renvoi les équipes du club sur Firestore
    getSquads(team: Team): Observable<Squad[]> {
        return this.teamsRef.doc<Team>(team.id).collection<Squad>('squads').valueChanges();
    }

    // Recherche un club
    search( start: BehaviorSubject<string>, end: BehaviorSubject<string>): Observable<Team[]> {
        // return this.getAll();
        return Observable.zip(start, end).switchMap( param => {
            let s = param[0];   if (!s) { s = ''; }
            let e = param[1];   if (!e) { e = '\uf8ff'; }
            return this.db.collection<Team>('/teams', ref => ref.orderBy("name").startAt(s).endAt(e)).snapshotChanges().map(actions => {
                return actions.map(action => {
                    const data = action.payload.doc.data() as Team;
                    const id = action.payload.doc.id;
                    return { id, ...data };
                });
              });;
        });
      }
}