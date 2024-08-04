import { Pipe, PipeTransform } from '@angular/core';
import { articlModel } from '../../Models/ArticleModel';

@Pipe({
  name: 'notverifieddata'
})
export class NotverifieddataPipe implements PipeTransform {

  transform(value: articlModel[],name : any): articlModel[] {

    return value.filter((value) => (!value.verified && value.name == name))
  }

}
