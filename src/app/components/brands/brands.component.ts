import { register } from 'swiper/element/bundle';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Subscription } from 'rxjs';
import { Ibrands } from '../../core/interfaces/ibrands';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit, OnDestroy {


  private readonly _BrandsService = inject(BrandsService)

  getAllbrandSub!:Subscription

  brandList:Ibrands[] = []



  ngOnInit(): void {
      this.getAllbrandSub = this._BrandsService.getAllBrand().subscribe({
        next:(res)=>{
          console.log(res);
          this.brandList = res.data
        },
        error:(err)=>{
          console.log(err);

        }
      })
  }
  ngOnDestroy(): void {
      this.getAllbrandSub.unsubscribe()
  }
}
