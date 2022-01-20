import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseMessage } from '../models/response-message';
import { ApplicationService } from './application.service';

const httpOptions = {
  headers : new HttpHeaders({
    //'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Origin': 'http://localhost:4200'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UploadService {


  private root = environment.url + 'files/';

  constructor(private http: HttpClient, private application: ApplicationService) { }

  upload(file: File): Observable<ResponseMessage>{

    const formdata = new FormData();

    formdata.append('file', file);

    return this.http.post<ResponseMessage>(this.root + 'upload', formdata);
  }

  download(username: string): Observable<HttpEvent<Blob>>{
    return this.http.get(this.root + username, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  stream(username: string): Observable<any>{//{fileName}
    return this.http.get(this.root + 'video/' + username, httpOptions);
  }
}


