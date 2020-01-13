import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
   i=0;
  transform(value: any, ...args: any[]): any {
    this.i++;
    console.log(this.i);

    if(args[0] == ''){
      return value;
    }else{
     return value.filter((v)=>{
         return  v.includes(args[0])
      })
    }
    
  }

}
