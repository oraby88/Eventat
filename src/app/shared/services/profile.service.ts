import { HttpClient } from '@angular/common/http';
import { ApplicationRef, inject, Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { first, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements OnDestroy {
  // private socket: Socket;
  constructor(private http:HttpClient) {

    // this.socket = io('http://localhost:4200', { autoConnect: false });

    // inject<any>(ApplicationRef).isStable.pipe(
    //   first((isStable:any) => isStable))
    // .subscribe(() => { this.socket.connect() });
   }

  getUser():Observable<any>{
   return this.http.get(`${environment.Server_URL}/profile`);
  }
  ngOnDestroy(): void {
    // if (this.socket) {
    //   this.socket.disconnect(); // Properly close the socket connection on component destroy
    // }
  }
}
