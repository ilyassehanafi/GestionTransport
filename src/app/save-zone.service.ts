import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveZoneService {

  constructor(private http: HttpClient) { }

  saveZone(jsonZone: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json'};
    return this.http.post('http://localhost:8093/test', jsonZone,{responseType: 'text'});
    }
}




