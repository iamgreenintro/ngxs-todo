import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { append, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { TodoActions } from './todos.actions';

export interface TodoInterface {
  id?: number;
  title: string;
  description: string;
  archived: boolean;
}

export interface TodosStateModel {
  todos: TodoInterface[];
}

@State<TodosStateModel>({
  name: 'todos',
  defaults: {
    todos: [],
  },
})
@Injectable()
export class TodosState {
  private counter: number = 0; // will act as an ID for the todo's.
  @Selector()
  static getState(state: TodosStateModel) {
    return state;
  }

  @Action(TodoActions.Add)
  add(ctx: StateContext<TodosStateModel>, action: TodoActions.Add) {
    action.todo.id = this.counter += 1;

    ctx.setState(
      patch({
        todos: append<TodoInterface>([action.todo]),
      })
    );
  }

  @Action(TodoActions.Delete)
  delete(ctx: StateContext<TodosStateModel>, action: TodoActions.Delete) {
    const stateModel = ctx.getState();

    // todo index we want to delete
    const removeIndex: number = stateModel.todos.findIndex(
      (todo) => todo.id === action.id
    );

    if (removeIndex >= 0) {
      ctx.setState(
        patch({
          todos: removeItem<TodoInterface>(removeIndex),
        })
      );
    }
  }

  @Action(TodoActions.Edit)
  edit(ctx: StateContext<TodosStateModel>, action: TodoActions.Edit) {
    ctx.setState(
      patch({
        todos: updateItem<TodoInterface>(
          (todo) => todo.id === action.todo.id,
          action.todo
        ),
      })
    );
  }
}
