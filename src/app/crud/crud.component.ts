import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { fadeInTrigger, buttonHover, rowAnimation, buttonScaleAnimation } from '../animations';
import { ViewProductDialogComponent } from '../view-product-dialog/view-product-dialog.component';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  manufactureDate?: Date;
  stockStatus: string;
  discountAvailable: boolean;
  description?: string;
  imageUrl?: string; // Add image URL to the product interface
}

@Component({
  selector: 'app-crud',
  templateUrl: '../crud/crud.component.html',
  styleUrls: ['../crud/crud.component.scss'],
  standalone: false,
  animations: [
    fadeInTrigger,
    buttonHover,
    rowAnimation,
    buttonScaleAnimation
  ]
})
export class CrudComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'price', 'category', 'stockStatus', 'discountAvailable', 'manufactureDate', 'description', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);
  pageSize: number = 10;  // Default page size
  pageIndex: number = 0;
  searchText: string = '';  // Property to bind the search text

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Dynamic styles for buttons
  buttonColor: string = 'blue'; // Default color
  textColor: string = 'white'; // Default text color

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadDataFromLocalStorage();
    this.setButtonStyles();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Navigate to add product page
  navigateToAddProduct(): void {
    this.router.navigate(['/add-product']);
  }

  // Edit existing product
  editItem(index: number): void {
    const product = this.dataSource.data[index];
    console.log(product);
    this.openEditDialog(product);
  }

  // Delete product with confirmation
  deleteItem(index: number): void {
    const product = this.dataSource.data[index];
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Are you sure you want to delete "${product.name}"?` },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        const data = this.dataSource.data;
        data.splice(index, 1); // Remove the product from the array
        this.dataSource.data = [...data]; // Update the data source
        this.saveDataToLocalStorage(); // Save the updated data to local storage
      }
    });
  }

  // Navigate to home page
  goToHome(): void {
    this.router.navigate(['/home']);
  }

  // Log out and remove auth token
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  // Save data to local storage
  private saveDataToLocalStorage(): void {
    localStorage.setItem('products', JSON.stringify(this.dataSource.data));
  }

  // Load data from local storage
  private loadDataFromLocalStorage(): void {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      this.dataSource.data = JSON.parse(savedProducts);
    }
  }

  // Handle page change
  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  // Open dialog for editing a product
  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      data: { product, mode: 'edit' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.dataSource.data.findIndex((p) => p === product);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource.data = [...this.dataSource.data];
          this.saveDataToLocalStorage();
        }
      }
    });
  }

  // Open dialog for viewing a product
  openViewDialog(index: any): void {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const product = products[index];
    const dialogRef = this.dialog.open(ViewProductDialogComponent, {
      data: { product, mode: 'view' }, // Pass mode as 'view' for view-only
      width: '80vw',  // Set dialog width to 80% of the viewport width
      height: '60vh', // Set dialog height to 80% of the viewport height
      enterAnimationDuration: '500ms', // Animation duration for opening
      exitAnimationDuration: '300ms'
    });

    dialogRef.afterClosed().subscribe();
  }

  // Set button styles based on user authentication or other conditions
  private setButtonStyles(): void {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      this.buttonColor = 'green'; // Change to green if logged in
      this.textColor = 'white';
    } else {
      this.buttonColor = 'blue'; // Default color
      this.textColor = 'white';
    }
  }

  // Handle image selection
  onImageSelect(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        this.dataSource.data[index].imageUrl = imageUrl;
        this.dataSource.data = [...this.dataSource.data]; // Refresh the data source
        this.saveDataToLocalStorage();
      };
      reader.readAsDataURL(file); // Convert image to base64 string
    }
  }

  // Apply filter for search functionality
  applyFilter(): void {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  // Clear the search input
  clearSearch(): void {
    this.searchText = '';
    this.applyFilter();
  }
}
