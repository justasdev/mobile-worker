import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

import { MwEvent, MwEventDto } from '@mobile-worker/timesheet/shared/types';

@Injectable({ providedIn: 'root' })
export class MwEventService extends EntityCollectionServiceBase<MwEventDto> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('MwEvent', serviceElementsFactory);
  }
}
