import { Injectable } from '@angular/core';
import {CLIENTS} from './clients.json';
import {Client} from './client';
import {Observable} from 'rxjs';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndPoint = 'http://localhost:8080/api/clients';
  constructor(private http: HttpClient) { }

  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.urlEndPoint);
    // return of(CLIENTS);
  }
}
