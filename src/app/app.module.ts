import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppMyroutingModule } from './app-myrouting.module';

@NgModule({
  declarations: [

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AppMyroutingModule,
    CommonModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


