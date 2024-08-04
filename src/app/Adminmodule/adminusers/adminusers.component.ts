import { Component } from '@angular/core';
import { UserdataService } from '../adminservices/userdata.service';
import { Users } from '../../Models/Users';

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrl: './adminusers.component.css'
})
export class AdminusersComponent {

  AllUsers : Users[] = []
  constructor(private _user : UserdataService){

  }
  id = 1

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData(){
    this._user.getallusers().subscribe(
      (value : Users[] ) => {
        this.AllUsers = value
        console.log(value);
    },
    (err) => {
      console.log(err);

    }
  )
  }

  OnUserDelete(_id : any){
    this._user.deleteUser(_id).subscribe(
      value => {
        console.log(value);
        this.getUserData()
      },
      (err) =>{
        console.log(err);

      }
    )
  }
}
