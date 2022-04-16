import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ISquad } from './../../app/models/squad.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SquadService {
  
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  
    constructor(private http: HttpClient) { }
  
    getAllSquads(): Observable<ISquad[]> {
      // return this.http.get<ITeamMember[]>(environment.apiUrl + '/api/coin');
      return this.http.get<ISquad[]>(environment.apiUrl + '/api/.../..');
    }
  
    saveSquad(input : ISquad): Observable<ISquad> {
      return this.http.post<ISquad>(environment.apiUrl + '/api/.../..', input);
    }

    updateSquad(input : ISquad): Observable<ISquad> {
      return this.http.put<ISquad>(environment.apiUrl + '/api/.../..', input);
    }

    deleteSquad(id : string): Observable<ISquad> {
      return this.http.patch<ISquad>(environment.apiUrl + '/api/.../..', id);
    }
  
  }