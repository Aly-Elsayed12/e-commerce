import { subscribe } from 'diagnostics_channel';
import { Icart, Product } from './../../core/interfaces/icart';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)

  cartDetalise:Icart = {} as Icart

  getCatDetaliseSub!:Subscription
  removCratItemSub!:Subscription
  UpdateCountSub!:Subscription
  ClearCountSub!:Subscription


  isLoading:boolean =false

  ClickedId:string = ""
  cartItem!:number

  ngOnInit(): void {
  this.getCatDetaliseSub =  this._CartService.getCatDetalise().subscribe({
      next:(res)=>{
        this.cartDetalise = res.data
        this.cartItem = this.cartDetalise.products.length
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }



  removCratItem(id:string):void{
    this.isLoading = true
    this.removCratItemSub = this._CartService.deleteSpecificCartItem(id).subscribe({
      next:(res)=>{

        this.isLoading = false
        this.cartDetalise = res.data
        this.cartItem = this.cartDetalise.products.length
        this._ToastrService.success(`delet item` , "freshCart")
        this._CartService.cartnumber.next(res.numOfCartItems)
      },
      error:(err)=>{
        this.isLoading = false
        console.log(err);

      }
    })
  }

  UpdateCount(id:string, count:number):void{
    this.UpdateCountSub =  this._CartService.updataProductQuantity(id , count).subscribe({
      next:(res)=>{
        this.cartDetalise = res.data
        this.cartItem = this.cartDetalise.products.length
        this._CartService.cartnumber.next(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }


  clearCart():void{
    this.ClearCountSub = this._CartService.deleteAllCart().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message == "success"){
          this.cartDetalise = {} as Icart
          this.cartItem = 0
          this._ToastrService.success(`Clear Cart` , "freshCart")
          this._CartService.cartnumber.next(res.numOfCartItems)
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  // ngOnDestroy(): void {
  //     this.getCatDetaliseSub.unsubscribe()
  //     // this.removCratItemSub.unsubscribe()
  //     this.UpdateCountSub.unsubscribe()
  // }
}
