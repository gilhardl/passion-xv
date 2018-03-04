
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
// Imports pour la recherche
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/zip";

import { GenderType, People } from '../../models/people/people.model';
import { Squad, SquadCategory } from '../../models/team/team.model';

@Injectable()
export class SquadProvider {

    // Liste des équipes dans Firebase
    private squadRef: AngularFireList<Squad> = this.db.list<Squad>('squads');

    constructor(private db: AngularFireDatabase) { }

    create(): Squad{
        return {
            name: '',
            gender: GenderType.male,
            category: SquadCategory.UP18,
            coachsId: new Array<string>(),
            playersId: new Array<string>()
        };
    }

    getAll(): Observable<Squad[]> {
        return this.squadRef
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
        return this.squadRef.query
            .once(key)
            .then(snapchot => {
                console.log(snapchot);
            })
    }

    add(squad: Squad) {
        return this.squadRef.push(squad);
    }

    update(squad: Squad) {
        return this.squadRef.update(squad.name, squad);
    }

    remove(squad: Squad) {
        return this.squadRef.remove(squad.name);
    }

    search( start: BehaviorSubject<string>, end: BehaviorSubject<string>): Observable<Squad[]> {
        return Observable.zip(start, end).switchMap( param => {
            return this.db.list("/squads", ref =>
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