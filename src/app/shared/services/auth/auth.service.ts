import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token!: string | null;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  user_login(person: any): Observable<any> {
    return this.http.post(`${environment.Server_URL}/login`, person);
  }

  user_Resigter(Data: any): Observable<any> {
    return this.http.post(`${environment.Server_URL}/register`, Data);
  }

  private tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem("token")
  );
  token$ = this.tokenSubject.asObservable();
  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }
  getToken(): string | null {
    // Check if we are running in the browser
    // if (isPlatformBrowser(this.platformId)) {
    this.token = localStorage.getItem("token");
    return localStorage.getItem('token');
    // }
    // return null; // Return null when SSR
  }



}
