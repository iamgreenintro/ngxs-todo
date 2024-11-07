import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormDialogComponent } from './todo-form-dialog.component';

describe('TodoFormDialogComponent', () => {
  let component: TodoFormDialogComponent;
  let fixture: ComponentFixture<TodoFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
