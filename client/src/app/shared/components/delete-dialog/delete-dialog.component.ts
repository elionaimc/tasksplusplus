import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-dialog',
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatDialogClose,
    MatButtonModule,
    MatDialogContent,
    MatIconModule
],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) { }
}