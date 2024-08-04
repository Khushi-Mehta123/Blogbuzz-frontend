import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Users } from '../../Models/Users';
import { ArticleService } from '../../AppServices/article.service';
import { articlModel } from '../../Models/ArticleModel';
import { userQueries } from '../../Models/contactQueries';
import { ContactusService } from '../../AppServices/contactus.service';
import { AccountService } from '../../AppServices/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  @ViewChild('updateImage', { static: false }) updateimage!: ElementRef;

  name = localStorage.getItem('Username');
  email = localStorage.getItem('Email');
  mobilenum : any
  address : string = ""
  state : string = ""
  country : string = ""
  education : string = ""

  AllArticle: articlModel[] = [];
  myQueries: userQueries[] = [];
  userImage = '';
  updateImage = '';

  myprofileform!: FormGroup;
  userModel: Users[] = [];

  showVerifiedPosts = false;
  showNotVerifiedPosts = false;
  showqueries = false;

   states: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

countries: string[] = [
    'United States', 'Canada', 'Mexico', 'Brazil', 'Argentina',
    'United Kingdom', 'Germany', 'France', 'Italy', 'Spain',
    'Australia', 'Japan', 'South Korea', 'China', 'India',
    'South Africa', 'Nigeria', 'Egypt', 'Saudi Arabia', 'United Arab Emirates'
];

  constructor(
    // private _upduser : AccountService,
    private formbuilder: FormBuilder,
    private _article: ArticleService,
    private _myquery: ContactusService,
    private _user: AccountService,
  ) {}

  ngOnInit(): void {
    this.getArticles();
    this.showQueries();
    this.getimage();
    this.setFormState();
    this.getdata();
  }



  setFormState(): void {
    this.myprofileform = this.formbuilder.group({
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      education: ['', [Validators.required]]
    });
  }
  id = localStorage.getItem('Id')
  getdata(){
    this._user.getsingleUserData(this.id).subscribe(
      (user) =>  {
        console.log(user)
        this.myprofileform.patchValue({
          mobileNumber: user.mobileNumber,
          address: user.address,
          state: user.state,
          country: user.country,
          education: user.education
        });
      }
    )
  }

  onSubmit() {
    if (this.myprofileform.valid) {
      console.log('Form Submitted!', this.myprofileform.value);
      this._user.updateuserDetails(this.myprofileform.value).subscribe(
        (value) => console.log(value),
        (err) => console.log(err)
      )
    }
  }

  showVerified() {
    this.getArticles();
    this.showVerifiedPosts = true;
    this.showNotVerifiedPosts = false;
    this.showqueries = false;
  }

  showNotVerified() {
    this.getArticles();
    this.showVerifiedPosts = false;
    this.showNotVerifiedPosts = true;
    this.showqueries = false;
  }

  showQueries() {
    this.showmyqueries();
    this.showVerifiedPosts = false;
    this.showNotVerifiedPosts = false;
    this.showqueries = true;
  }

  getArticles() {
    this._article.getArticleList().subscribe((value) => {
      this.AllArticle = value;
      console.log(this.AllArticle);
    });
  }

  showmyqueries() {
    this._myquery.getQueries().subscribe(
      (value) => {
        this.myQueries = value;
        console.log(value);
      },
      (err) => console.log(err)
    );
  }

  getimage() {
    const userId = localStorage.getItem('Id');
    this._user.getsingleUserData(userId).subscribe(
      (value) => {
        console.log(value);
        this.userImage = value.image;
        console.log(this.userImage);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onFileSelected(event: any) {
    console.log(event.target.files[0]);
    this.updateImage = event.target.files[0];
  }

  OnUpdateImage() {
    const userId = localStorage.getItem('Id');
    if (this.updateImage) {
      console.log(userId);
      console.log(this.updateImage);

      const formData = new FormData();
      formData.append('image', this.updateImage);

      this._user.uploadUserImage(userId, formData).subscribe(
        (response) => {
          this.userImage = response.imagePath; // Update the userImage with the new image path
          this.updateimage.nativeElement.value = "";
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }
}
