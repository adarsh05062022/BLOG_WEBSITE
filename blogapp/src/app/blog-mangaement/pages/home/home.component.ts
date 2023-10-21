import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  blogPosts: any = null;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getBlogPosts().subscribe((response: any) => {
     
      this.blogPosts = response.data;
    });
  }
}
