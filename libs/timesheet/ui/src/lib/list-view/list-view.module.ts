import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';

import { listViewContainers, TableContainerComponent } from './containers';
import {
  AgGridTemplateRendererComponent,
  listViewComponents,
} from './components';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [...listViewContainers, ...listViewComponents],
  imports: [
    CommonModule,
    MatIconModule,
    AgGridModule.withComponents([AgGridTemplateRendererComponent]),
    RouterModule.forChild([
      {
        path: '',
        component: TableContainerComponent,
        children: [
          {
            path: 'update/:id',
            loadChildren: () =>
              import('@mobile-worker/timesheet/ui').then(
                (m) => m.TaskCreationModule
              ),
          },
        ],
      },
    ]),
    MatTooltipModule,
  ],
})
export class ListViewModule {}
