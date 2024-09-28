import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink , TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  errMes:string =""
  isLoading:boolean =false
  mesSuccess:boolean =false

  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)


  loginSubmiSub!:Subscription

  login: FormGroup = this._FormBuilder.group({
    email:[null , [Validators.required, Validators.email]],
    password:[null , [Validators.required,  Validators.pattern(/^.{6,}$/)]],
})



loginSubmit(){
  if(this.login.valid){
    this.isLoading = true

    this._AuthService.setLoginForm(this.login.value).subscribe({
      next:(res:any)=>{
        this.isLoading = false
        if(res.message){
          this.mesSuccess = true
          setTimeout(()=>{

            localStorage.setItem("token", res.token)
            this._AuthService.saveUserData()

            this._Router.navigate(["/home", ])
          }, 3000 )
        }
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);

        this.isLoading = false
        this.errMes = err.error.message
      }
    })
  }else{
    this.login.markAllAsTouched()
  }
}
ngOnDestroy(): void {
    if(this.loginSubmiSub){
      this.loginSubmiSub.unsubscribe()
    }
}

}
