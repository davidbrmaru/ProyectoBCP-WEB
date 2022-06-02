import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IUsuario, IUsuarioResponse } from './../../app/models/usuario.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usr:string, pass:string){
      return new Observable(observer => {
        if(usr != 'admin' || pass != 'admin') return observer.next(false);
        this.saveSessionInLocalStorage()
        return observer.next(true);
      });
  }

  saveSessionInLocalStorage(){
    console.log("entro local storage")
    localStorage.setItem('auth','success')
  }

  getSessionFromLocalStorage(){
      return localStorage.getItem('auth')
  }

  removeSessionFromLocalStorage(){
    localStorage.removeItem('auth')
  }
}
