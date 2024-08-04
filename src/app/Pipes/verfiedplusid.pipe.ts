import { Pipe, PipeTransform } from '@angular/core';
import { articlModel } from '../Models/ArticleModel';

@Pipe({
  name: 'verfiedplusid'
})
export class VerfiedplusidPipe implements PipeTransform {

  transform(value : articlModel[], search : any ): articlModel[] {

    return value.filter(article => (article.verified && article._id!=search));
  }

}
