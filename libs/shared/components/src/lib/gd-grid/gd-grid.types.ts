import { TemplateRef } from '@angular/core';

export type GdGridModel = {
  header: string;
  prop: string;
  columnWidth?: string;
  headerClass?: string;
  cellClass?: string;
  cellTemplate?: TemplateRef<any>;
}[];
