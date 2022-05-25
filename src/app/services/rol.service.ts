import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IRol, IRolResponse } from './../../app/models/rol.model';
import { environment } from './../../environments/environment';
import { Page } from 'src/app/models/page.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  
    constructor(private http: HttpClient) { }
  
    getRols(page: Page): Observable<IRolResponse> {
    return this.http.get<IRolResponse>(environment.apiUrl + 'api/Rol?PageSize=' + page.pageSize + '&PageNumber=' + page.currentPage);
    }

    getAllRols(): Observable<IRol[]> {
      return this.http.get<IRol[]>(environment.apiUrl + 'api/Rol/All');
    }
  
    saveRol(input : IRol): Observable<IRol> {
      return this.http.post<IRol>(environment.apiUrl + 'api/Rol', input);
    }

    updateRol(input: IRol): Observable<IRol> {
      return this.http.put<IRol>(environment.apiUrl + 'api/Rol/'+ input.id, input);
    }

    deleteRol(input: IRol): Observable<IRol> {
      return this.http.delete<IRol>(environment.apiUrl + 'api/Rol/' + input.id, {
        body: input
      });
    }
  
  }
