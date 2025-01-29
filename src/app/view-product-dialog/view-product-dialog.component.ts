import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { dialogFadeIn, dialogFadeOut, bounce, fadeInTrigger } from '../animations'; // Import bounce animation for cool effect

@Component({
  selector: 'app-view-product-dialog',
  templateUrl: './view-product-dialog.component.html',
  styleUrls: ['./view-product-dialog.component.scss'],
  standalone: false,
  animations: [
    dialogFadeIn,   // Add the dialog fade-in animation
    dialogFadeOut,  // Add the dialog fade-out animation
    bounce,
    fadeInTrigger      // Add bounce animation for an extra touch
  ]
})
export class ViewProductDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ViewProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: any, mode: string }
  ) {
    console.log('Dialog Data:', data); // For debugging, ensure data is received properly
  }

  // Close the dialog when the Close button is clicked
  closeDialog(): void {
    this.dialogRef.close();
  }
}
