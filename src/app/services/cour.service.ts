import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cours} from '../models/Cours';
import {Response} from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class CourService {


  private root = environment.url + 'cours';

  constructor(private http: HttpClient) {
  }

  all(page: number, taille: number): Observable<any> {
    return this.http.get(this.root + '/?page=' + page + '&taille=' + taille);
  }

  allByModule(idModule: number, page: number, taille: number): Observable<any> {
    return this.http.get(this.root + '/allByModule/' + idModule + '?page=' + page + '&taille=' + taille);
  }

  getOne(idCours: number): Observable<Cours> {
    return this.http.get<Cours>(this.root + '/getOne/' + idCours);
  }

  create(cours: Cours): Observable<Cours> {
    return this.http.post<Cours>(this.root + '/', cours);
  }

  update(cours: Cours): Observable<Cours> {
    return this.http.put<Cours>(this.root + '/', cours);
  }

  delete(idCours: number): Observable<Response> {
    return this.http.delete<Response>(this.root + '/delete/' + idCours);
  }
}
