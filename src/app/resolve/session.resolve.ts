import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/internal/operators/tap';
import { SessionService } from '../service/session.service';


@Injectable()
export class SessionResolver implements Resolve<Observable<String>> {

    constructor(private oSessionService: SessionService) { }

    resolve(): Observable<String> {        
        return this.oSessionService.check().pipe(
            tap((u: String) => console.log("session.service check HTTP request executed: ", u)),            
            catchError(err => of(null) )
          );
    }
}