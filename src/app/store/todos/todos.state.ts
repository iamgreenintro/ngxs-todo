import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
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
  private counter: number = 0;
  @Selector()
  static getState(state: TodosStateModel) {
    return state;
  }

  @Action(TodoActions.Add)
  add(ctx: StateContext<TodosStateModel>, action: TodoActions.Add) {
    const stateModel = ctx.getState();

    action.todo.id = this.counter += 1;
    ctx.setState({
      ...stateModel,
      todos: [...stateModel.todos, action.todo],
    });
  }

  @Action(TodoActions.Delete)
  delete(ctx: StateContext<TodosStateModel>, action: TodoActions.Delete) {
    const stateModel = ctx.getState();

    const newTodos: TodoInterface[] | undefined = stateModel.todos.filter(
      (todo) => todo.id !== action.id
    );
    ctx.setState({
      ...stateModel,
      todos: newTodos,
    });
  }
}
