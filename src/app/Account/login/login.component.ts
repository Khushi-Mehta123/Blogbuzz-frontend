import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../AppServices/account.service';
import { userLogINInfo } from '../../Models/Userlogininfo';
import { Router } from '@angular/router';
import { Users } from '../../Models/Users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  datasaved = false;
  message: string = "";
  status:string = "";
  username : string=""

  login : boolean = true
  islogin : boolean = false

  constructor(
    private formbuilder: FormBuilder,
     private _user : AccountService,
    private router : Router
    ) {
    this._user.logIN.subscribe(value => {
      this.login=value
    })
   }

  ngOnInit(): void {
    this.setFormState();
    console.log("login");

  }
  setFormState(): void {
    this.loginForm = this.formbuilder.group({
      email: ['k@gmail.com', [Validators.required]],
      password: ['11', [Validators.required]]
    })
  }


  onSubmit() {

    let userinfo = this.loginForm.value;
    this.userLogin(userinfo);
    this.loginForm.reset();

    // this._user.logIN.next(false)

  }

  userLogin(logininfo:userLogINInfo) {

    this._user.userlogin(logininfo).subscribe(
      (resResult :any) =>  {

       let resp=JSON.stringify(resResult);
      //  console.log(resp)

        this.datasaved = true;
        this.message = resResult['msg'];
        this.status = resResult['status'];
        this.islogin = resResult['isLogIN'];

        console.log(this.islogin);


        if(resResult['status']=='success'){
          logininfo._id = resResult.UserData[0]._id

          console.log(logininfo._id);

        // localStorage.setItem('Loginuser',resp)
        localStorage.setItem('token', resResult.token);

        this._user.username.next(resResult.UserData[0].name);

          localStorage.setItem('Username',resResult.UserData[0].name)
          localStorage.setItem('Email',resResult.UserData[0].email)
          localStorage.setItem('Id',resResult.UserData[0]._id)
          setTimeout(() => {
            this.router.navigate(['home'])
          }, 1000);
          console.log(this.username);

          console.log(resResult);
          this._user.logIN.next(false)

          this.updateUser(resResult)

        }else{
          localStorage.removeItem('Loginuser');
          localStorage.removeItem('token');
          localStorage.removeItem('Email')
          localStorage.removeItem('Id')
        }
       this.loginForm.reset();
      }
    )
  }

  // upldate islogin true
  updateUser(data : userLogINInfo){

    console.log(data);
    this._user.updateUser(data).subscribe(
      (value) => {
        console.log(value);

      },
      (err) => console.log(err)
    )

  }
}

