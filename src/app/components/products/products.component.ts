import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Iproduct } from '../../core/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search/search.pipe';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishService } from '../../core/services/wish/wish.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, FormsModule , SearchPipe , TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit , OnDestroy {

  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishService = inject(WishService)


  getAllProductsSub!:Subscription
  addProductsToCartSub!:Subscription
  addProdutsToWishSub!:Subscription

  productsList:Iproduct[] = []

  text:string =""
  isLoading:boolean =false
  ClickedId:string = ""



  ngOnInit(): void {
    this.getAllProductsSub =  this._ProductsService.getAllProducts().subscribe({
      next:(res:any)=>{

        this.productsList = res.data

      },
      error:(err)=>{
        console.log(err);

      }
    })
}


addToCart(id:string):void{
  this.isLoading = true
  this.addProductsToCartSub = this._CartService.addProductsToCart(id).subscribe({
    next:(res)=>{
      this.isLoading = false
      this.ClickedId = id
      this._ToastrService.success(res.message, "freshCart")
      this._CartService.cartnumber.next(res.numOfCartItems)
    },
    error:(err)=>{
      this.isLoading = false
      console.log(err);

    }
  })
}

addProdutsToWish(id:string):void{
  this.addProdutsToWishSub =  this._WishService.addProductsToWish(id).subscribe({
    next:(res)=>{
      console.log(res);

    }
  })
}



ngOnDestroy(): void {
  this.getAllProductsSub?.unsubscribe()
  this.addProductsToCartSub?.unsubscribe()
  this.addProdutsToWishSub?.unsubscribe()
}
}
