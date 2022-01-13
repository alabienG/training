import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Offre} from '../models/Offre';
import {Response} from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  private root = environment.url + 'offre';

  constructor(private http: HttpClient) {
  }

  getAll(page: number, taille: number): Observable<any> {
    return this.http.get(this.root + '/?page=' + page + '&taille=' + taille);
  }

  getOne(idOffre: number): Observable<Offre> {
    return this.http.get<Offre>(this.root + '/getOne/' + idOffre);
  }

  create(offre: Offre): Observable<Offre> {
    return this.http.post<Offre>(this.root + '/', offre);
  }

  update(offre: Offre): Observable<Offre> {
    return this.http.put<Offre>(this.root + '/', offre);
  }

  delete(idOffre: number): Observable<Response> {
    return this.http.delete<Response>(this.root + '/delete/' + idOffre);
  }

}
