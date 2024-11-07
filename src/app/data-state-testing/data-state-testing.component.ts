import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TodosState, TodosStateModel } from '../store/todos/todos.state';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-data-state-testing',
  standalone: true,
  imports: [],
  templateUrl: './data-state-testing.component.html',
  styleUrl: './data-state-testing.component.scss',
})
export class DataStateTestingComponent {
  todosState$: Observable<TodosStateModel> = new Observable();
  constructor(private store: Store) {
    this.todosState$ = this.store.select(TodosState.getState);
    this.todosState$.subscribe((todosState) => {
      const todos = todosState.todos;
      console.log(todos);
    });
  }
}
