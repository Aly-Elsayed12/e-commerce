import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  constructor() { }
  private readonly _HttpClient = inject(HttpClient)


  addProductsToWish(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist` ,
      {"productId": id},

    )
  }

  deleteProductsFromWish(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}` ,
    )
  }

  getWishDetalise():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist` ,
    )
}
}
