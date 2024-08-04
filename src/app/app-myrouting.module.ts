import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';
import { MyprofileComponent } from './Account/myprofile/myprofile.component';
import { RegistrationComponent } from './Account/registration/registration.component';
import { AdminComponent } from './Adminmodule/admin/admin.component';
import { AdmincontactusComponent } from './Adminmodule/admincontactus/admincontactus.component';
import { AdminloginComponent } from './Adminmodule/adminlogin/adminlogin.component';
import { AdminusersComponent } from './Adminmodule/adminusers/adminusers.component';
import { AllArticlesComponent } from './Adminmodule/all-articles/all-articles.component';
import { NotVerfiedArticlesComponent } from './Adminmodule/not-verfied-articles/not-verfied-articles.component';
import { ArticleListComponent } from './Articles/article-list/article-list.component';
import { ArticledetailsComponent } from './Articles/articledetails/articledetails.component';
import { PostArticleComponent } from './Articles/post-article/post-article.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutusComponent } from './static-pages/aboutus/aboutus.component';
import { ContactusComponent } from './static-pages/contactus/contactus.component';
import { MyqueriesPipe } from './Account/myprofile/myqueries.pipe';
import { NotverifieddataPipe } from './Account/myprofile/notverifieddata.pipe';
import { VerfieddataPipe } from './Account/myprofile/verfieddata.pipe';
import { CategoriesComponent } from './Articles/categories/categories.component';
import { FeaturedArticleComponent } from './Articles/featured-article/featured-article.component';
import { LatestArticlesComponent } from './Articles/latest-articles/latest-articles.component';
import { BannerComponent } from './banner/banner.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { NotverifiedPipe } from './Pipes/notverified.pipe';
import { SearchArticlePipe } from './Pipes/search-article.pipe';
import { VerfiedDataPipe } from './Pipes/verfied-data.pipe';
import { VerfiedplusidPipe } from './Pipes/verfiedplusid.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

const routes : Routes = [
  {path : '' , redirectTo : 'home' , pathMatch:"full"},
  {path : 'home' ,  component : HomepageComponent },


  {path : 'articles',children : [
    {path : '' , component : ArticleListComponent},
    {path : ':id' , component : ArticledetailsComponent}
  ]},

  // {path : 'articles',children : [
  //   {path : '' , loadComponent: () =>
  //     import('./Articles/article-list/article-list.component').then(comp => comp.ArticleListComponent)},
  //   {path : ':id' , component : ArticledetailsComponent}
  // ]},


  {path : 'contactus' , component : ContactusComponent},
  {path : 'aboutus' , component : AboutusComponent },
  {path : 'registration' , component : RegistrationComponent},

  {path : 'login' , component : LoginComponent},

  {path : 'postArticle' , component : PostArticleComponent},
  {path : 'myprofile' , component : MyprofileComponent},

  {path : 'admin' , component : AdminloginComponent},

  { path: 'admin/dashboard', component: AdminComponent, children: [
    { path: 'allusers', component: AdminusersComponent },
    { path: 'allArticles', component: AllArticlesComponent },
    { path: 'notVerified', component: NotVerfiedArticlesComponent },
    { path: 'userqueries', component: AdmincontactusComponent }
  ]
},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    LatestArticlesComponent,
    PagenotfoundComponent,
    AboutusComponent,
    ContactusComponent,
    HomepageComponent,

    ArticledetailsComponent,
    ArticleListComponent,

    FeaturedArticleComponent,
    CategoriesComponent,

    RegistrationComponent,
    LoginComponent,
    VerfiedDataPipe,
    PostArticleComponent,
    AdminComponent,
    AdminusersComponent,
    AllArticlesComponent,
    NotVerfiedArticlesComponent,
    NotverifiedPipe,
    MyprofileComponent,
    VerfieddataPipe,
    NotverifieddataPipe,
    AdmincontactusComponent,
    MyqueriesPipe,
    VerfiedplusidPipe,
    SearchArticlePipe,
    AdminloginComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports : [
    RouterModule
  ]
})
export class AppMyroutingModule { }
