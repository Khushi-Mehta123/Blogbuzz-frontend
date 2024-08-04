import { Pipe, PipeTransform } from '@angular/core';
import { articlModel } from '../Models/ArticleModel';

@Pipe({
  name: 'searchArticle'
})
export class SearchArticlePipe implements PipeTransform {

  transform(value: articlModel[], searchArticle: string, selectedcategory: string): articlModel[] {
    let filteredArticles = value.filter(article => article.verified);
    console.log('After verifying:', filteredArticles);

    if (selectedcategory) {
      filteredArticles = filteredArticles.filter(article => article.category === selectedcategory);
      console.log('After category filter:', filteredArticles);
    }

    if (!searchArticle) {
      return filteredArticles;
    }

    searchArticle = searchArticle.toLowerCase();
    return filteredArticles.filter(article =>
      article.data.toLowerCase().includes(searchArticle) ||
      article.title.toLowerCase().includes(searchArticle) ||
      article.name.toLowerCase().includes(searchArticle)
    );
  }


}
