import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Subscription } from 'rxjs';
import { Icategoire } from '../../core/interfaces/icategoire';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit , OnDestroy {

  private readonly _CategoriesService = inject(CategoriesService)

  getAllCatSub!:Subscription

  catList:Icategoire[] = []



  ngOnInit(): void {
      this.getAllCatSub = this._CategoriesService.getAllCategories().subscribe({
        next:(res)=>{
          this.catList = res.data
        },
        error:(err)=>{
          console.log(err);

        }
      })
  }
  ngOnDestroy(): void {
      this.getAllCatSub.unsubscribe()
  }

}
