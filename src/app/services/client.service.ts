import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url = environment.url + 'client';

  constructor(private http: HttpClient) {
  }

  get(): Observable<Client> {
    return this.http.get<Client>(this.url + '/');
  }

  find(idClient): Observable<Client> {
    return this.http.get<Client>(this.url + '/getOneClient/' + idClient);
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.url + '/', client);
  }

  update(client: Client): Observable<Client> {
    return this.http.post<Client>(this.url + '/', client);
  }

  delete(idClient): Observable<Client> {
    return this.http.get<Client>(this.url + '/' + idClient);
  }

}
