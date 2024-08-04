import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { articlModel } from '../../Models/ArticleModel';
import { ArticleService } from '../../AppServices/article.service';

@Component({
  selector: 'app-post-article',
  templateUrl: './post-article.component.html',
  styleUrl: './post-article.component.css'
})
export class PostArticleComponent {
  articleForm!: FormGroup;
  PostArticle : articlModel[] = []

  articleImage!: Blob

  message : string = "hii"
  datasaved : boolean = false

  @ViewChild('fileinput' , {static : false} ) fileinput! : ElementRef

  categories = ['Web Development', 'Mobile Development', 'Software Engineering',
    'Data Science', 'AI', 'Cyber Security', 'Cloud Computing', 'Blockchain',
    'Tech machines', 'Gadgest', 'Others'];
  constructor(private formBuilder: FormBuilder,private _article : ArticleService) { }

  ngOnInit(): void {
    this.articleForm = this.formBuilder.group({
      title : ['' , Validators.required],
      data: ['', Validators.required],
      category : ['Choose a category',Validators.required]
    });
  }

  onCategoryChange(event : any){

  }

  onSubmit() {
    if (this.articleForm.valid) {
      this.articlePost(this.articleForm.value)
      this.fileinput.nativeElement.value = ""
    }
  }

  OnImagePost(event : any){
    this.articleImage = event.target.files[0];
    console.log(this.articleImage)
  }



  articlePost(data : articlModel){
    const username = localStorage.getItem('Username');
    const email = localStorage.getItem('Email');

    if(!this.articleImage){
      this.message = "Please upload your article image!";
      this.datasaved = true;
      return;
    }

    if (username && email ) {
      data.name = username;
      data.email = email;

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('data', data.data);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('category' , data.category);

      if (this.articleImage) {
        formData.append('articleImage', this.articleImage);
      }

      this._article.PostArticles(formData).subscribe(
        (value: any) => {

          let resp = JSON.stringify(value);
          console.log(resp);
          this.message = value['msg'];
          this.datasaved = value['datasaved'];
        }
      );
    } else if(!username && !email) {
      this.message = "You have to login first to post your article!!";
      this.datasaved = true;
    }

    this.articleForm.reset();
  }

  }


  // articlePost(data : articlModel){
  //   // console.log(this.articleForm.value)
  //   const username = localStorage.getItem('Username')
  //   const email = localStorage.getItem('Email')

  //   if(username && email){
  //     data.name = username
  //     data.email =email

  //     this._article.PostArticles(data).subscribe(
  //       (value : any) => {
  //         // console.log(value);
  //         let resp=JSON.stringify(value);

  //         console.log(resp);
  //         this.message = value['msg']
  //         this.datasaved = value['datasaved']

  //       }
  //     )
  //   }
  //   else{
  //     this.message = "You have to login first to post your article!!"
  //     this.datasaved=true
  //   }
  //   this.articleForm.reset()
  // }

