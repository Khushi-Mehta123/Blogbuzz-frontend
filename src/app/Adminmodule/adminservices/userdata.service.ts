import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Users } from '../../Models/Users';
import { userLogINInfo } from '../../Models/Userlogininfo';
import { articlModel } from '../../Models/ArticleModel';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  url = 'http://localhost:5000/api/v1/users'

  urlart = 'http://localhost:5000/api/v1/articles'

  constructor(private http : HttpClient) {

   }
   getallusers() : Observable<Users[]>{
    return this.http.get <Users[]> (this.url)
   }

   deleteUser(_id : any) : Observable<Users>{
    console.log(_id);

    return this.http.delete <Users> (`${this.url}/${_id}`)
   }

   getAllArticles() : Observable <articlModel[]>{
    return this.http.get <articlModel[]>(this.urlart)
   }

   updateArticle(article : articlModel) : Observable <articlModel>{
    // console.log(article._id);
    return this.http.put <articlModel> (`${this.urlart}/${article._id}` , article)
   }

   deleteArtcile(_id : any) : Observable <articlModel>{
    return this.http.delete <articlModel> (`${this.urlart}/${_id}`)
   }
}
