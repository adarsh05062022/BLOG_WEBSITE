import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user-mangaement/pages/login/login.component';
import { RegisterComponent } from './user-mangaement/pages/register/register.component';
import { ForgetPasswordComponent } from './user-mangaement/pages/forget-password/forget-password.component';
import { BlogComponent } from './blog-mangaement/pages/blog/blog.component';
import { HomeComponent } from './blog-mangaement/pages/home/home.component';
import { AddBlogComponent } from './blog-mangaement/pages/add-blog/add-blog.component';
import { ProfilePageComponent } from './user-mangaement/profile-page/profile-page.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  // {path:"read",component:BlogComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"forget-password",component:ForgetPasswordComponent},
  {path:"add",component:AddBlogComponent},
  // {path:"profile",component:ProfilePageComponent},
  {
    path: 'blog/:blogId',
    component: BlogComponent,
  },
  {
    path: 'profile/:userId',
    component: ProfilePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
