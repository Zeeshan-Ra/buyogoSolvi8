import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signupsuccess',
  standalone: true,
  imports: [],
  templateUrl: './signupsuccess.component.html',
  styleUrl: './signupsuccess.component.css'
})
export class SignupsuccessComponent {
  constructor(private router: Router){
    
  }

    goToLogin() {
      this.router.navigate(['/login']);
    }
}
