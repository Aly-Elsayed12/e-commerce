import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink , TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {

  errMes:string =""
  isLoading:boolean =false
  mesSuccess:boolean =false

  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)

  reigisterSubmitSub!:Subscription

  register: FormGroup = this._FormBuilder.group({
      name:[null , [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email:[null , [Validators.required, Validators.email]],
      password:[null , [Validators.required,  Validators.pattern(/^.{6,}$/)]],
      rePassword: [null ],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  }, {validators: this.confirmPassword})

confirmPassword(g:AbstractControl){
  if(g.get("password")?.value === g.get("rePassword")?.value){
    return null
  }else{
    return {misMatch:true}
  }
}

reigisterSubmit(){
  if(this.register.valid){
    this.isLoading = true

    this.reigisterSubmitSub =  this._AuthService.setRigisterForm(this.register.value).subscribe({
      next:(res:any)=>{
        this.isLoading = false
        if(res.message){
          this.mesSuccess = true
          setTimeout(()=>{
            this._Router.navigate(["/login", ])
          }, 3000 )
        }
      },
      error:(err:HttpErrorResponse)=>{
        this.isLoading = false
        this.errMes = err.error.message
      }
    })
  }else{
    this.register.markAllAsTouched()
  }

}


ngOnDestroy(): void {
  if(this.reigisterSubmitSub){
    this.reigisterSubmitSub.unsubscribe()
  }
}
}


