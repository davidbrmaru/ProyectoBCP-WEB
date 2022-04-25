import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Page } from '../models/page.model';
import { IChapterLead, IChapterLeadResponse } from './../../app/models/chapterlead.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChapterLeadService {
  
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  
  constructor(private http: HttpClient) { }

    getChapterLeads(page: Page): Observable<IChapterLeadResponse> {
      return this.http.get<IChapterLeadResponse>(environment.apiUrl + 'api/Chapter?PageSize=' + page.pageSize + '&PageNumber=' + page.currentPage);
    }
    getAllChapterLeads(): Observable<IChapterLead[]> {
      return this.http.get<IChapterLead[]>(environment.apiUrl + 'api/Chapter/All');
    }
  
    saveChapterLead(input : IChapterLead): Observable<IChapterLead> {
      return this.http.post<IChapterLead>(environment.apiUrl + 'api/Chapter', input);
    }

    updateChapterLead(input : IChapterLead): Observable<IChapterLead> {
      return this.http.put<IChapterLead>(environment.apiUrl + 'api/Chapter/'+input.id, input);
    }

    deleteChapterLead(input : IChapterLead): Observable<IChapterLead> {
      return this.http.delete<IChapterLead>(environment.apiUrl + 'api/Chapter/' + input.id, {
        body:input
      });
    }
  
  }
