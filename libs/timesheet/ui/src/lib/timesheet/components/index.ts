import { DayComponent } from './day/day.component';
import { WeekComponent } from './week/week.component';
import { TimesheetComponent } from './timesheet/timesheet.component';

export * from './timesheet/timesheet.component';
export * from './week/week.component';
export * from './day/day.component';

export const timesheetComponents = [
  TimesheetComponent,
  WeekComponent,
  DayComponent,
];
