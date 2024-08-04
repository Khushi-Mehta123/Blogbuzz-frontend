import { Component } from '@angular/core';
import { ArticleService } from '../../AppServices/article.service';
import { articlModel } from '../../Models/ArticleModel';
import {  Router } from '@angular/router';
import { AccountService } from '../../AppServices/account.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent {

  AllArticles : articlModel[] = [];

  login : any =  false

  constructor(private _article : ArticleService ,
    private router : Router,
    private _acc : AccountService
  ){
    console.log("article module");

  }

  searchArticle = ""

  selectedcategory = ""

  ngOnInit(): void {
    this.getAllArticles()
    this._acc.logIN.subscribe(
      (value) => this.login=value
    )
  }

  getAllArticles(){
    this._article.getArticleList().subscribe(
      (value : articlModel[]) => {
        console.log(value);

        this.AllArticles=value
      },
      (err) =>{
        console.log(err);

      }
    )
  }

  onCategorySelected(category : string){
    this.selectedcategory=category
    console.log(this.selectedcategory);

  }

  OnPostArticle(){
    this.router.navigate(['postArticle'])
  }

  OnLoginArticle(){
    this.router.navigate(['login'])
  }
}
