import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../AppServices/account.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {
  loginForm! : FormGroup;

  constructor(
    private fb: FormBuilder,
    // private authService: AuthService,
    private router: Router,
    private _acc : AccountService,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private _admin : AccountService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ngZone.run(() => {
      this._acc.shownav.next(false);
    });
  }

  ngOnDestroy(): void {
    this.ngZone.run(() => {
      this._acc.shownav.next(true);
    });
  }
  status:any = ""
  onSubmit() {
    if (this.loginForm.valid) {

      this._admin.adminlogin(this.loginForm.value).subscribe(
        (value : any) => {
          console.log(value);

          let resp=JSON.stringify(value);
          console.log(resp);

          this.status = value['msg']
          console.log(this.status);
          if(this.status == 'Not Authorized'){
            alert('You are not authorized')
            this.loginForm.reset()
          }
          else if(this.status == 'User exists'){
            this.router.navigate(['admin/dashboard']);
          }
        },

        (err) => console.log(err)

      )

    }
  }
}
