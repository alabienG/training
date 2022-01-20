import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbonnementClient } from '../models/AbonnementClient';
import { Client } from '../models/Client';
import { Offre } from '../models/Offre';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {

  private url = environment.url + 'client';

  constructor(private http: HttpClient) {
  }
  
  allByClient(idClient: number): Observable<Client> {
    return this.http.get<Client>(this.url + '/findByClient/' + idClient + '/');
  }

  getOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(this.url + '/getOffre');
  }

  oneByClient(idClient: number): Observable<AbonnementClient> {
    return this.http.get<AbonnementClient>(this.url + '/getCurrent/' + idClient + '/');
  }

  create(abonnement: AbonnementClient): Observable<AbonnementClient> {
    return this.http.post<AbonnementClient>(this.url + '/createAbonnement', abonnement);
  }

  update(abonnement: AbonnementClient): Observable<AbonnementClient> {
    return this.http.put<AbonnementClient>(this.url + '/updateAbonnement', abonnement);
  }

  delete(idAbonnement: number): Observable<any> {
    return this.http.get(this.url + '/removeAbonnement/' + idAbonnement + '/');
  }

}
