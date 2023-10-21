import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileServicesService {

  constructor(private http: HttpClient) { }

  private userDetailsApi = 'http://localhost:4000/user/';
  private userPostApi = 'http://localhost:4000/user/';
  private deletePostApi = 'http://localhost:4000/posts/'

  getUserDetails(id:number): Observable<any[]> {
    return this.http.get<any[]>(this.userDetailsApi+id);
  }

  getUserPosts(id:number): Observable<any[]> {
    return this.http.get<any[]>(this.userPostApi+id+"/post/");
  }

  deleteUserPost(blogid:number): Observable<any[]>{
    const token = localStorage.getItem('UserToken');
   

    // Create headers with the authorization token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Include headers in the request options
    const requestOptions = { headers: headers };
    return  this.http.delete<any[]>(this.deletePostApi+blogid,requestOptions);
  }
}
