import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskContainerComponent } from './create-task-container.component';

describe('CreateTaskContainerComponent', () => {
  let component: CreateTaskContainerComponent;
  let fixture: ComponentFixture<CreateTaskContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTaskContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
