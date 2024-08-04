import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { articlModel } from '../Models/ArticleModel';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  url = 'http://localhost:5000/api/v1/articles'

  constructor(private http : HttpClient) {

   }

   getArticleList(): Observable<articlModel[]> {
    return this.http.get<articlModel[]>(this.url);
  }

  PostArticles(data : FormData) : Observable<articlModel> {
    return this.http.post<articlModel>(this.url,data)
  }

  getArticleById(_id: any): Observable<articlModel> {
    console.log(_id);

    return this.http.get<any>(`${this.url}/${_id}`);
  }
}
