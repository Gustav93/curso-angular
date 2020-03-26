import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {User} from '../User';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlEndPoint = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient, private router: Router) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlEndPoint}/list`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`${this.urlEndPoint}/save`, user).pipe(
      map((response: any) => response.user as User),
      catchError(err => {
        if (err.status === 400) {
          return throwError(err);
        }
        if (err.error.mensaje) {
          console.error(err.error.mensaje);
        }
        return throwError(err);
      })
    );
  }

  getClient(id): Observable<User> {
    return this.http.get<User>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(err => {
        if (err.status !== 401 && err.error.mensaje) {
          this.router.navigate(['/users']);
          if (err.error.mensaje) {
            console.error(err.error.mensaje);
          }
        }
        return throwError(err);
      })
    );
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(`${this.urlEndPoint}/${user.id}`, user).pipe(
      catchError(err => {
        if (err.status === 400) {
          return throwError(err);
        }
        if (err.error.mensaje) {
          console.error(err.error.mensaje);
        }
        return throwError(err);
      })
    );
  }

  public delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(err => {
        if (err.error.mensaje) {
          console.error(err.error.mensaje);
        }
        return throwError(err);
      })
    );
  }
}
