import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogMangaementRoutingModule } from './blog-mangaement-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AddBlogComponent } from './pages/add-blog/add-blog.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { EditorComponent } from './components/editor/editor.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    HomeComponent,
    BlogComponent,
    AddBlogComponent,
    BlogCardComponent,
    EditorComponent
  ],
  imports: [
    CommonModule,
    BlogMangaementRoutingModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule
  ]
})
export class BlogMangaementModule { }
