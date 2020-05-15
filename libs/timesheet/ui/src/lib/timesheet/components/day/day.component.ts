import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
} from '@angular/core';
import { get } from 'lodash';

import { Day, ApprovalState } from '@mobile-worker/timesheet/shared/types';
import { isSameDay, isWeekend } from 'date-fns';
import { now } from '@mobile-worker/timesheet/shared/helpers';

@Component({
  selector: 'mw-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayComponent {
  @Input() day: Day;

  @Input() @HostBinding('class.selected') selected: boolean;

  @HostBinding('class.current') get isCurrent() {
    return isSameDay(get(this.day, 'date'), now());
  }
  @HostBinding('class.weekend') get isWeekend() {
    return isWeekend(get(this.day, 'date'));
  }

  get showDayDetails() {
    return get(this.day, 'dayType') !== ApprovalState.None;
  }
}
