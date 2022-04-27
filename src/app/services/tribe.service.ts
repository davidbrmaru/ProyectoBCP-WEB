import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ITribe , ITribeResponse } from './../../app/models/tribe.model';
import { environment } from './../../environments/environment';
import { Page } from 'src/app/models/page.model';

@Injectable({
  providedIn: 'root'
})
export class TribeService { 
  
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  
    constructor(private http: HttpClient) { }
  
    getTribes(page: Page): Observable<ITribeResponse> {
      return this.http.get<ITribeResponse>(environment.apiUrl + 'api/Tribe?PageSize=' + page.pageSize + '&PageNumber=' + page.currentPage);
      }

    getAllTribes(): Observable<ITribe[]> {
      return this.http.get<ITribe[]>(environment.apiUrl + 'api/Tribe/All');
    }
  
    saveTribe(input : ITribe): Observable<ITribe> {
      return this.http.post<ITribe>(environment.apiUrl + 'api/Tribe', input);
    }

    updateTribe(input : ITribe): Observable<ITribe> {
      return this.http.put<ITribe>(environment.apiUrl + 'api/Tribe/'+ input.id, input);
    }

    deleteTribe(input : ITribe): Observable<ITribe> {
      return this.http.delete<ITribe>(environment.apiUrl + 'api/Tribe/' + input.id, {
        body: input
      });
    }
  
  }