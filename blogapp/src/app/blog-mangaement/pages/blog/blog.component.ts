import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogdata: any;

  blogId: any;

  constructor(private route: ActivatedRoute, private blogService: BlogService) {
    this.blogId = this.route.snapshot.paramMap.get('blogId');
  }

  ngOnInit() {
    // const data: any = localStorage.getItem('blog');
    // this.blogdata = JSON.parse(data);
    // console.log(this.blogdata);

    this.blogService.getBlogPost(this.blogId).subscribe((response: any) => {
      this.blogdata = response.data;
      
    });
  }


}
