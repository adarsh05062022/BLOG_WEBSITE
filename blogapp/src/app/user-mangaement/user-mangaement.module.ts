import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserMangaementRoutingModule } from './user-mangaement-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ProfilePageComponent,
    
  ],
  imports: [
    CommonModule,
    UserMangaementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule
    // HttpClient
  ]
})
export class UserMangaementModule { }
