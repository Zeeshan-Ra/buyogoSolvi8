import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.http.post('https://buyogo-assignment.onrender.com/api/v1/login', loginData)
        .pipe(
          catchError(error => {
            console.error('Login failed', error);
            return throwError(error);
          })
        )
        .subscribe(response => {
          console.log('Login successful', response);
          this.router.navigate(['/login-success']);
          alert("Logged In Successfully")
        });
    } else {
      console.log('Form is invalid');
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
