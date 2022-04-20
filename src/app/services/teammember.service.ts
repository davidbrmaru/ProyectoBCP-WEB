import { HttpHeaders, HttpClient } from '@angular/common/http';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { __param } from 'tslib';
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
      return this.http.get<ITeamMember[]>(environment.apiUrl + 'api/TeamMember');
    }
  
    saveTeamMember(input : ITeamMember): Observable<ITeamMember> {
      return this.http.post<ITeamMember>(environment.apiUrl + 'api/TeamMember', input);
    }

    updateTeamMember(input : ITeamMember): Observable<ITeamMember> {
      return this.http.put<ITeamMember>(environment.apiUrl + 'api/TeamMember/' + input.id, input);
    }

  deleteTeamMember(input: ITeamMember): Observable<ITeamMember> {
    return this.http.delete<ITeamMember>(environment.apiUrl + 'api/TeamMember/' + input.id, {
      body: input
    });
    }
  
  }
