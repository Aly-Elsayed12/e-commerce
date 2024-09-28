import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { OrdersService } from '../../core/services/orders/orders.service';
import { CartService } from '../../core/services/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit , OnDestroy {

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ordersService = inject(OrdersService)
  private readonly _Router = inject(Router)
  private readonly _CartService = inject(CartService)

  isLoading:boolean = false
  btnCash:boolean =false
  btnVisa:boolean =false
  cartId:string | null = ""


  orderSubmitWithVisaSub!:Subscription
  orderSubmitWithCashSub!:Subscription
  clearCarSub!:Subscription

  orders: FormGroup = this._FormBuilder.group({
    details:[null , [Validators.required]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city:[null , [Validators.required]],
})

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          this.cartId = params.get("id")
        }
      })
  }


  orderSubmitWithVisa():void{
    this.isLoading = true
    this.btnVisa = true
    this._ordersService.checkOutVise(this.cartId , this.orders.value ).subscribe({
      next:(res)=>{
        this.isLoading = false
        this.btnVisa = false
        if(res.status == "success"){
          window.open(res.session.url , "_self")
        }
      },
      error:(err)=>{
        this.isLoading = false
        this.btnVisa = false
        console.log(err);

      }
    })
  }


  orderSubmitWithCash():void{
    this.isLoading = true
    this.btnCash = true
    this._ordersService.checkOutCash(this.cartId , this.orders.value ).subscribe({
      next:(res)=>{
        this.isLoading = false
        this.btnCash = false
        console.log(res);
        if(res.status == "success"){
          this.clearCart()
          this._Router.navigate(["/allorders"])
        }
      },
      error:(err)=>{
        this.isLoading = false
        this.btnCash = false
        console.log(err);
      }
    })
  }

  clearCart():void{
        this._CartService.deleteAllCart().subscribe({
      next:(res)=>{
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  ngOnDestroy(): void {
    if(this.orderSubmitWithCashSub){
      this.orderSubmitWithCashSub.unsubscribe()
    }
    if(this.orderSubmitWithVisaSub){
      this.orderSubmitWithVisaSub.unsubscribe()
    }
    if(this.clearCarSub){
      this.clearCarSub.unsubscribe()
    }
}

}
