import { Pipe, PipeTransform } from '@angular/core';
import { articlModel } from '../Models/ArticleModel';

@Pipe({
  name: 'notverified'
})
export class NotverifiedPipe implements PipeTransform {

  transform(value : articlModel[], ...args: unknown[]): articlModel[] {
    // if(!value) return []
    return value.filter(article => !article.verified)
  }

}
