import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { TaskCreationModalData } from '../task-creation.types';
import { CreateTaskComponent } from '../components';
import { MwEvent } from '@mobile-worker/timesheet/shared/types';

@Injectable({
  providedIn: 'root',
})
export class TaskCreationService {
  get config(): MatDialogConfig {
    const config = new MatDialogConfig();
    config.panelClass = 'mw-task-modal';
    return config;
  }

  constructor(private matDialog: MatDialog) {}

  openCreationModal(date: Date): Observable<Partial<MwEvent>> {
    const config = this.config;
    config.data = { date } as TaskCreationModalData;
    return this.matDialog.open(CreateTaskComponent, config).afterClosed();
  }

  openEditModal(mwEvent: MwEvent): Observable<MwEvent> {
    const config = this.config;
    config.data = { mwEvent } as TaskCreationModalData;
    return this.matDialog.open(CreateTaskComponent, config).afterClosed();
  }
}
