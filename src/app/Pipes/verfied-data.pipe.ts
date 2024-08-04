import { Pipe, PipeTransform } from '@angular/core';
import { articlModel } from '../Models/ArticleModel';

@Pipe({
  name: 'verfiedData'
})
export class VerfiedDataPipe implements PipeTransform {

  transform(value : articlModel[] ): articlModel[] {

    return value.filter(article => article.verified);
  }

}
