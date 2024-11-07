import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataStateTestingComponent } from './data-state-testing.component';

describe('DataStateTestingComponent', () => {
  let component: DataStateTestingComponent;
  let fixture: ComponentFixture<DataStateTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataStateTestingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataStateTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
