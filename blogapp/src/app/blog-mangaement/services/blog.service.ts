import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:4000/posts/';
  private addApiUrl = 'http://localhost:4000/posts/addpost';

  getBlogPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addBlogPost(blogData: any): Observable<any> {
    // const token = this.authService.getToken();
    const token = localStorage.getItem('UserToken');

    // Create headers with the authorization token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Include headers in the request options
    const requestOptions = { headers: headers };

    return this.http.post<any>(this.addApiUrl, blogData, requestOptions);
  }

  getBlogPost(blogid: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + blogid);
  }
}
