import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { AccountService } from '../../AppServices/account.service';
import { Users } from '../../Models/Users';
import { UserdataService } from '../../Adminmodule/adminservices/userdata.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  regForm!: FormGroup;
  datasaved: boolean = false;
  message: string = "";
  UserImage: string = "";

  alluser: Users[] = [];

  constructor(
    private _alluser : UserdataService,
    private _user: AccountService) { }

  ngOnInit(): void {
    this.regForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email], [this.emailUniqueValidator.bind(this)]),
      'password': new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
    });

    this.loadUsers();
  }

  OnPhotoupload(event: any) {
    this.UserImage = event.target.files[0];
  }

  loadUsers() {
    this._alluser.getallusers().subscribe(
      (value) => {
        this.alluser = value;
        // Ensure that async validators are updated with the latest user data
        this.regForm.get('email')?.updateValueAndValidity();
      },
      (err) => {
        console.error('Error fetching users', err);
      }
    );
  }

  emailUniqueValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    // Wait for all users to be loaded before validating
    if (!this.alluser.length) {
      return of(null);
    }

    return of(this.alluser.some(user => user.email === email) ? { emailTaken: true } : null);
  }

  onUserSubmit() {
    if (this.regForm.valid) {
      const formData = new FormData();
      formData.append('name', this.regForm.value.name);
      formData.append('email', this.regForm.value.email);
      formData.append('password', this.regForm.value.password);
      formData.append('UserImage', this.UserImage);

      this._user.PostUser(formData).subscribe(
        (value) => {
          this.message = "Inserted Successfully";
          console.log(value);
          this.datasaved = true;
        },
        (err) => {
          this.message = "Error";
          console.log(err);
        }
      );
      this.regForm.reset();
    }
  }
}
