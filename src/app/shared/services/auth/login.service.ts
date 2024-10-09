import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // private tokenSubject = new BehaviorSubject<string | null>(
  //   localStorage.getItem('token')
  // );
  // token$ = this.tokenSubject.asObservable();

  constructor(private _HttpClient: HttpClient, private _Route: Router) {}

  user_login(person: any): Observable<any> {
    return this._HttpClient.post(`${environment.Server_URL}/login`, person);
  }

  // loginWithGoogle(email: string, name: string): Observable<any> {
  //   return this._HttpClient.post(environment.Server_URL + '/social-login', {
  //     email,
  //     name,
  //   });
  // }

  // loginWithFacebook(name: string, social_id: string): Observable<any> {
  //   return this._HttpClient.post(
  //     environment.Server_URL + '/social-login-with-facebook',
  //     { name, social_id }
  //   );
  // }

  setToken(token: string): void {
    if (typeof window !== 'undefined' && localStorage) {
    localStorage.setItem('token', token);
    }
    // this.tokenSubject.next(token);
  }
  getToken(): string {
    return localStorage.getItem('token')!;
  }

}
