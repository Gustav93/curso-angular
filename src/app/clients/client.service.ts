import { Injectable } from '@angular/core';
import {Client} from './client';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {User} from '../users/User';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndPoint = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient, private router: Router) { }

  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.urlEndPoint}/list`);
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

  getClient(id): Observable<Client> {
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(err => {
        if (err.status !== 401 && err.error.mensaje) {
          this.router.navigate(['/clientes']);
          if (err.error.mensaje) {
            console.error(err.error.mensaje);
          }
        }
        return throwError(err);
      })
    );
  }

  public update(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.urlEndPoint}/${client.id}`, client).pipe(
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

  public delete(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(err => {
        if (err.error.mensaje) {
          console.error(err.error.mensaje);
        }
        return throwError(err);
      })
    );
  }
}
