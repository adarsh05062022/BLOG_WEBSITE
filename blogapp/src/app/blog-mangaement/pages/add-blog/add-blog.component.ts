import { Component, ViewChild } from '@angular/core';
import { EditorComponent } from '../../components/editor/editor.component';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
})
export class AddBlogComponent {
  title: string = '';
  content: string = '';
  cat: string | null = null;
  currentDate!: Date;
  mysqlFormattedDate!: string;

  constructor(private blogService: BlogService,
    private router:Router) {}

  @ViewChild('editorComponent', { static: true })
  editorComponent!: EditorComponent;

  isButtonDisabled(): boolean {
    return (
      !this.title ||
      !this.editorComponent ||
      this.editorComponent.getContent().trim() === ''
    );
  }

  toMySQLDate(date: Date): string {
    const year = date.getFullYear();
    // Month is zero-based, so we add 1 to get the correct month
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  onSubmit() {
    const editorContent = this.editorComponent.getContent();
    this.content = editorContent;

    const localStorageUserData: any = localStorage.getItem('UserData');
    const userData = JSON.parse(localStorageUserData);

    this.currentDate = new Date();
    this.mysqlFormattedDate = this.toMySQLDate(this.currentDate);


    const newBlogPost = {
      title: this.title,
      content: this.content,
      cat: this.cat,
      author: userData.username,
      user_id: userData.user_id,
      created_date: this.mysqlFormattedDate,
    };

   

    this.blogService.addBlogPost(newBlogPost).subscribe((response) => {
      // console.log('Added Blog Post:', response);
      this.router.navigate(["/"])
      
    });
  }
}
