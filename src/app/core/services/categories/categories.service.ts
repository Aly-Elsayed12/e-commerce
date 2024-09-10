import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { subscribe } from 'diagnostics_channel';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly _HttpClient = inject(HttpClient)
  constructor() { }



  getAllCategories():Observable<any>{
    return  this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`)
  }



  getAllٍSubCategories(id:string):Observable<any>{
    return  this._HttpClient.get(`${environment}/api/v1/categories/${id}`)
  }
}
