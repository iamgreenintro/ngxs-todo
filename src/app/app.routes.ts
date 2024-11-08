import { Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/todos' },
  { path: 'todos', component: TodosComponent },
  { path: '*', redirectTo: '/todos' },
  { path: '**', redirectTo: '/todos' },
];
