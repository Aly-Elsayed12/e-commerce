import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/iproduct';
import { ProductsService } from '../../core/services/products/products.service';
import { FlowbiteService } from './../../core/services/flowbite/flowbite.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategoire } from '../../core/interfaces/icategoire';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishService } from '../../core/services/wish/wish.service';
import { TranslateModule } from '@ngx-translate/core';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CarouselModule,RouterLink,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy {
  constructor(private _flowbiteService:FlowbiteService){}

  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishService = inject(WishService)


  isLoading:boolean =false
  ClickedId:string = ""


  productsList:Iproduct[] = []
  categoriesList:Icategoire[] = []

  getAllProductsSub!:Subscription
  getAllCategoriesSub!:Subscription
  addProductsToCartSub!:Subscription


  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    rtl:true,
    autoplay:true,
    autoplaySpeed:3000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    rtl:true,
    autoplaySpeed:3000,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      526: {
        items: 2
      },
      728: {
        items: 3
      },
      967: {
        items: 5
      },
      1124:{
        items:6
      }
    },
    nav: true
  }


  ngOnInit(): void {
    this._flowbiteService.loadFlowbite(flowbite => {
    });


    this.getAllCategoriesSub = this._CategoriesService.getAllCategories().subscribe({
      next:(res:any)=>{
        this.categoriesList = res.data

      },
      error:(err)=>{
        console.log(err);

      }
    })

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
  this.ClickedId = id
  this.addProductsToCartSub = this._CartService.addProductsToCart(id).subscribe({
    next:(res)=>{

      this._ToastrService.success(res.message, "freshCart")
      this.isLoading = false
      this._CartService.cartnumber.next(res.numOfCartItems)


    },
    error:(err)=>{
      this.isLoading = false
      console.log(err);

    }
  })
}


addProdutsToWish(id:string):void{
  this._WishService.addProductsToWish(id).subscribe({
    next:(res)=>{
      this._ToastrService.success(res.message , "frachCash")

    }
  })
}

ngOnDestroy(): void {
  this.getAllProductsSub?.unsubscribe()
  this.getAllCategoriesSub?.unsubscribe()
  // this.addProductsToCartSub?.unsubscribe()
}

}
