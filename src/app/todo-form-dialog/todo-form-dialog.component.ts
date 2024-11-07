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
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TodoInterface } from '../store/todos/todos.state';

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
  data: TodoInterface | null = inject(MAT_DIALOG_DATA);

  constructor() {
    if (this.data) {
      this.todoFormGroup.get('title')?.setValue(this.data.title);
      this.todoFormGroup.get('description')?.setValue(this.data.description);
    }
  }

  cancel(): void {
    this.dialogRef.close({ action: false });
  }

  submitValues(): void {
    const todo: TodoInterface = {
      id: this.data?.id,
      title: this.todoFormGroup.get('title')?.value,
      description: this.todoFormGroup.get('description')?.value,
      archived: this.data?.archived ? true : false, // add a checkbox for editing archive value ..
    };
    this.dialogRef.close({ action: true, todo: todo });
  }
}
