import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetContainerComponent } from './timesheet-container.component';

describe('TimesheetComponent', () => {
  let component: TimesheetContainerComponent;
  let fixture: ComponentFixture<TimesheetContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimesheetContainerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
