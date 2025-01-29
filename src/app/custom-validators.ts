import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static passwordStrength(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';

      if (!value) {
        return null; // No error if value is empty (handled by required validator)
      }

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isValidLength = value.length >= minLength;

      const isStrong = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;

      if (!isStrong) {
        return {
          passwordStrength: 'Password must include uppercase, lowercase, number, special character, and be at least 8 characters long.',
        };
      }

      return null; // Valid password
    };
  }

  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      if (control && matchingControl && control.value !== matchingControl.value) {
        return { match: true };
      }

      return null;
    };
  }

  static imageSize(control: AbstractControl): ValidationErrors | null {
    const file = control.value;

    if (file) {
      const maxSize = 15 * 1024 * 1024; // 4MB
      const minSize = 1; // 1 byte

      if (file.size < minSize || file.size > maxSize) {
        return { imageSize: 'Image size must be between 1 byte and 15 MB.' };
      }
    }

    return null; // Valid image size
  }
}
