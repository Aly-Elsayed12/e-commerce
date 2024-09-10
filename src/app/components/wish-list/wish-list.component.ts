import { Component, inject, OnInit } from '@angular/core';
import { WishService } from '../../core/services/wish/wish.service';
import { Icart } from '../../core/interfaces/icart';
import { ToastrService } from 'ngx-toastr';
import { Iproduct } from '../../core/interfaces/iproduct';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {

  private readonly _WishService = inject(WishService)
  private readonly _ToastrService =inject(ToastrService)


  wishDetalise!:Iproduct[]
  cartItem!:number

  ngOnInit():void{
    this._WishService.getWishDetalise().subscribe({
      next:(res)=>{
        this.wishDetalise = res.data
        console.log(this.wishDetalise);
        this.cartItem = this.wishDetalise.length

      }
    })
  }
  removWishItem(id:string):void{
      this._WishService.deleteProductsFromWish(id).subscribe({
      next:(res)=>{
        this.wishDetalise = res.data
        this._ToastrService.success(`delet item` , "freshCart")
      }
    })
  }

}
