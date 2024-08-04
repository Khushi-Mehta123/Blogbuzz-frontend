import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../Models/Users';
import { userLogINInfo } from '../Models/Userlogininfo';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { admin } from '../Models/admin';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  logIN =new BehaviorSubject(true)
  username = new BehaviorSubject(localStorage.getItem('Username') || '');
  shownav = new BehaviorSubject(true)

   url = 'http://localhost:5000/api/v1/users'

   adminurl = 'http://localhost:5000/admin'

  constructor(private http : HttpClient) {

   }

   PostUser(data : FormData) : Observable<Users>{
    return this.http.post <Users>(this.url+'/register',data)
   }

   userlogin(logininfo:userLogINInfo):Observable<userLogINInfo>{

    return this.http.post<userLogINInfo>(this.url+'/login',logininfo)
  }

  updateUser(logininfo : userLogINInfo) : Observable<userLogINInfo>{
    console.log(logininfo._id);
    return this.http.put<Users>(`${this.url}/${logininfo._id}`,logininfo)
  }

  updateuserDetails(user : Users) : Observable<Users>{
    const id = localStorage.getItem('Id')
    console.log(id);
    return this.http.put<Users> (`${this.url}/${id}`,user)
  }

  getsingleUserData(_id : any) : Observable<Users>{
    return this.http.get<Users> (`${this.url}/${_id}`)
  }

  uploadUserImage(userId: any, formData: FormData): Observable<any> {
    return this.http.put<any>( `${this.url}/${userId}` , formData);
  }

  adminlogin(admindata : admin) : Observable < any> {
    return this.http.post <any> (`${this.adminurl}`,admindata)
  }
}
