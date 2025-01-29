import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { confirmDialogAnimation, fadeInAnimation } from '../animations'; // Import the animation
import { buttonHover } from '../animations'; // Import button hover animation

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  standalone: false,
  animations: [confirmDialogAnimation, buttonHover, fadeInAnimation] // Add animations here
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Close the dialog without confirming
  onCancel(): void {
    this.dialogRef.close(false);
  }

  // Close the dialog and confirm the action
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
