import { Component } from '@angular/core';
import { AccountService } from '../AppServices/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  navbarCollapsed = true;

  login : boolean = true
  username : string = ""

  constructor ( private _login : AccountService , private router : Router,private _account : AccountService ){
    this._login.logIN.subscribe(value => {
      this.login = value
    })
    this._login.username.subscribe(value => {
      this.username = value;
    });

    if (localStorage.getItem('token')) {
      this._login.logIN.next(false);
      console.log(localStorage.getItem('Username'));

    }
  }
  shownav : any = true
  ngOnInit(): void {

    this._account.shownav.subscribe(
      (value) => this.shownav=value
    )
  }

  OnLogout(){

    this._login.logIN.next(true)
    localStorage.removeItem('Loginuser');
    localStorage.removeItem('token');
    localStorage.removeItem('Username');
    this._login.username.next('');
    localStorage.removeItem('Email')
    localStorage.removeItem('Id')
    this.router.navigate(['home'])
  }

  toggleNavbarCollapsing() {
      this.navbarCollapsed = !this.navbarCollapsed;
  }
}
