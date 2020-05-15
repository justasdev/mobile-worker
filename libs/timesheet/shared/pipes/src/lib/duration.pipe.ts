import { Pipe, PipeTransform } from '@angular/core';

import { padNumber } from '@mobile-worker/timesheet/shared/helpers';

@Pipe({
  name: 'mwDuration',
})
export class DurationPipe implements PipeTransform {
  transform(duration: number): unknown {
    return `${padNumber(Math.round(duration / 60))}:${padNumber(
      duration % 60
    )}`;
  }
}
