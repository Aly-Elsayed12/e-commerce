import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTransalteService {

  constructor(
    private _TranslateService:TranslateService ,
    @Inject(PLATFORM_ID) private platId:object ,) {

     if(isPlatformBrowser(this.platId)){
       const savedLang  = localStorage.getItem('lang') || "en";


        this._TranslateService.setDefaultLang(savedLang)


            this._TranslateService.use(  savedLang  );


          this.changeDirection()
     }

    }


    changeDirection():void {
     if(localStorage.getItem('lang') === 'en'){
           document.dir = 'ltr';
     }
     else if (localStorage.getItem('lang') === 'ar') {
       document.dir = 'rtl';

     }


    }


    changeLang(lang : string):void {
       if(isPlatformBrowser(this.platId)){
         localStorage.setItem('lang'  , lang);
       }

       this._TranslateService.use(lang);
       this.changeDirection();
    }
}
