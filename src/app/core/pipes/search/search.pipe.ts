import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arry:any[] , text:string ): any[] {
    return arry.filter( (items)=> items.title.toLowerCase().includes(text.toLowerCase()));
  }

}
