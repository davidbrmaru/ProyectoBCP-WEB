import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ITribe } from './../../app/models/tribe.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TribeService {
  
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  
    constructor(private http: HttpClient) { }
  
    getAllTribes(): Observable<ITribe[]> {
      // return this.http.get<ITeamMember[]>(environment.apiUrl + '/api/coin');
      return this.http.get<ITribe[]>(environment.apiUrl + '/api/.../..');
    }
  
    saveTribe(input : ITribe): Observable<ITribe> {
      return this.http.post<ITribe>(environment.apiUrl + '/api/.../..', input);
    }

    updateTribe(input : ITribe): Observable<ITribe> {
      return this.http.put<ITribe>(environment.apiUrl + '/api/.../..', input);
    }

    deleteTribe(id : string): Observable<ITribe> {
      return this.http.patch<ITribe>(environment.apiUrl + '/api/.../..', id);
    }
  
  }