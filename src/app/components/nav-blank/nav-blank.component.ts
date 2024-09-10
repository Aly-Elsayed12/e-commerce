


import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { MyTransalteService } from '../../core/services/mytransalte/my-transalte.service';



@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive ,TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent {

  readonly _AuthService = inject(AuthService)
  private readonly _CartService =inject(CartService)
  private readonly _MyTransalteService =inject(MyTransalteService)

  darkMode = false;

  countCart!:number

  constructor(
    private _flowbiteService: FlowbiteService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite(flowbite => {});
    if (isPlatformBrowser(this.platformId)) {
      this.darkMode = localStorage.getItem('theme') === 'dark';
      this.updateTheme();
    }
    this._CartService.getCatDetalise().subscribe({
      next:(res)=>{
        this._CartService.cartnumber.next(res.numOfCartItems)

      }
    })
    this._CartService.cartnumber.subscribe({
      next:(res)=>{
        this.countCart = res
      }
    })
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
    }
    this.updateTheme();
  }

  private updateTheme() {
    const root = document.documentElement;
    if (this.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }


changlang(lang:string):void{
  this._MyTransalteService.changeLang(lang)
}

}

