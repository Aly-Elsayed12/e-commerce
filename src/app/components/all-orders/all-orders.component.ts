import { CartItems } from './../../core/interfaces/cart-items';
import { CartItem } from './../../core/interfaces/iall-order';

import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { IAllOrder } from '../../core/interfaces/iall-order';
import { TranslateModule } from '@ngx-translate/core';
import { Icart } from '../../core/interfaces/icart';



@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit {

  private readonly _OrdersService = inject(OrdersService)

  userId !: string
  userdata!:any
  OrderItem!:number

  AllOrderList !: IAllOrder[]




  activeModalId: number | null = null;

  openModal(id: number): void {
    this.activeModalId = id;
  }
  closeModal(): void {
    this.activeModalId = null;
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }

  ngOnInit():void{
      this.userdata = jwtDecode( localStorage.getItem("token") !);
      this.userId = this.userdata.id
          this._OrdersService.getAllOrder(this.userId).subscribe({
              next:(res)=>{
                this.AllOrderList = res
                this.OrderItem = this.AllOrderList.length
              },
              error:(err)=>{
                console.log(err);
              }
          })
      }
  }







