import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { TodosState, TodosStateModel } from './todos.state';
import { TodosAction } from './todos.actions';

describe('Todos store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([TodosState])]
      
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: TodosStateModel = {
      items: ['item-1']
    };
    store.dispatch(new TodosAction('item-1'));
    const actual = store.selectSnapshot(TodosState.getState);
    expect(actual).toEqual(expected);
  });

});
