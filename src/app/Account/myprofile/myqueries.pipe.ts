import { Pipe, PipeTransform } from '@angular/core';
import { userQueries } from '../../Models/contactQueries';

@Pipe({
  name: 'myqueries'
})
export class MyqueriesPipe implements PipeTransform {

  transform(value: userQueries[], name : any): userQueries[] {
    return value.filter(data => data.name == name);
  }

}
