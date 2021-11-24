import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../../models/Client';

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


}
