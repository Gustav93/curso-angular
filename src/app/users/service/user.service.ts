import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../User';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlEndPoint = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient, private router: Router) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlEndPoint}/list`);
  }


}
