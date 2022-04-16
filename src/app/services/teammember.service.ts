import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ITeamMember } from './../../app/models/teammember.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {
  
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  
    constructor(private http: HttpClient) { }
  
    getAllTeamMembers(): Observable<ITeamMember[]> {
      // return this.http.get<ITeamMember[]>(environment.apiUrl + '/api/coin');
      return this.http.get<ITeamMember[]>('https://localhost:44389/api/TeamMember');
    }
  
    saveTeamMember(input : ITeamMember): Observable<ITeamMember> {
      return this.http.post<ITeamMember>(environment.apiUrl + '/api/.../..', input);
    }

    updateTeamMember(input : ITeamMember): Observable<ITeamMember> {
      return this.http.put<ITeamMember>(environment.apiUrl + '/api/.../..', input);
    }

    deleteTeamMember(id: number): Observable<ITeamMember> {
      return this.http.patch<ITeamMember>(environment.apiUrl + '/api/.../..', id);
    }
  
  }
