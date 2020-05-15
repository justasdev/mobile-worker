import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { isSameDay } from 'date-fns';

import { Day, ApprovalState } from '@mobile-worker/timesheet/shared/types';
import { getDaysFromDate, now } from '@mobile-worker/timesheet/shared/helpers';

@Component({
  selector: 'mw-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekComponent {
  @Input() days: Day[];
  @Input() selectedDay: Date;

  @Input() today = now();

  @Output() selectedDayChange = new EventEmitter<Date>();

  get week() {
    return getDaysFromDate(7, this.today);
  }

  dayClicked(day: Date) {
    if (isSameDay(day, this.selectedDay)) {
      return;
    }
    this.selectedDay = day;
    this.selectedDayChange.emit(day);
  }

  isSelected(date: Date) {
    return isSameDay(date, this.selectedDay);
  }

  findDay(date: Date): Day {
    const day = (this.days || []).find(({ date: _date }) =>
      isSameDay(date, _date)
    );
    return (
      day || {
        date,
        workHours: 0,
        dayType: ApprovalState.None,
      }
    );
  }
}
