import { MwEvent } from '@mobile-worker/timesheet/shared/types';

export interface TaskCreationModalData {
  date?: Date;
  mwEvent?: MwEvent;
}
