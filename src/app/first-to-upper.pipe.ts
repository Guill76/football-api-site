import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstToUpper'
})
export class FirstToUpperPipe implements PipeTransform {
  transform(value: string, args?: any): string {
      if(value)
        return (value.substr(0,1).toUpperCase()+value.substr(1,value.length-1).toLowerCase());
      else return null;
  }
}
