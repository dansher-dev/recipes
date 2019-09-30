import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'descriptionLength'})
export class DescriptionLength implements PipeTransform {
  transform(value: string): string {
    return value.length > 150 ? value.substring(0, 150) + '...' : value;
  }
}
