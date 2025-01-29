import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service'; // Import AuthService
import { CustomValidators } from '../custom-validators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  standalone: false,
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  categories: string[] = [
    'Electronics', 
    'Furniture', 
    'Clothing', 
    'Books', 
    'Toys', 
    'Groceries', 
    'Sports & Outdoors', 
    'Health & Beauty', 
    'Automotive', 
    'Home Appliances', 
    'Jewelry', 
    'Stationery', 
    'Pet Supplies', 
    'Musical Instruments', 
    'Garden & Outdoor', 
    'Food & Beverages', 
    'Baby Products', 
    'Crafts & Hobbies'
  ];
  
  descriptionLength = 0;
  charLimit = 150;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]],
      description: ['', [Validators.maxLength(150)]],
      manufactureDate: [null, [Validators.required]],
      discountAvailable: [false],
      stockStatus: ['In Stock', [Validators.required]],
      image: [null, [CustomValidators.imageSize]]
    });
  }

  ngOnInit(): void {}

  // Getter methods for easy access to form control validation status
  get name() {
    return this.productForm.get('name');
  }

  get price() {
    return this.productForm.get('price');
  }

  get category() {
    return this.productForm.get('category');
  }

  get description() {
    return this.productForm.get('description');
  }

  get manufactureDate() {
    return this.productForm.get('manufactureDate');
  }

  get stockStatus() {
    return this.productForm.get('stockStatus');
  }

  get image() {
    return this.productForm.get('image');
  }

  // Handle image file selection
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.productForm.patchValue({ image: file }); // Update the form with selected image
    }
  }

  // Handle description change and enforce character limit
  onDescriptionChange(event: any): void {
    const inputText = event.target.value;
    this.descriptionLength = inputText.length;
    if (this.descriptionLength > this.charLimit) {
      event.target.value = inputText.slice(0, this.charLimit); // Truncate to 150 characters
      this.descriptionLength = this.charLimit; // Update length to max limit
    }
  }

  // Navigate to product list
  navigateToProductList(): void {
    this.router.navigate(['/crud']);
  }

  // Handle form submission
  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct = this.productForm.value;

      if (this.selectedImage) {
        // Upload image and get its URL
        this.authService.uploadImage(this.selectedImage).then((imageUrl: string) => {
          newProduct.imageUrl = imageUrl; // Assign image URL to product
          this.saveProductToLocalStorage(newProduct); // Save the product to local storage
          this.router.navigate(['/crud']); // Redirect to CRUD component
        }).catch((error) => {
          console.error('Image upload failed:', error);
          alert('Image upload failed. Please try again.');
        });
      } else {
        newProduct.imageUrl = ''; // Use a placeholder or empty value for imageUrl
        this.saveProductToLocalStorage(newProduct);
        this.router.navigate(['/crud']); // Redirect to CRUD component
      }
    } else {
      console.log('Form is invalid');
    }
  }

  // Save product to local storage
  private saveProductToLocalStorage(product: any): void {
    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');

    // Limit the number of products stored to 100 to avoid quota exceeded error
    if (existingProducts.length >= 100) {
      existingProducts.shift(); // Remove the oldest product
    }

    existingProducts.push(product);
    localStorage.setItem('products', JSON.stringify(existingProducts));
  }
}
