import { Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { DataStateTestingComponent } from './data-state-testing/data-state-testing.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/todos' },
  { path: 'todos', component: TodosComponent },
  { path: 'data-state-testing', component: DataStateTestingComponent },
  { path: '*', redirectTo: '/todos' },
  { path: '**', redirectTo: '/todos' }, // should have 404 component, but some time constraint is in place..
];
