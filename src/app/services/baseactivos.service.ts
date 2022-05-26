import { HttpHeaders, HttpClient } from '@angular/common/http';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { __param } from 'tslib';
import { environment } from './../../environments/environment';
import { Page } from 'src/app/models/page.model';
import { IBaseActivo, IBaseActivosResponse } from '../models/baseactivo.model';

@Injectable({
  providedIn: 'root'
})
export class BaseActivosService {
  
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  
    constructor(private http: HttpClient) { }
  
    getBaseActivos(page: Page): Observable<IBaseActivosResponse> {
      return this.http.get<IBaseActivosResponse>(environment.apiUrl + 'api/BaseActivo?PageSize=' + page.pageSize+ '&PageNumber='+page.currentPage);
        //return this.http.get<ITeamMember[]>(environment.apiUrl + 'api/TeamMember');
    }
  
    saveBaseActivo(input : IBaseActivo): Observable<IBaseActivo> {
      return this.http.post<IBaseActivo>(environment.apiUrl + 'api/BaseActivo', input);
    }
  
  }
