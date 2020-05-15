import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MwEventsFacade } from '@mobile-worker/timesheet/data-access';
import { MwEvent } from '@mobile-worker/timesheet/shared/types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mw-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableContainerComponent {
  constructor(
    public mwEventsFacade: MwEventsFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  deleteMwEvent(mwEvent: MwEvent) {
    this.mwEventsFacade.deleteMwEvent(mwEvent);
  }

  updateMwEvent({ id }: MwEvent) {
    this.router.navigate(['update', id], { relativeTo: this.route });
  }
}
