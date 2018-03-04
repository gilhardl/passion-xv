
import { Injectable } from "@angular/core";
import { firestore } from "firebase/app";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';

import { GenderType } from '../../models/people/people.model';
import { Squad, SquadCategory } from '../../models/team/team.model';

@Injectable()
export class SquadProvider {

    private teamsPath: string = '/teams/';

    constructor(private db: AngularFirestore) { }

    create(): Squad{
        return {
            name: '',
            gender: GenderType.male,
            category: SquadCategory.UP18,
            coachsId: new Array<string>(),
            playersId: new Array<string>()
        };
    }

    // Renvoi toutes les équipes d'un club
    getAllByTeam(teamId: string): Observable<Squad[]> {
        let squadsRef = this.db.collection<Squad>(this.teamsPath + teamId + '/squads')
        return squadsRef.snapshotChanges().map(actions => {
            return actions.map(action => {
                const data = action.payload.doc.data() as Squad;
                const id = action.payload.doc.id;
                return { id, ...data };
            });
          });
    }

    // Renvoi une équipe
    get(teamId: string, squadId: string): Observable<Squad> {
        let squadsRef = this.db.collection<Squad>(this.teamsPath + teamId + '/squads')
        return squadsRef.doc<Squad>(squadId).valueChanges();
    }

    // Ajoute une équipe
    add(teamId: string, squad: Squad): Promise<firestore.DocumentReference> {
        let squadsRef = this.db.collection<Squad>(this.teamsPath + teamId + '/squads');
        return squadsRef.add(squad);
    }

    // Modifie une équipe
    update(teamId: string, squad: Squad): Promise<void> {
        let squadsRef = this.db.collection<Squad>(this.teamsPath + teamId + '/squads');
        return squadsRef.doc(squad.id).update(squad);
    }

    // Supprime une équipe
    delete(teamId: string, squad: Squad): Promise<void> {
        let squadsRef = this.db.collection<Squad>(this.teamsPath + teamId + '/squads');
        return squadsRef.doc(squad.id).delete();
    }
}