import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BuildingComponent } from './building/building.component';
import { PartsComponent } from './parts/parts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrebuiltComponent } from './prebuilt/prebuilt.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { AddPrebuildComponent } from './add-prebuild/add-prebuild.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BuildingComponent,
    PartsComponent,
    PageNotFoundComponent,
    PrebuiltComponent,
    LoginComponent,
    RegisterComponent,
    AddPrebuildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
