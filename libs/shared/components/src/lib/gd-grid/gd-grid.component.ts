import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { GdGridModel } from './gd-grid.types';

@Component({
  // Prefix is app, since this is shared in all workspace, not only in timesheet app.
  selector: 'app-gd-grid',
  templateUrl: './gd-grid.component.html',
  styleUrls: ['./gd-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GdGridComponent {
  @Input() gridModel: GdGridModel;
  @Input() data: Object[];
  @Input() gridRows: string;
  @Input() gridGap: string;
  @Input() headerClass: string;

  @Input() headerGap: string;
  @Input() rowsGap: string;

  get gdColumns(): string {
    return this.gridModel
      ? this.gridModel.map(({ columnWidth }) => columnWidth || 'auto').join(' ')
      : '';
  }
}
