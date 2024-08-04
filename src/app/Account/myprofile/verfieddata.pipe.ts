import { Pipe, PipeTransform } from '@angular/core';
import { articlModel } from '../../Models/ArticleModel';

@Pipe({
  name: 'verfieddata'
})
export class VerfieddataPipe implements PipeTransform {

  transform(value: articlModel[],name : any): articlModel[] {

    return value.filter(value => value.verified && value.name == name)
  }

}
