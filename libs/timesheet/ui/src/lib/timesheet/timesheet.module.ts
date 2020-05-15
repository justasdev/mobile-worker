import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { timesheetContainers, TimesheetContainerComponent } from './containers';
import { timesheetComponents } from './components';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { PipesModule } from '@mobile-worker/timesheet/shared/pipes';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { SharedComponentsModule } from '@mobile-worker/shared/components';

@NgModule({
  declarations: [...timesheetContainers, ...timesheetComponents],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    FlexModule,
    PerfectScrollbarModule,
    SharedComponentsModule,
    PipesModule,

    RouterModule.forChild([
      {
        path: '',
        component: TimesheetContainerComponent,
        children: [
          {
            path: 'create/:day',
            pathMatch: 'full',
            loadChildren: () =>
              import('@mobile-worker/timesheet/ui').then(
                (m) => m.TaskCreationModule
              ),
          },
        ],
      },
    ]),
  ],
})
export class TimesheetModule {}
