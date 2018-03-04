
import { Injectable } from '@angular/core';

@Injectable()
export class UtilsProvider {

  constructor() { }

  getEnumValues(Enum) {
    return (<any>Object).values(Enum).filter( e => typeof( e ) == "number" );
}
}
