
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
// Imports pour la recherche
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/zip";

import { Team, GenderType, TeamCategory } from '../../models/team/team.model';

@Injectable()
export class TeamService {

    // Liste des équipes dans Firebase
    private teamsRef: AngularFireList<Team> = this.db.list<Team>('teams');

    constructor(private db: AngularFireDatabase) { }

    getAll(): Observable<Team[]> {
        return this.teamsRef
            .snapshotChanges()
            .map(
            changes => {
                return changes.map(c => ({
                key: c.payload.key,
                ...c.payload.val()
                }));
            }
            );
    }

    get(key: string) {
        return this.teamsRef.query
            .once(key)
            .then(snapchot => {
                console.log(snapchot);
            })
    }

    getBlank() {
        return {
            name: '',
            gender: GenderType.male,
            category: TeamCategory.UP18,
            coachs: [],
            players: [],
            supporters: []
        }
    }

    add(team: Team) {
        return this.teamsRef.push(team);
    }

    update(team: Team) {
        return this.teamsRef.update(team.key, team);
    }

    remove(team: Team) {
        return this.teamsRef.remove(team.key);
    }

    search( start: BehaviorSubject<string>, end: BehaviorSubject<string>): Observable<Team[]> {
        return Observable.zip(start, end).switchMap( param => {
            return this.db.list("/teams", ref =>
                ref.orderByChild("name")
                    .limitToFirst(10)
                    .startAt(param[0])
                    .endAt(param[1])
            )
            .snapshotChanges()
            .map(changes => {
            return changes.map(c => ({
                key: c.payload.key,
                ...c.payload.val()
                }));
            });
        });
      }
}