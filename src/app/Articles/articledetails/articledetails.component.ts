import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../AppServices/article.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-articledetails',
  templateUrl: './articledetails.component.html',
  styleUrl: './articledetails.component.css'
})
export class ArticledetailsComponent {

  article: any = null;
  Idarticle : string = ""
  constructor(
    private route: ActivatedRoute,
    private _article : ArticleService,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const articleID = params['id'];

      this.Idarticle = articleID

      this._article.getArticleById(articleID).subscribe((data: any) => {
        this.article = data;
        // Scroll to the top after loading the article
        this.viewportScroller.scrollToPosition([0, 0]);
      });
    });
  }
}
