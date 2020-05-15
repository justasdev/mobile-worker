import { AgGridTemplateRendererComponent } from './ag-grid-template-renderer/ag-grid-template-renderer.component';
import { MwEventsTableComponent } from './mw-events-table/mw-events-table.component';

export * from './ag-grid-template-renderer/ag-grid-template-renderer.component';
export * from './mw-events-table/mw-events-table.component';

export const listViewComponents = [
  AgGridTemplateRendererComponent,
  MwEventsTableComponent,
];
