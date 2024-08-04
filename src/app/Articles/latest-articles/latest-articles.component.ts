import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../AppServices/article.service';
import { ViewportScroller } from '@angular/common';
import { articlModel } from '../../Models/ArticleModel';

@Component({
  selector: 'app-latest-articles',
  templateUrl: './latest-articles.component.html',
  styleUrl: './latest-articles.component.css'
})
export class LatestArticlesComponent {

  article: any = null;
  AllArticles : articlModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private _article : ArticleService,
    private viewportScroller: ViewportScroller,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getAllArticles()
    // this.fetchdetails()
  }
  searchvalue = ""
  getAllArticles(){
    this._article.getArticleList().subscribe(
      (value : articlModel[]) => {
        console.log(value);

        this.AllArticles=value.slice(0,6)
      },
      (err) =>{
        console.log(err);

      }
    )
  }

  fetchdetails(){
    this.route.params.subscribe(params => {
      const articleId : string = params['id'];
      if(articleId){
        this._article.getArticleById(articleId).subscribe((data: any) => {
        this.article = data;
        // Scroll to the top after loading the article
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    );
      }
    });
  }
}
