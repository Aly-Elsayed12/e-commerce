import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private  _HttpClient : HttpClient) { }


  checkOutVise(idCart:string | null , shippingDetails:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=${environment.urlServer}`,
      {"shippingAddress":shippingDetails},

    )
  }
  checkOutCash(idCart:string | null , shippingDetails:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}`,
      {"shippingAddress":shippingDetails},

    )
  }


  getAllOrder(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)
  }

}
