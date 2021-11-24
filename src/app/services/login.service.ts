import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Client} from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = environment.url + 'client';

  constructor(private http: HttpClient) {
  }

  public generatedCode(email: string): Observable<Client> {
    return this.http.get<Client>(this.url + '/generatedCode/' + email);
  }



}
