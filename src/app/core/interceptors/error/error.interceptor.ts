import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {


  const _ToastrService =inject(ToastrService)

  return next(req).pipe(catchError( (err)=>{

    if(req.url.includes("cart") || req.url.includes("home") || req.url.includes("brands") ||req.url.includes("categoires") || req.url.includes("wish-list") || req.url.includes("ProductDetalise") || req.url.includes("allorders") || req.url.includes("orders"))

    _ToastrService.error(err.error.message , "freshCart")


    return throwError(() =>err)
  }));
};
