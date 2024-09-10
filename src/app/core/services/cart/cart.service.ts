 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private readonly _HttpClient : HttpClient) { }


  cartnumber:BehaviorSubject<number> = new BehaviorSubject(0)


addProductsToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart` ,
      {"productId": id},

    )
  }

  getCatDetalise():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart` ,
    )
  }
  deleteSpecificCartItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}` ,

    )
  }
  updataProductQuantity(id:string , newCount:number):Observable<any>{
    return  this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
    {"count": newCount},

  )
  }
  deleteAllCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart` ,

    )
  }
}
