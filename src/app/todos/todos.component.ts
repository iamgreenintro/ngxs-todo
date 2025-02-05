import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TodoActions } from '../store/todos/todos.actions';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  TodoInterface,
  TodosState,
  TodosStateModel,
} from '../store/todos/todos.state';
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
  constructor(private store: Store, private dialog: MatDialog) {
    this.todosState$ = this.store.select(TodosState.getState);
  }

  ngOnInit(): void {
    this.todosState$.subscribe((state) => {
      this.todos = state.todos;
      this.tableDatasource.data = this.todos;
    });
  }

  deleteTodo(id: number) {
    this.store.dispatch(new TodoActions.Delete(id));
  }

  editTodo(todo: TodoInterface) {
    this.store.dispatch(new TodoActions.Edit(todo));
  }

  addTodo(todo: TodoInterface): void {
    this.store.dispatch(new TodoActions.Add(todo));
  }

  toggleTodoArchivedState(todo: TodoInterface): void {
    todo.archived = !todo.archived;
    this.editTodo(todo);
  }

  openTodoFormDialog(data?: TodoInterface | null): void {
    const dialogReference: MatDialogRef<TodoFormDialogComponent> =
      this.dialog.open(TodoFormDialogComponent, {
        data: data,
        disableClose: true,
        minWidth: 450,
      });

    dialogReference
      .afterClosed()
      .subscribe((dialogResponse: { action: boolean; todo: TodoInterface }) => {
        if (dialogResponse.action) {
          if (!data) {
            this.addTodo(dialogResponse.todo);
          } else {
            this.editTodo(dialogResponse.todo);
          }
        }
      });
  }
}
