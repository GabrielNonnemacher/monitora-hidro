import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalComma',
})
export class DecimalCommaPipe implements PipeTransform {
  transform(value: string | number): string {
    if (value === null || value === undefined) {
      return '';
    }

    return value.toString().replace('.', ',');
  }
}
