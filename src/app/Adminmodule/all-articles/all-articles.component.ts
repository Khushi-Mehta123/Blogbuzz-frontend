import { Component } from '@angular/core';
import { articlModel } from '../../Models/ArticleModel';
import { ArticleService } from '../../AppServices/article.service';
import { UserdataService } from '../adminservices/userdata.service';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrl: './all-articles.component.css'
})
export class AllArticlesComponent {

  AllArticles : articlModel[] = []

  toggleText(item: any): void {
    item.showFullText = !item.showFullText;
  }

  constructor(private _article : UserdataService){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.OnLoadArticle()
  }

  OnLoadArticle(){
    this._article.getAllArticles().subscribe(
      (value : articlModel[]) => {
        this.AllArticles=value
        console.log(value);

      },
      (err) => {
        console.log(err);
      }
    )
  }

  OnAprooveArticle(artcle : articlModel){
    this._article.updateArticle(artcle).subscribe(
      (value)=>{
        console.log(value);
        this.OnLoadArticle()
      }
    )
  }

  OnDeleteArticle(_id : any){
    this._article.deleteArtcile(_id).subscribe(
      (value) => {
        console.log(value);
        this.OnLoadArticle()
      },
      (err) => {
        console.log(err);

      }
    )
  }
}
