import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { DaysFacade } from '@mobile-worker/timesheet/data-access';
import { ActivatedRoute, Router } from '@angular/router';
import { toDateString } from '@mobile-worker/timesheet/shared/helpers';
import { SnackBarService } from '@mobile-worker/timesheet/shared/services';

@Component({
  selector: 'mw-timesheet-container',
  templateUrl: './timesheet-container.component.html',
  styleUrls: ['./timesheet-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetContainerComponent {
  daysInfos$ = this.daysFacade.dayInfos$;

  constructor(
    private daysFacade: DaysFacade,
    private router: Router,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService
  ) {}

  openCreationForm(date: Date) {
    this.router.navigate(['create', toDateString(date)], {
      relativeTo: this.route,
    });
  }

  goToTimesheet() {
    this.snackBarService.showErrorMessage(
      `I simply dunno where to go.. ¯\\_(ツ)_/¯`
    );
  }
}
