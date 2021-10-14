import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap, share, retry} from 'rxjs/operators';

@Injectable()
export class ContractsService {

  private allContracts$: Observable<any>;

  constructor(private http: HttpClient) {
    this.allContracts$ = timer(1, 3000).pipe(
      switchMap(() => 
          http.get('http://localhost:8081/consulta')
        ),
      retry(),
      tap(),
      share()
    );
  }

  getAllContracts() {
    return this.allContracts$;
  }
}
//ngmocks
//jsdom
//web worker