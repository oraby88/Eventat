import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _HttpClient: HttpClient) { }

  user_Resigter(Data: any): Observable<any> {
    return this._HttpClient.post(`${environment.Server_URL}/register`, Data);
  }


  setToken(token: string): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
