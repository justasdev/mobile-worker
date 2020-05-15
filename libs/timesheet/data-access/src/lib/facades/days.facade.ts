import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {
  groupBy,
  map,
  mergeMap,
  shareReplay,
  switchMap,
  toArray,
} from 'rxjs/operators';

import { MwEventsFacade } from './mw-events.facade';
import { DayInfo, MwEvent } from '@mobile-worker/timesheet/shared/types';
import { toDateString } from '@mobile-worker/timesheet/shared/helpers';
import { mwEventsToDayInfo } from '../helpers';

@Injectable({ providedIn: 'root' })
export class DaysFacade {
  groupedMwEvents$: Observable<MwEvent[][]> = this.eventsFacade.mwEvents$.pipe(
    switchMap((events) =>
      from(events.map((e) => e)).pipe(
        groupBy((e) => toDateString(e.date)),
        mergeMap((eventsGroup) => eventsGroup.pipe(toArray())),
        toArray()
      )
    ),
    shareReplay(1)
  );

  /**
   * @description
   * Since we deal with small amounts of data, it is efficient to
   * do this aggregation here. In case of large amounts of data,
   * memoized pipe would be more efficient approach, so only data
   * that needs to be displayed would be aggregated.
   * In real application we should paginate our data in backend and
   * keep state small.
   */
  dayInfos$: Observable<DayInfo[]> = this.groupedMwEvents$.pipe(
    map((events) => events.map(mwEventsToDayInfo)),
    shareReplay(1)
  );

  constructor(private eventsFacade: MwEventsFacade) {}
}
