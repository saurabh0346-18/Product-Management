import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false, // Keep this false if it's part of a module
})
export class HomeComponent {
  username: string;

  constructor(private router: Router) {
    // Safely parsing user data from localStorage
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.username = user?.name || 'User'; // Use optional chaining to avoid undefined errors
  }

  // Logout method
  logout(): void {
    // Clear the current user from localStorage
    localStorage.removeItem('currentUser');
    // Redirect to the login page
    this.router.navigate(['/sign-in']); // Update route to match lazy-loaded login module
    console.log('User logged out');
  }

  // Navigate to CRUD component
  goToCrud(): void {
    this.router.navigate(['/crud']); // Navigate to lazy-loaded CRUD module
  }

  goToProduct(): void {
    this.router.navigate(['/add-product']); // Navigate to lazy-loaded CRUD module
  }
}
