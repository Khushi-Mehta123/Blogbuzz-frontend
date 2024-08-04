import { Component, Input } from '@angular/core';
import { articlModel } from '../../Models/ArticleModel';
import { ArticleService } from '../../AppServices/article.service';

@Component({
  selector: 'app-featured-article',
  templateUrl: './featured-article.component.html',
  styleUrl: './featured-article.component.css'
})
export class FeaturedArticleComponent {

  @Input() articleId ! : string
  allarticles : articlModel[] = []

  constructor(private _article : ArticleService){

  }

  ngOnInit(): void {

    if(this.articleId){
      console.log(this.articleId);
    }
    this.getArticles()
  }
  getArticles(){
    this._article.getArticleList().subscribe(
      (value : articlModel[]) => {
        this.allarticles = value
        console.log(this.allarticles);

      }
    )
  }

}
