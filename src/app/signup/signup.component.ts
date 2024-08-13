import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatStepperModule, MatButtonModule, MatIconModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @ViewChild(MatStepper) stepper!: MatStepper;
  signupForm1: FormGroup;
  signupForm2: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.signupForm1 = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.signupForm2 = this.fb.group({
      orgName: [''],
      orgId: [''],
      designation: [''],
      birthdate: [''],
      city: [''],
      pincode: [''],
    });
  }

  onSubmit() {
    if (this.signupForm1.valid && this.signupForm2) {
      const signupData = { ...this.signupForm1.value, ...this.signupForm2.value };

      this.http.post('https://buyogo-assignment.onrender.com/api/v1/signup', signupData)
        .pipe(
          catchError(error => {
            console.error('Signup failed', error);
            return throwError(error);
          })
        )
        .subscribe(response => {
          console.log('Signup successful', response);
          this.router.navigate(['/signup-success']);
        });
    } else {
      console.log('Form is invalid');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
