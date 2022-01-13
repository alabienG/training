import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Module} from '../models/Module';
import {Response} from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private root = environment.url + 'module';

  constructor(private http: HttpClient) {
  }

  getAll(page: number, taille: number): Observable<any> {
    return this.http.get<any>(this.root + '/?page=' + page + '&taille=' + taille);
  }

  // getAllByOffre(idOffre: number): Observable<Module[]> {
  //   return this.http.get<Module[]>(this.root + '/getAllByOffre/' + idOffre);
  // }
  getPageableAllByOffre(idOffre: number, page: number, taille: number): Observable<any> {
    return this.http.get<any>(this.root + '/getAllByOffre/' + idOffre + '?page=' + page + '&taille=' + taille);
  }

  getOne(idModule: number): Observable<Module> {
    return this.http.get<Module>(this.root + '/getOne/' + idModule);
  }

  create(module: Module): Observable<Module> {
    return this.http.post<Module>(this.root + '/', module);
  }

  update(module: Module): Observable<Module> {
    return this.http.put<Module>(this.root + '/', module);
  }

  delete(idModule: number): Observable<Response> {
    return this.http.delete<Response>(this.root + '/delete/' + idModule);
  }
}
