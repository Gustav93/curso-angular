import { Injectable } from '@angular/core';
import {CLIENTS} from './clients.json';
import {Client} from './client';
import {Observable, throwError} from 'rxjs';
import {of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../users/auth.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndPoint = 'http://localhost:8080/api/users';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  private setAuthorizationHeader() {
    const token = this.authService.token;

    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.urlEndPoint}/list`, {headers: this.setAuthorizationHeader()}).pipe(
      catchError(err => {
        this.isNotAuthorized(err);
        return throwError(err);
      })
    );
    // return of(CLIENTS);
  }
  create(cliente: Client): Observable<Client> {
    return this.http.post<Client>(`${this.urlEndPoint}/save`, cliente, {headers: this.setAuthorizationHeader()}).pipe(
      map((response: any) => response.cliente as Client),
      catchError(err => {
        if (this.isNotAuthorized(err)) {
          return throwError(err);
        }

        if (err.status === 400) {
          return throwError(err);
        }

        console.error(err.error.mensaje);
        swal.fire(err.error.mensaje, err.error.error, 'error');
        return throwError(err);
      })
    );
  }

  getClient(id): Observable<Client> {
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`, {headers: this.setAuthorizationHeader()}).pipe(
      catchError(err => {
        if (this.isNotAuthorized(err)) {
          return throwError(err);
        }
        this.router.navigate(['/clientes']);
        console.error(err.error.mensaje);
        swal.fire('Error to edit', err.error.error, 'error');
        return throwError(err);
      })
    );
  }

  public update(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.urlEndPoint}/${client.id}`, client, {headers: this.setAuthorizationHeader()}).pipe(
      catchError(err => {
        if (this.isNotAuthorized(err)) {
          return throwError(err);
        }

        if (err.status === 400) {
          return throwError(err);
        }

        console.error(err.error.mensaje);
        swal.fire(err.error.mensaje, err.error.error, 'error');
        return throwError(err);
      })
    );
  }

  public delete(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.urlEndPoint}/${id}`, {headers: this.setAuthorizationHeader()}).pipe(
      catchError(err => {
        if (this.isNotAuthorized(err)) {
          return throwError(err);
        }
        console.error(err.error.mensaje);
        swal.fire('Error to edit', err.error.error, 'error');
        return throwError(err);
      })
    );
  }

  private isNotAuthorized(e): boolean {
    if (e.status === 401) {
      this.router.navigate(['/login']);
      return true;
    } else if (e.status === 403) {
      swal.fire('Unauthorized', `Hi ${this.authService.user.name}, you don't have permissons to use this content`, 'warning');

      this.router.navigate(['/clientes']);
      return true;
    }

  }
}
