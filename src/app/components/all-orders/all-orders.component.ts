import { CartItem } from './../../core/interfaces/iall-order';

import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { IAllOrder } from '../../core/interfaces/iall-order';


@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit {

  private readonly _OrdersService = inject(OrdersService)

  userId !: string
  userdata!:any

  AllOrderList !: IAllOrder[]

  ngOnInit():void{
      this.userdata = jwtDecode( localStorage.getItem("token") !);
      this.userId = this.userdata.id
      console.log(this.userId);
          this._OrdersService.getAllOrder(this.userId).subscribe({
              next:(res)=>{
                console.log(res);
              },
              error:(err)=>{
                console.log(err);
              }
          })
      }
  }







