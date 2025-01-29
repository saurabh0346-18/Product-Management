import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';
import { CustomValidators } from '../custom-validators';
import { fadeInAnimation } from '../animations';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: false,
  animations: [fadeInAnimation], // Retained fade-in animation
})
export class SignUpComponent {
  signUpForm: FormGroup;
  loading = false;
  hidePassword = true;  // To toggle visibility of password
  hideConfirmPassword = true;  // To toggle visibility of confirm password

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.signUpForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8), // Retained minimum length validator
            CustomValidators.passwordStrength(8), // Custom password strength validator
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: CustomValidators.match('password', 'confirmPassword'),
      }
    );
  }

  getPasswordStrengthText(): string {
    const password = this.signUpForm.get('password')?.value || '';
    if (password.length < 8) {
      return 'Weak';
    }
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return 'Strong';
    }
    return 'Medium';
  }

  getPasswordStrengthClass(): string {
    const strengthText = this.getPasswordStrengthText();
    return {
      Weak: 'weak',
      Medium: 'medium',
      Strong: 'strong',
    }[strengthText] || 'weak'; // Default to 'weak' if undefined
  }

  onSubmit(): void {
    this.signUpForm.markAllAsTouched();

    if (this.signUpForm.invalid) {
      return; // No snack bar for invalid form
    }

    if (!this.loading) {
      this.loading = true;
      const { name, email, password } = this.signUpForm.value;

      this.authService.signUp({ name, email, password }).subscribe(
        (response) => {
          this.loading = false;
          if (response.success) {
            // Only one snack bar for successful registration
            this.snackBar.open('Account created successfully!', 'Close', {
              duration: 3000,
              panelClass: ['snack-bar-success'],
            });
            this.router.navigate(['/sign-in']);
          } else if (response.error && response.error.code === 'USER_EXISTS') {
            // Display message if the user already exists
            this.snackBar.open('This email is already registered. Please use a different email.', 'Close', {
              duration: 3000,
              panelClass: ['snack-bar-error'],
            });
          } else {
            // Handle other types of errors silently or with a message
            this.snackBar.open('This email is already registered. Please use a different email.', 'Close', {
              duration: 3000,
              panelClass: ['snack-bar-error'],
            });
          }
        },
        () => {
          this.loading = false;
          // Handle error silently or show a generic error message
          this.snackBar.open('Something went wrong. Please try again later.', 'Close', {
            duration: 3000,
            panelClass: ['snack-bar-error'],
          });
        }
      );
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    // No snack bar for toggling the password visibility
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
    // No snack bar for toggling the confirm password visibility
  }
}
