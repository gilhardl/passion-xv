
import { Injectable } from '@angular/core';

import { Stadium } from '../../models/stadium/stadium.model';

@Injectable()
export class StadiumProvider {

  constructor() { }

  create(): Stadium {
    return {
      name: '',
      place: ''
    }
  }

}
