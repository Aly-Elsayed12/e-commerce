import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { environment } from '../../environments/environments';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {


  const _NgxSpinnerService = inject(NgxSpinnerService)

  if(req.url == `${environment.baseUrl}/api/v1/cart` ||
    req.url == `${environment.baseUrl}/api/v1/brands` ||
    req.url == `${environment.baseUrl}/api/v1/categories` ||
    req.url == `${environment.baseUrl}/api/v1/cart` ||
    req.url.includes("wish-list") ||
    req.url == `${environment.baseUrl}/api/v1/products`||
    req.url.includes("allorders") ||
    req.url.includes("orders")){
    _NgxSpinnerService.show()
  }

  return next(req).pipe(finalize(
    ()=>{
      _NgxSpinnerService.hide()
    }
  ));


};
