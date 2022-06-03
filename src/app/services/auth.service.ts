import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ILogin } from '../models/login.model';
import { IUsuario, IUsuarioResponse } from './../../app/models/usuario.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  iLogin: ILogin = new ILogin();
  constructor(private http: HttpClient) {}

  autenticacion(usr: string, pass: string) {
    this.iLogin.matricula = usr;
    this.iLogin.password = pass;
    return new Observable((observer) => {
      this.auth(this.iLogin).subscribe(
        (data) => {
          this.saveSessionInLocalStorage();
          this.saveTokenInLocalStorage(data.token);
          this.iLogin.token = data.token
          return observer.next(true);
        },
        (error) => {
          return observer.next(false);
        }
      );
    });
  }

  auth(login: ILogin): Observable<ILogin> {
    return this.http.post<ILogin>(environment.apiUrl + 'api/login', login);
  }

  saveTokenInLocalStorage(token: string) {
    console.log('entro local storage');
    localStorage.setItem('token', token);
  }

  saveSessionInLocalStorage() {
    console.log('entro local storage');
    localStorage.setItem('auth', 'success');
  }

  getSessionFromLocalStorage() {
    return localStorage.getItem('auth');
  }

  removeSessionFromLocalStorage() {
    localStorage.removeItem('auth');
  }
}
