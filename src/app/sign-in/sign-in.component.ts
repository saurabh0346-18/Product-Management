import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInTriggerNew, bounce } from '../animations'; // Import the animations
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: false,
  animations: [
    fadeInTriggerNew, // Use the fadeIn animation
    bounce, // Use the bounce animation
  ],
})
export class SignInComponent {
  email = '';
  password = '';
  emailTouched = false;
  passwordTouched = false;
  loading = false;
  apiError: string | null = null;

  hidePassword = true;  // To toggle visibility of password

  constructor(private authService: AuthService, private router: Router) {}

  // Sign-in function
  onSignIn(): void {
    if (!this.email || !this.password) {
      return;
    }

    this.loading = true;
    this.apiError = null;

    this.authService.signIn({ email: this.email, password: this.password }).subscribe(
      response => {
        this.loading = false;
        if (response.success) {
          this.router.navigate(['/home']);
        } else {
          this.apiError = response.message || 'Sign-in failed. Please try again.';
        }
      },
      error => {
        this.loading = false;
        this.apiError = 'An error occurred. Please try again later.';
      }
    );
  }

  // Toggle visibility of the password
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
