import { Component, inject, OnDestroy, OnInit , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';



@Component({
  selector: 'app-product-detalise',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './product-detalise.component.html',
  styleUrl: './product-detalise.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetaliseComponent implements OnInit , OnDestroy {

  private readonly _ProductsService = inject(ProductsService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)


  productsDetalise:Iproduct | null = null

  isLoading:boolean =false




  productsDetaliseSub!:Subscription
  addProductsToCartSub!:Subscription

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
      const idProduct = p.get("id")
    this.productsDetaliseSub = this._ProductsService.getSpecificProducts(idProduct).subscribe({
        next:(res)=>{
          this.productsDetalise = res.data
        },error:(err)=>{
          console.log(err);
        }
      })
    }
  })
}


addToCart(id:string):void{
  this.isLoading = true
  this.addProductsToCartSub = this._CartService.addProductsToCart(id).subscribe({
    next:(res)=>{
      this.isLoading = false
      this._ToastrService.success(res.message, "freshCart")
      this._CartService.cartnumber.next(res.numOfCartItems)
    },
    error:(err)=>{
      this.isLoading = false
      console.log(err);

    }
  })
}


ngOnDestroy(){
  this.productsDetaliseSub.unsubscribe()
  this.addProductsToCartSub?.unsubscribe()
}
}
