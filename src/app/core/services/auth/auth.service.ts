import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  userData !:any

  private readonly _HttpClient = inject(HttpClient)
  private readonly _Router = inject(Router)

  setRigisterForm(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data)
  }
  setLoginForm(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin` , data)
  }

  saveUserData(){
    if(localStorage.getItem("token") !== null){
      this.userData = jwtDecode( localStorage.getItem("token") !)


    }
  }

  logOut():void{
    localStorage.removeItem("token")
    this.userData = null
    this._Router.navigate(["/login"])
  }



  setverifyEmail(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords` , data)
  }
  setverifycode(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode` , data)
  }
  restPass(data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword` , data)
  }

}
