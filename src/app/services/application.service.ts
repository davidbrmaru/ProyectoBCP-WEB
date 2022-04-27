import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IApplication, IApplicationResponse } from './../../app/models/application.model';
import { environment } from './../../environments/environment';
import { Page } from 'src/app/models/page.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  
    constructor(private http: HttpClient) { }
  
    getApplications(page: Page): Observable<IApplicationResponse> {
    return this.http.get<IApplicationResponse>(environment.apiUrl + 'api/Application?PageSize=' + page.pageSize + '&PageNumber=' + page.currentPage);
    }

    getAllApplications(): Observable<IApplication[]> {
      return this.http.get<IApplication[]>(environment.apiUrl + 'api/Application/All');
    }
  
    saveApplication(input : IApplication): Observable<IApplication> {
      return this.http.post<IApplication>(environment.apiUrl + 'api/Application', input);
    }

    updateApplication(input : IApplication): Observable<IApplication> {
      return this.http.put<IApplication>(environment.apiUrl + 'api/Application/'+ input.id, input);
    }

    deleteApplication(input : IApplication): Observable<IApplication> {
      return this.http.delete<IApplication>(environment.apiUrl + 'api/Application/' + input.id, {
        body: input
      });
    }
  
  }
