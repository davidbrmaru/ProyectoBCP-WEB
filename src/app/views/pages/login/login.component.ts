import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ILogin } from 'src/app/models/login.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usr:string
  pass:string
  login: ILogin
  isBadCredentials:boolean
  @ViewChild('loginForm') registerForm: NgForm;
  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument,
    private _router : Router,
    private authService : AuthService
  ) { 
    this.isBadCredentials = false
  }

  doLogin(){
    this.authService.autenticacion(this.usr,this.pass).subscribe((auth:any) =>{
      if (auth)this._router.navigate(['dashboard']).then()
      else this.isBadCredentials = true;
    });
    
  }
}
