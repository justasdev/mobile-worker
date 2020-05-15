import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  OnDestroy,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TaskCreationModalData } from '../../task-creation.types';
import {
  DATE_FORMAT,
  MW_EVENT_TO_STRING,
  EventType,
} from '@mobile-worker/timesheet/shared/static-data';
import {
  getFlagsByEventType,
  getMwEventType,
} from '@mobile-worker/timesheet/data-access';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mw-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskComponent implements OnInit, OnDestroy {
  get isUpdate() {
    return !!this.data.mwEvent;
  }

  // Could be provided by injection token, to decouple from concrete constant
  dateFormat = DATE_FORMAT;

  eventTypes = [
    { title: MW_EVENT_TO_STRING[EventType.Hours], value: EventType.Hours },
    {
      title: MW_EVENT_TO_STRING[EventType.AdditionalHours],
      value: EventType.AdditionalHours,
    },
    {
      title: MW_EVENT_TO_STRING[EventType.Expenses],
      value: EventType.Expenses,
    },
  ];

  form: FormGroup;

  subscriptions = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TaskCreationModalData,
    private matDialogRef: MatDialogRef<CreateTaskComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const { mwEvent } = this.data;

    if (this.isUpdate) {
      this.form = this.formBuilder.group({
        eventTypeName: [mwEvent.eventTypeName, Validators.required],
        eventType: getMwEventType(mwEvent),
        quantity: mwEvent.quantity,
        price: mwEvent.price,
        isWorkHour: mwEvent.isWorkHour,
        isApproved: mwEvent.isApproved,
        isRejected: mwEvent.isRejected,
      });
    } else {
      this.form = this.formBuilder.group({
        eventTypeName: ['', Validators.required],
        eventType: EventType.Hours,
        quantity: 0,
        price: 0,
        isWorkHour: true,
        isApproved: false,
        isRejected: false,
      });
    }
    this.setupCheckboxes();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  submit() {
    const {
      valid,
      value: {
        eventTypeName,
        eventType,
        quantity,
        price,
        isWorkHour,
        isApproved,
        isRejected,
      },
    } = this.form;

    if (valid) {
      const payload = {
        eventTypeName,
        quantity,
        price,
        isWorkHour,
        isApproved,
        isRejected,
        ...getFlagsByEventType(eventType),
      };

      if (this.isUpdate) {
        return this.matDialogRef.close({ ...this.data.mwEvent, ...payload });
      }
      return this.matDialogRef.close(payload);
    }
  }

  private setupCheckboxes() {
    const controls = [this.form.get('isApproved'), this.form.get('isRejected')];
    controls
      .map((control) =>
        control.valueChanges.subscribe((val) => {
          if (val) {
            controls.forEach((otherControl) => {
              if (otherControl !== control) {
                otherControl.setValue(false);
              }
            });
          }
        })
      )
      .forEach((subscription) => this.subscriptions.add(subscription));
  }
}
