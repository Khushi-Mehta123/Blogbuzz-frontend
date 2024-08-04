import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userQueries } from '../Models/contactQueries';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  url = 'http://localhost:5000/api/v1/contactus'

  constructor(private http : HttpClient) { }

  postQueries(data : userQueries) : Observable<userQueries>{
    return this.http.post<userQueries>(this.url,data)
  }

  getQueries() : Observable <userQueries[]>{
    return this.http.get<userQueries[]>(this.url)
  }

  updateQueries(data : userQueries) : Observable <userQueries> {
    console.log(data);

    return this.http.put <userQueries> (`${this.url}/${data._id}`,data)
  }

  deleteQueries(_id : any) : Observable <userQueries>{
    return this.http.delete <userQueries> (`${this.url}/${_id}`)
  }

  // updateQueries(data: { id: string, reply: string }): Observable<any> {
  //   return this.http.put(`${this.url}/${data.id}`, { reply: data.reply });
  // }
}
