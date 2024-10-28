import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getEventsList(): Observable<any> {
    return this.http.get(`${environment.Server_URL}/profile`);
  }
  getQR(id: any
    // location: string,
    // date: string,
    // time: string,
    // type: string,
    // multi_use: number,
    // name_ar:string,name_en:string
  ): Observable<any> {
    return this.http.get(`${environment.Server_URL}/event/${id}`);
  }
  scan(event: any): Observable<any> {
    return this.http.post(`${environment.Server_URL}/scan-qr-code`, event);
  }

}


