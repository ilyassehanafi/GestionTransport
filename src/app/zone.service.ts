import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(private http: HttpClient) { }

  saveZone(jsonZone: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json', 'responseType': 'text'};
    return this.http.post('http://localhost:8093/saveZone', jsonZone,{headers});
  }
  getZone(jsonZone: any): Observable<any> {
      const headers = { 'Content-Type': 'application/json', 'responseType': 'text'};
      return this.http.get('http://localhost:8093/getZone',{headers});
  }

}




