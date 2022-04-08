import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IApplication } from './../../app/models/application.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  
    constructor(private http: HttpClient) { }
  
    getAllApplications(): Observable<IApplication[]> {
      // return this.http.get<ITeamMember[]>(environment.apiUrl + '/api/coin');
      return this.http.get<IApplication[]>('https://624244c9b6734894c14ef409.mockapi.io/api/v1/team_menber');
    }
  
    saveApplication(input : IApplication): Observable<IApplication> {
      return this.http.post<IApplication>(environment.apiUrl + '/api/.../..', input);
    }

    updateApplication(input : IApplication): Observable<IApplication> {
      return this.http.put<IApplication>(environment.apiUrl + '/api/.../..', input);
    }

    deleteApplication(id : number): Observable<IApplication> {
      return this.http.patch<IApplication>(environment.apiUrl + '/api/.../..', id);
    }
  
  }