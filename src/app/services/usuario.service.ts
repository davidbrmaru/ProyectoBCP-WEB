import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IUsuario, IUsuarioResponse } from './../../app/models/usuario.model';
import { environment } from './../../environments/environment';
import { Page } from 'src/app/models/page.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  getUsuarios(page: Page): Observable<IUsuarioResponse> {
    return this.http.get<IUsuarioResponse>(environment.apiUrl + 'api/User?PageSize=' + page.pageSize + '&PageNumber=' + page.currentPage);
  }

  getAllUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(environment.apiUrl + 'api/User/All');
  }

  saveUsuario(input: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(environment.apiUrl + 'api/User', input);
  }

  updateUsuario(input: IUsuario): Observable<IUsuario> {
    return this.http.put<IUsuario>(environment.apiUrl + 'api/User/' + input.id, input);
  }

  deleteUsuario(input: IUsuario): Observable<IUsuario> {
    return this.http.delete<IUsuario>(environment.apiUrl + 'api/User/' + input.id, {
      body: input
    });
  }

}
