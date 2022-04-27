import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ISquad, ISquadResponse } from './../../app/models/squad.model';
import { environment } from './../../environments/environment';
import { Page } from 'src/app/models/page.model';

@Injectable({
  providedIn: 'root'
})
export class SquadService {
  
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  
    constructor(private http: HttpClient) { }

    getSquads(page: Page): Observable<ISquadResponse> {
      return this.http.get<ISquadResponse>(environment.apiUrl + 'api/Squad?PageSize=' + page.pageSize + '&PageNumber=' + page.currentPage);
      }
  
    getAllSquads(): Observable<ISquad[]> {
      return this.http.get<ISquad[]>(environment.apiUrl + '/api/Squad/All');
    }
  
    saveSquad(input : ISquad): Observable<ISquad> {
      return this.http.post<ISquad>(environment.apiUrl + 'api/Squad', input);
    }

    updateSquad(input : ISquad): Observable<ISquad> {
      return this.http.put<ISquad>(environment.apiUrl + 'api/Squad/'+ input.id, input);
    }

    deleteSquad(input : ISquad): Observable<ISquad> {
      return this.http.delete<ISquad>(environment.apiUrl + 'api/Squad/' + input.id, {
        body: input
      });
    }
  
  }