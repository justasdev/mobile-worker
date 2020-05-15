import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, switchMap, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

import { TaskCreationService } from '../../services';
import { MwEventsFacade } from '@mobile-worker/timesheet/data-access';
import { toDateIfValid } from '@mobile-worker/timesheet/shared/helpers';
import { SnackBarService } from '@mobile-worker/timesheet/shared/services';

@Component({
  selector: 'mw-create-task-container',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskContainerComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskCreationService: TaskCreationService,
    private mwEventsFacade: MwEventsFacade,
    private snackBarService: SnackBarService,
    private location: Location
  ) {}

  ngOnInit() {
    const { day, id } = this.route.snapshot.params;
    if (day) {
      this.openForCreate(day);
    } else if (id) {
      this.openForUpdate(id);
    } else {
      this.snackBarService.showErrorMessage('You should not be here');
    }
  }

  private openForCreate(day: string) {
    const date = toDateIfValid(day);
    if (!date) {
      this.goBack();
      return;
    }

    // Observable will complete after modal closes, so no need to unsubscribe.
    this.taskCreationService.openCreationModal(date).subscribe((res) => {
      if (res) {
        this.mwEventsFacade.addMwEvent({ ...res, date });
      }
      this.goBack();
    });
  }

  private openForUpdate(id: string) {
    return this.mwEventsFacade
      .getMwEventById(id)
      .pipe(
        tap((event) => {
          if (!event) {
            this.snackBarService.showErrorMessage(
              `Because of dynamically generated , ids are generated on every refresh,
             therefore currently is not possible to not lose 'update' modal state after refresh.`
            );
            this.goBack();
          }
        }),
        first(),

        switchMap((mwEvent) => this.taskCreationService.openEditModal(mwEvent))
      )
      .subscribe((res) => {
        if (res) {
          this.mwEventsFacade.updateMwEvent(res);
        }
        this.goBack();
      });
  }

  private goBack() {
    /**
     * Navigating back with router is not working with lazy loaded modules.
     * In production we would need to either not use routed dialogs, or
     * implement functionality to go back to route, that modal was opened from.
     */
    this.location.back();
  }
}
