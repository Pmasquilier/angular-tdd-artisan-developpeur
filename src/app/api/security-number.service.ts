import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SecurityNumberService {
  constructor(private http: HttpClient) {}

  validate(securityNumber: string): Observable<boolean> {
    return this.http.get('https://api.test/validate/' + securityNumber).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
