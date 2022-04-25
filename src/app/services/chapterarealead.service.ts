import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IChapterAreaLead, IChapterAreaLeadResponse } from './../../app/models/chapterarealead.model';
import { environment } from './../../environments/environment';
import { Page } from 'src/app/models/page.model';

@Injectable({
  providedIn: 'root'
})
export class ChapterAreaLeadService {
  
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  
    constructor(private http: HttpClient) { }
  
    getChapterAreaLeads(page: Page): Observable<IChapterAreaLeadResponse> {
      // return this.http.get<ITeamMember[]>(environment.apiUrl + '/api/coin');
    return this.http.get<IChapterAreaLeadResponse>(environment.apiUrl + 'api/ChapterArea?PageSize=' + page.pageSize + '&PageNumber=' + page.currentPage);
    }
    getAllChapterAreaLeads(): Observable<IChapterAreaLead[]> {
    // return this.http.get<ITeamMember[]>(environment.apiUrl + '/api/coin');
    return this.http.get<IChapterAreaLead[]>(environment.apiUrl + 'api/ChapterArea/All');
    }
  
    saveChapterAreaLead(input : IChapterAreaLead): Observable<IChapterAreaLead> {
      return this.http.post<IChapterAreaLead>(environment.apiUrl + 'api/ChapterArea', input);
    }

    updateChapterAreaLead(input : IChapterAreaLead): Observable<IChapterAreaLead> {
      return this.http.put<IChapterAreaLead>(environment.apiUrl + 'api/ChapterArea/'+ input.id, input);
    }

    deleteChapterAreaLead(input : IChapterAreaLead): Observable<IChapterAreaLead> {
      return this.http.delete<IChapterAreaLead>(environment.apiUrl + 'api/ChapterArea/' + input.id, {
        body: input
      });
    }
  
  }
