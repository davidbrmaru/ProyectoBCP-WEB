import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IChapterLead } from './../../app/models/chapterlead.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChapterLeadService {
  
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  
    constructor(private http: HttpClient) { }
  
    getAllChapterLeads(): Observable<IChapterLead[]> {
      // return this.http.get<ITeamMember[]>(environment.apiUrl + '/api/coin');
      return this.http.get<IChapterLead[]>(environment.apiUrl + 'api/Chapter');
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
