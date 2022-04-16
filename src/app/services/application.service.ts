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
      return this.http.get<IApplication[]>(environment.apiUrl + 'api/Application');
    }
  
    saveApplication(input : IApplication): Observable<IApplication> {
      return this.http.post<IApplication>(environment.apiUrl + '/api/Application', input);
    }

    updateApplication(input : IApplication): Observable<IApplication> {
      return this.http.put<IApplication>(environment.apiUrl + '/api/Application', input);
    }

    deleteApplication(input : IApplication): Observable<IApplication> {
      return this.http.patch<IApplication>(environment.apiUrl + '/api/Application/' + input.id, input);
    }
  
  }
