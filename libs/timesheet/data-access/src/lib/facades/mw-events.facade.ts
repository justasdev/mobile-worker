import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MwEvent } from '@mobile-worker/timesheet/shared/types';
import { toDateString } from '@mobile-worker/timesheet/shared/helpers';
import { MwEventService } from '../services/mw-event.service';
import { eventDtoToEvent, eventToDto, sortEventsByDate } from '../helpers';

@Injectable({ providedIn: 'root' })
export class MwEventsFacade {
  mwEvents$: Observable<MwEvent[]> = this.mwEventService.entities$.pipe(
    map((eventDtos) => eventDtos.map(eventDtoToEvent).sort(sortEventsByDate))
  );

  constructor(private mwEventService: MwEventService) {}

  deleteMwEvent(mwEvent: MwEvent) {
    this.mwEventService.delete(mwEvent as any);
  }

  addMwEvent(mwEvent: Partial<MwEvent>) {
    /**
     * firstTaskStart and lastTaskEnd can be safely ignored, because they are
     * not required in mocked backend, therefore typecasting to any.
     */
    this.mwEventService.add(
      {
        ...mwEvent,
        date: toDateString(mwEvent.date),
      } as any,
      { isOptimistic: false }
    );
  }

  updateMwEvent(mwEvent: MwEvent) {
    this.mwEventService.update(eventToDto(mwEvent));
  }

  getMwEventById(id: string) {
    return this.mwEvents$.pipe(
      map((events) => events.find(({ id: _id }) => _id === id))
    );
  }
}
