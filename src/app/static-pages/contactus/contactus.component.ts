import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userQueries } from '../../Models/contactQueries';
import { ContactusService } from '../../AppServices/contactus.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {

  contactform! : FormGroup
  posted : boolean = false

  constructor(private formbuilder : FormBuilder, private _userQuery : ContactusService){

  }
  ngOnInit(): void {

    this.contactform = this.formbuilder.group({
      // name : ['' , Validators.required],
      // email : ['' , Validators.required],
      subject : ['' , Validators.required],
      message : ['' , Validators.required],
    })

  }

  onSubmit(){
    console.log(this.contactform.value);
    if(this.contactform.valid){
      if(confirm('Are you sure! you want to contact our admin!')){
        this.postQueries()

        this.contactform.reset()
      }
    }
    else{
      alert('Please enter your details')
    }
  }

  name1 = localStorage.getItem('Username');
  email1 = localStorage.getItem('Email');

  postQueries() {

    const name = localStorage.getItem('Username');
    const email = localStorage.getItem('Email');

    if(!name && !email){

    }
    const payload = {
      ...this.contactform.value,
      name,
      email
    };

    this._userQuery.postQueries(payload).subscribe(
      (value) => {
        console.log(value);
      },
      (err) => {
        console.log(err);

      }
    )
  }
}
