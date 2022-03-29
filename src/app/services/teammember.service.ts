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
      debugger;
      return this.http.get<ITeamMember[]>('https://624244c9b6734894c14ef409.mockapi.io/api/v1/team_menber');    
    }
  
    // executeChange(input : IChangeInput): Observable<IChangeOutput> {
    //   return this.http.post<IChangeOutput>(environment.apiUrl + '/api/coin/executeChange',input);
    // }
  
  }