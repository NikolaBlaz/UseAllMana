import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'colorTime'
})
export class ColorTimePipe implements PipeTransform {
  constructor() {}

  transform(value: string | number | null): string {
    let color = '';
    if (value === null) {
      return color; 
    }
    if(typeof value === 'string') {
      value = Number(value)
    }
    if (value >= 60) {
      color = 'blue';
    } else if (value >= 11) {
      color = 'green';
    } else if (value <=10) {
      color = 'red';
    }
    return color;
  }

}
