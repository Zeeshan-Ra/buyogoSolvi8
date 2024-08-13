import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginsuccessComponent } from './loginsuccess/loginsuccess.component';
import { SignupsuccessComponent } from './signupsuccess/signupsuccess.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'login-success', component: LoginsuccessComponent },
  { path: 'signup-success', component: SignupsuccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }