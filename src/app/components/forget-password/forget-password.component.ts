import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {


    private readonly _FormBuilder = inject(FormBuilder)
    private readonly _AuthService =inject(AuthService)
    private readonly _Router =inject(Router)

    step:number =1
    isLoading:boolean =false
    mesSuccess:boolean =false
    errMes:string =""


  verifyEmail: FormGroup = this._FormBuilder.group({
    email: [null , [Validators.required , Validators.email]]
})
  verifyCode: FormGroup = this._FormBuilder.group({
    resetCode: [null , [Validators.required , Validators.pattern(/^[0-9]{6}$/)]]
})
  restPassword: FormGroup = this._FormBuilder.group({
    email:[null , [Validators.required, Validators.email]],
    newPassword:[null , [Validators.required,  Validators.pattern(/^.{5,}$/)]],
})

sumbitVerifyEmail():void{
  if(this.verifyEmail.valid){
    this.isLoading = true
    this._AuthService.setverifyEmail(this.verifyEmail.value).subscribe({
      next:(res)=>{
        this.isLoading = false
          if(res.statusMsg == "success"){
            this.mesSuccess = true
            setTimeout(() => {
              this.step = 2
              this.mesSuccess = false
              this.errMes = ""
            }, 3000);
          }
      },
      error:(err)=>{
        this.isLoading = false
        this.errMes = err.error.message
      }
    })
  }else{
    this.verifyEmail.markAllAsTouched()
  }
}
sumbitVerifyCode():void{
  if(this.verifyCode.valid){
    this.isLoading = true
    this._AuthService.setverifycode(this.verifyCode.value).subscribe({
      next:(res)=>{
        this.isLoading = false
          if(res.status == "Success"){
            this.mesSuccess = true
            setTimeout(() => {
              this.step = 3
              this.mesSuccess = false
            }, 3000);

          }
      },
      error:(err)=>{
        this.isLoading = false
        this.mesSuccess = false
        this.errMes = err.error.message
      }
    })
  }else{
    this.verifyCode.markAllAsTouched()
  }
}
sumbitNewPass():void{
  if(this.restPassword.valid){
    this.isLoading = true
    this.mesSuccess = false
    this._AuthService.restPass(this.restPassword.value).subscribe({
      next:(res)=>{
        this.isLoading = false
        this.mesSuccess = true
        setTimeout(()=>{

          localStorage.setItem("token", res.token)
          this._AuthService.saveUserData()

          this._Router.navigate(["/home", ])
        }, 3000 )
      },
      error:(err)=>{
        this.isLoading = false
        this.errMes = err.error.message
      }
    })
  }else{
    this.verifyCode.markAllAsTouched()
  }
}



}
