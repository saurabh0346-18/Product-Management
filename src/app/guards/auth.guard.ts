import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

 // auth.guard.ts
canActivate(): boolean {
  if (this.authService.isAuthenticated()) {
    return true;
  }
  this.router.navigate(['/sign-in']);
  return false;
}
}
