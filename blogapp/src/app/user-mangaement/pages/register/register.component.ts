import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public registerForm!: FormGroup;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
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
    console.log('Form value is ->>>> ', this.registerForm.value);

    this.http
      .post<any>('http://localhost:4000/auth/register', this.registerForm.value)
      .subscribe(
        (res) => {
          console.log(res);

          this.registerForm.reset();

          setTimeout(() => this.router.navigate(['/register']), 2000);
        },
        (err) => {
          alert('something went wrong');
        }
      );
  }
}
