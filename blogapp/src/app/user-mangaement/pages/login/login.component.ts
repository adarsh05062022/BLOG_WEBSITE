import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  onSubmit(): void {
    console.log('Form value is ->>>> ', this.loginForm.value);

    this.http
      .post<any>('http://localhost:4000/auth/login', this.loginForm.value)
      .subscribe(
        (res) => {
          console.log(res.data)
          const UserData = JSON.stringify(res.data)
          localStorage.setItem("UserToken",res.token)
          localStorage.setItem("UserData",UserData)
          this.loginForm.reset();
          this.router.navigate(["/"])


          

        },
        (err) => {
          alert('something went wrong');
        }
      );
  }
}
