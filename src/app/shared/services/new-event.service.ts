import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewEventService {

  constructor(private http: HttpClient) { }

  sendEventData(eventDate: FormData): Observable<any> {
    return this.http.post('http://eventbackend.eyegorithm.com/api/event',
      eventDate
    )
  }

  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }

}
