import {
  Component,
  Input,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { GridOptions } from 'ag-grid-community';

import { MwEvent } from '@mobile-worker/timesheet/shared/types';
import { AgGridTemplateRendererComponent } from '../ag-grid-template-renderer/ag-grid-template-renderer.component';
import { toDateString } from '@mobile-worker/timesheet/shared/helpers';
import {
  compareByApprovalState,
  compareByType,
  getApprovalState as _getApprovalState,
  getMwEventType,
} from '@mobile-worker/timesheet/data-access';
import { MW_EVENT_TO_STRING } from '@mobile-worker/timesheet/shared/static-data';

const dateCellRenderer = ({ value }) => toDateString(value);

@Component({
  selector: 'mw-events-table',
  templateUrl: './mw-events-table.component.html',
  styleUrls: ['./mw-events-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MwEventsTableComponent implements AfterViewInit {
  @ViewChild('deleteCellTpl', { static: true }) deleteCellTpl: TemplateRef<any>;
  @ViewChild('updateCellTpl', { static: true }) updateCellTpl: TemplateRef<any>;
  @ViewChild('eventTypeTpl', { static: true }) eventTypeTpl: TemplateRef<any>;
  @ViewChild('approvalTpl', { static: true }) approvalTpl: TemplateRef<any>;

  @Output() deleteMwEvent = new EventEmitter<MwEvent>();
  @Output() updateMwEvent = new EventEmitter<MwEvent>();

  gridOptions: GridOptions = {};

  get columns() {
    /**
     * In production I would go for implementing automatic column sizing
     * depending on it's content
     */
    return [
      {
        headerName: 'Date',
        field: 'date',
        sortable: true,
        width: 130,
        cellRenderer: dateCellRenderer,
      },
      {
        headerName: 'Event',
        field: 'eventTypeName',
        sortable: true,
      },
      {
        headerName: 'Quantity',
        field: 'quantity',
        sortable: true,
        width: 100,
      },
      {
        headerName: 'Price',
        field: 'price',
        sortable: true,
        width: 80,
      },
      {
        headerName: 'Type',
        field: 'quantity',
        sortable: true,
        comparator: (_, __, { data }, { data: data1 }) => {
          return compareByType(data, data1);
        },
        width: 75,
        cellRendererFramework: AgGridTemplateRendererComponent,
        cellRendererParams: {
          templateRef: this.eventTypeTpl,
        },
      },
      {
        headerName: 'Approval',
        field: 'approval',
        sortable: true,
        comparator: (_, __, { data }, { data: data1 }) => {
          return compareByApprovalState(data, data1);
        },
        width: 100,
        cellRendererFramework: AgGridTemplateRendererComponent,
        cellRendererParams: {
          templateRef: this.approvalTpl,
        },
      },
      {
        headerName: 'Delete',
        colId: 'delete',
        width: 80,
        cellRendererFramework: AgGridTemplateRendererComponent,
        cellRendererParams: {
          templateRef: this.deleteCellTpl,
        },
      },
      {
        headerName: 'Update',
        colId: 'update',
        width: 100,
        cellRendererFramework: AgGridTemplateRendererComponent,
        cellRendererParams: {
          templateRef: this.updateCellTpl,
        },
      },
    ];
  }

  @Input() set events(val: MwEvent[]) {
    setTimeout(() => {
      this.gridOptions.api.setRowData(val);
    });
  }

  ngAfterViewInit() {
    this.gridOptions.api.setColumnDefs(this.columns);
  }

  getEventTypeIcon({
    isExpenseType,
    isHoursEventType,
    isAdditionalHoursEventType,
  }) {
    /**
     * Would be nice to keep these in single place.
     * Same icons are used in timesheet.
     * Room for improvement - add to static-data lib.
     */
    if (isExpenseType) {
      return 'attach_money';
    } else if (isHoursEventType) {
      return 'schedule';
    } else if (isAdditionalHoursEventType) {
      return 'add_alarm';
    }
  }

  getTooltip(mwEvent: MwEvent) {
    return MW_EVENT_TO_STRING[getMwEventType(mwEvent)];
  }

  getApprovalState(mwEvent: MwEvent) {
    return _getApprovalState(mwEvent);
  }

  getApprovalTooltip({ isApproved, isRejected }: MwEvent) {
    return isApproved ? 'Aprroved' : isRejected ? 'Rejected' : null;
  }
}
