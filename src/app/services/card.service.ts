import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private urlCheckout = environment.url + 'stripe/payment';
  private urlSubscription = environment.url + 'stripe/subscription';

  constructor(private httpClient: HttpClient) {

  }

  checkout(payment): Observable<any> {
    return this.httpClient.post<any>(this.urlCheckout + '/', payment);
  }

  subscription(payment): Observable<any> {
    return this.httpClient.post<any>(this.urlCheckout + '/', payment);
  }
}
