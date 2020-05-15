import { Component, OnInit } from '@angular/core';
import { EntityOp } from '@ngrx/data';

import { mainMenu } from './app.module.routing';
import { MwEventService } from '@mobile-worker/timesheet/data-access';
import { SnackBarService } from '@mobile-worker/timesheet/shared/services';

@Component({
  selector: 'mobile-worker-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  mainMenuRoutes = mainMenu;

  constructor(
    private mwEventService: MwEventService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    /**
     * Fetch data once on app init.
     * It would be also possible to fetch data on first subscription to entities in facade,
     * or in container components. It violates Single responsibility principle, since it
     * invokes data fetching and talks to snackbar service. Just didn't wanted to overcomplicate
     * already complicated solution. So let's keep it simple!
     */
    this.mwEventService.getAll();

    this.setupSnackbar();
  }

  private setupSnackbar() {
    const snackBar = this.snackBarService;

    this.mwEventService.errors$.subscribe(
      ({
        payload: {
          data: {
            error: { message },
          },
        },
      }) => {
        this.snackBarService.showErrorMessage(message);
      }
    );

    this.mwEventService.entityActions$.subscribe(
      ({ payload: { entityOp } }) => {
        switch (entityOp) {
          case EntityOp.SAVE_ADD_ONE_SUCCESS:
            snackBar.showSuccessMessage('Created something new!');
            break;
          case EntityOp.SAVE_DELETE_ONE_SUCCESS:
            snackBar.showSuccessMessage('Getting rid of old stuff!');
            break;
          case EntityOp.SAVE_UPDATE_ONE_SUCCESS:
            snackBar.showSuccessMessage('Life is changing!');
        }
      }
    );
  }
}
