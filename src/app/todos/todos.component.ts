import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { TodoActions } from '../store/todos/todos.actions';
import {
  TodoInterface,
  TodosState,
  TodosStateModel,
} from '../store/todos/todos.state';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { TodoFormDialogComponent } from '../todo-form-dialog/todo-form-dialog.component';

@Component({
  selector: 'todos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  todosState$: Observable<TodosStateModel> = new Observable();
  todos: TodoInterface[] = [];
  todoFormGroup: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    archived: new FormControl(false),
  });

  tableDatasource: MatTableDataSource<TodoInterface> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'archived',
    'actions',
  ];
  constructor(
    private store: Store,
    private route: Router,
    private dialog: MatDialog
  ) {
    this.todosState$ = this.store.select(TodosState.getState);
  }

  ngOnInit(): void {
    this.todosState$.subscribe((state) => {
      this.todos = state.todos;
      this.tableDatasource.data = this.todos;
    });
  }

  navigate(): void {
    this.route.navigate(['/data-state-testing']);
  }

  addTodo(fg: FormGroup): void {
    const todo: TodoInterface = {
      title: fg.get('title')?.value,
      description: fg.get('description')?.value,
      archived: false,
    };
    this.store.dispatch(new TodoActions.Add(todo));
  }

  openTodoFormDialog(): void {
    const dialogReference: MatDialogRef<TodoFormDialogComponent> =
      this.dialog.open(TodoFormDialogComponent, { disableClose: true });

    dialogReference
      .afterClosed()
      .subscribe((dialogResponse: { action: boolean; fg?: FormGroup }) => {
        if (dialogResponse.action && dialogResponse.fg) {
          this.addTodo(dialogResponse.fg);
        }
      });
  }
}
