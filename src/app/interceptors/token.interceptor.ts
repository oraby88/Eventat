import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../shared/services/auth/login.service';
import { AuthService } from '../shared/services/auth/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  // if (typeof window !== 'undefined' && localStorage) {
    // const token = localStorage.getItem('token')!;

    //get token form login service
    const authToken = inject(AuthService).getToken();
    if (authToken) {
      const cloneRequest = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${authToken}`),
      });

      return next(cloneRequest);
    }
    else {
      return next(req);
    }

};
