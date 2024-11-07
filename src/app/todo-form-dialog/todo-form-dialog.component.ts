import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'todo-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './todo-form-dialog.component.html',
  styleUrl: './todo-form-dialog.component.scss',
})
export class TodoFormDialogComponent {
  todoFormGroup: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  readonly dialogRef = inject(MatDialogRef<TodoFormDialogComponent>);

  constructor() {
    //
  }

  cancel(): void {
    this.dialogRef.close({ action: false });
  }

  create(): void {
    this.dialogRef.close({ action: true, fg: this.todoFormGroup });
  }
}
