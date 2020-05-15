import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CreateTaskComponent, taskCreationComponents } from './components';
import {
  CreateTaskContainerComponent,
  taskCreationContainers,
} from './containers';
import { RouterModule } from '@angular/router';
import { TaskCreationService } from './services';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FlexModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [...taskCreationContainers, ...taskCreationComponents],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    RouterModule.forChild([
      {
        path: '',
        component: CreateTaskContainerComponent,
      },
    ]),
    MatButtonToggleModule,
    FlexModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  providers: [TaskCreationService],
  entryComponents: [CreateTaskComponent],
})
export class TaskCreationModule {}
