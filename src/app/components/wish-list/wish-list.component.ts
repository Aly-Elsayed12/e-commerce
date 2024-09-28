import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WishService } from '../../core/services/wish/wish.service';
import { Icart } from '../../core/interfaces/icart';
import { ToastrService } from 'ngx-toastr';
import { Iproduct } from '../../core/interfaces/iproduct';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit ,OnDestroy {

  private readonly _WishService = inject(WishService)
  private readonly _ToastrService =inject(ToastrService)

  removWishItemSub!:Subscription
  getWishDetaliseSub!:Subscription

  wishDetalise!:Iproduct[]
  cartItem!:number

  ngOnInit():void{
    this.getWishDetaliseSub =  this._WishService.getWishDetalise().subscribe({
      next:(res)=>{
        this.wishDetalise = res.data
        this.cartItem = this.wishDetalise.length
      }
    })
  }
  removWishItem(id:string):void{
      this.removWishItemSub =  this._WishService.deleteProductsFromWish(id).subscribe({
      next:(res)=>{
        this.wishDetalise = res.data
        this._ToastrService.success(`delet item` , "freshCart")
      }
    })
  }


  ngOnDestroy(): void {
      this.getWishDetaliseSub.unsubscribe()
      if(this.removWishItemSub){
        this.removWishItemSub.unsubscribe()
      }
  }

}
