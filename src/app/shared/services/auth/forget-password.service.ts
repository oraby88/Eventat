import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private http:HttpClient) { }

  forgetPassword(email: string): Observable<any> {
    return this.http.post(environment.Server_URL + '/password/forgot', {
      email,
    });
  }


  newPassword(
    email: string,
    verification_code: string,
    password: string,
    confirm_password: string
  ): Observable<any> {
    return this.http.post(environment.Server_URL + '/new-password', {
      email,
      verification_code,
      password,
      confirm_password,
    });

  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
