import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IChapterAreaLead } from './../../app/models/chapterarealead.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChapterAreaLeadService {
  
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  
    constructor(private http: HttpClient) { }
  
    getAllChapterAreaLeads(): Observable<IChapterAreaLead[]> {
      // return this.http.get<ITeamMember[]>(environment.apiUrl + '/api/coin');
      return this.http.get<IChapterAreaLead[]>('https://624244c9b6734894c14ef409.mockapi.io/api/v1/team_menber');
    }
  
    saveChapterAreaLead(input : IChapterAreaLead): Observable<IChapterAreaLead> {
      return this.http.post<IChapterAreaLead>(environment.apiUrl + '/api/.../..', input);
    }

    updateChapterAreaLead(input : IChapterAreaLead): Observable<IChapterAreaLead> {
      return this.http.put<IChapterAreaLead>(environment.apiUrl + '/api/.../..', input);
    }

    deleteChapterAreaLead(id : number): Observable<IChapterAreaLead> {
      return this.http.patch<IChapterAreaLead>(environment.apiUrl + '/api/.../..', id);
    }
  
  }