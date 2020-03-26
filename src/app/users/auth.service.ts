import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // tslint:disable-next-line:variable-name
  private _user: User;

  // tslint:disable-next-line:variable-name
  private _token: string;

  constructor(private http: HttpClient) { }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token')) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  public get user(): User {
    if (this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('user')) {
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }
    return new User();
  }

  login(user: User): Observable<any> {
    const url = 'http://localhost:8080/oauth/token';
    const credential = btoa('angular-app' + ':' + '0303456');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credential
    });
    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);

    return this.http.post<any>(url, params.toString(), {headers: httpHeaders});
  }

  saveUser(accessToken: string): void {
    const payload = this.getTokenData(accessToken);
    this._user = new User();
    this._user.name = payload.name;
    this._user.username = payload.username;
    this._user.email = payload.email;
    this._user.username = payload.user_name;
    this._user.authorities = payload.authorities;
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }

  saveToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', this.token);
  }

  getTokenData(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    const payload = this.getTokenData(this.token);
    return payload != null && payload.user_name && payload.user_name.length > 0;
  }

  logout(): void {
    this._user = null;
    this._token = null;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  hasRole(role: string): boolean {
    return this.user.authorities.includes(role);
  }
}
