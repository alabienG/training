import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../../models/Client';
import {AbonnementClient} from '../../models/AbonnementClient';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  private url = environment.url + 'client';

  constructor(private http: HttpClient) {

  }


  getAll(page: number, taille: number): Observable<Client[]> {
    return this.http.get<Client[]>(this.url + '/?page=' + page + '&taille=' + taille);
  }

  register(client: Client): Observable<Client> {
    console.log(client);
    return this.http.post<Client>(this.url + '/', client);
  }

  getCurrentAbonnement(idClient: number): Observable<AbonnementClient> {
    return this.http.get<AbonnementClient>(this.url + '/getCurrent/' + idClient);
  }


}
