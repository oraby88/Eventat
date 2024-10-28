import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(private http:HttpClient) { }

  verificationCode(verification_code: string): Observable<any> {
    var obj = {
      verification_code: verification_code.toString(),
      email: sessionStorage.getItem('email')?.toString(),
    };
    return this.http.post(
      `${environment.Server_URL}/verify-code`,
      obj
    );
  }
}
