import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Initialize authentication state based on localStorage
    this.isAuthenticatedSubject.next(this.isAuthenticated());
  }

  /**
   * Registers a new user by saving the data in localStorage.
   * @param data - User data (name, email, password)
   * @returns Observable indicating success or failure
   */
  signUp(data: { name: string; email: string; password: string }): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u: any) => u.email === data.email);

    if (existingUser) {
      return of({ success: false, message: 'Email is already registered' });
    }

    users.push(data);
    localStorage.setItem('users', JSON.stringify(users));
    return of({ success: true, message: 'User registered successfully' });
  }

  /**
   * Authenticates a user by checking credentials in localStorage.
   * @param data - User credentials (email, password)
   * @returns Observable indicating success or failure
   */
  signIn(data: { email: string; password: string }): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: any) => u.email === data.email && u.password === data.password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.isAuthenticatedSubject.next(true);
      return of({ success: true, message: 'Sign-in successful', user });
    }

    return of({ success: false, message: 'Invalid credentials' });
  }

  /**
   * Logs out the current user by clearing the session data.
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Checks if a user is currently authenticated.
   * @returns boolean indicating authentication status
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  /**
   * Get the current user from localStorage
   * @returns The current user object or null
   */
  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  /**
   * Save products to localStorage
   * @param products - Array of products to be saved
   */
  saveProducts(products: any[]): void {
    localStorage.setItem('products', JSON.stringify(products));
  }

  /**
   * Retrieve products from localStorage
   * @returns Array of products
   */
  getProducts(): any[] {
    return JSON.parse(localStorage.getItem('products') || '[]');
  }

  /**
   * Simulate image upload and return the image URL (base64 format)
   * @param image - The image file to upload
   * @returns Promise that resolves with the image URL
   */
  uploadImage(image: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);  // Return the image as a base64 URL
      };
      reader.readAsDataURL(image);
    });
  }

  /**
   * Add a product to the list in localStorage
   * @param product - The product object to be added
   */
  addProduct(product: any): void {
    const products = this.getProducts();
    products.push(product);
    this.saveProducts(products);
  }
}
