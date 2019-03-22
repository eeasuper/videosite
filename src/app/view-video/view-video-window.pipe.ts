import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'window'})
export class WindowPipe implements PipeTransform {
  transform(value: number, widthOrHeight: string): number {
    return value /3;
  }
}