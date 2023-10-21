import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent {

  @Input() blog :any; // decorate the property with @Input()

  constructor(private router: Router){}
  
  openBlog(){
    
    const data = JSON.stringify(this.blog)
    localStorage.setItem("blog",data)
  setTimeout(()=> this.router.navigate(["/read"]),1000)

  }

}
