import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatEntity'
})
export class FormatEntityPipe implements PipeTransform {

  transform(value: string): string {
    const element: HTMLDivElement = document.createElement('div');
    element.innerHTML = value;
    return element.textContent || element.innerText || '';
  }

}
