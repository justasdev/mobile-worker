import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  TemplateRef,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';

import { GdGridModel } from '@mobile-worker/shared/components';
import { DayInfo } from '@mobile-worker/timesheet/shared/types';
import { now } from '@mobile-worker/timesheet/shared/helpers';
import { isSameDay } from 'date-fns';

@Component({
  selector: 'mw-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetComponent implements OnInit, OnChanges {
  @ViewChild('durationTpl', { static: true }) durationTpl: TemplateRef<any>;

  today = now();

  @Input() days: DayInfo[];
  @Input() selectedDay = this.today;

  @Output() addTask = new EventEmitter<Date>();
  @Output() goToTimesheet = new EventEmitter();

  selectedDayInfo: DayInfo;

  detailsGridHeaderGap = '6px';
  detailsGridRowsGap = '4px';
  headerClass = 'gray-text';
  rightAllignedHeaderClass = 'gray-text align-right';

  hoursDetails: GdGridModel;
  additionalHoursDetails: GdGridModel;
  expensesDetails: GdGridModel = [
    {
      header: 'Type',
      prop: 'name',
      headerClass: this.headerClass,
      columnWidth: '1fr',
    },
    {
      header: 'Quantity',
      prop: 'quantity',
      cellClass: 'align-right',
      headerClass: this.rightAllignedHeaderClass,
      columnWidth: '0.5fr',
    },
    {
      header: 'Total',
      prop: 'total',
      cellClass: 'align-right',
      headerClass: this.rightAllignedHeaderClass,
      columnWidth: '0.5fr',
    },
  ];

  ngOnInit() {
    this.hoursDetails = [
      {
        header: 'Type',
        prop: 'name',
        columnWidth: '1fr',
      },
      {
        header: 'Duration',
        prop: 'duration',
        cellClass: 'align-right',
        columnWidth: 'auto',
        headerClass: this.rightAllignedHeaderClass,
        cellTemplate: this.durationTpl,
      },
    ];
    this.additionalHoursDetails = [
      {
        header: 'Type',
        prop: 'name',
        columnWidth: '1fr',
      },
      {
        header: 'Amount',
        prop: 'duration',
        cellClass: 'align-right',
        headerClass: this.rightAllignedHeaderClass,
        columnWidth: 'auto',
        cellTemplate: this.durationTpl,
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setSelectedDay();
  }

  setSelectedDay() {
    if (this.days && this.selectedDay) {
      this.selectedDayInfo = this.days.find(({ date }) =>
        isSameDay(date, this.selectedDay)
      );
    }
  }

  goToCurrentDay() {
    this.selectedDay = this.today;
    this.setSelectedDay();
  }
}
