import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../crud/crud.component'; // Adjust the import path as necessary

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss'],
  standalone: false,
})
export class EditProductDialogComponent {
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

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { product: Product; mode: 'add' | 'edit' }
  ) {
    this.productForm = this.fb.group({
      name: [data.product?.name || '', [Validators.required]],
      price: [data.product?.price || 0, [Validators.required, Validators.min(0.01)]], // Price must be greater than 0
      category: [data.product?.category || '', [Validators.required]],
      description: [data.product?.description || '', [Validators.maxLength(150)]],
      manufactureDate: [data.product?.manufactureDate || null, [Validators.required]],
      discountAvailable: [data.product?.discountAvailable || false],
      stockStatus: [data.product?.stockStatus || 'In Stock'],
      imageUrl: [data.product?.imageUrl || '']  // Include imageUrl in the form group
    });
  }

  onDescriptionChange(event: any): void {
    const inputText = event.target.value;
    this.descriptionLength = inputText.length;

    if (this.descriptionLength > this.charLimit) {
      event.target.value = inputText.slice(0, this.charLimit); // Truncate to 150 characters
      this.descriptionLength = this.charLimit; // Update length to max limit
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;

      // Save product data (without image handling)
      this.saveProduct(formData);
    }
  }

  private saveProduct(product: Product): void {
    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    const index = products.findIndex((p: Product) => p.id === product.id); // Find product by ID
    if (index !== -1) {
      products[index] = product; // Update the existing product
    } else {
      products.push(product); // Add new product
    }
    localStorage.setItem('products', JSON.stringify(products));
    this.dialogRef.close(product); // Close dialog and pass updated product
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
