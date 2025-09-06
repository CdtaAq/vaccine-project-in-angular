import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.signup({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: () => {
        this.message = 'Signup successful! Please login.';
        this.router.navigate(['/login']);
      },
      error: () => this.message = 'Signup failed.'
    });
  }
}
