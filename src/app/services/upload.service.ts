import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseMessage } from '../models/response-message';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private root = environment.url + 'files/';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<ResponseMessage>{

    const formdata = new FormData();

    formdata.append('file', file);

    return this.http.post<ResponseMessage>(this.root + 'upload', formdata);
  }

  downloadFileToStorage(username: string): Observable<HttpEvent<Blob>>{
    return this.http.get(this.root + 'download/' + username, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

}
