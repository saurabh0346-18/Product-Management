// app.component.ts
import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { routeAnimations } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
  animations: [routeAnimations]
})
export class AppComponent {
  title = 'crudapp';
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/sign-in']);
  }
}