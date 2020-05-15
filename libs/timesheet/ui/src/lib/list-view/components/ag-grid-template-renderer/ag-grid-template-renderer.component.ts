import { Component, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'mw-template-renderer',
  template: `
    <ng-container
      *ngTemplateOutlet="template; context: templateContext"
    ></ng-container>
  `,
  // It is possible to use host property, but tslint doesn't like it
  styles: [':host{ display: block; text-align: center; }'],
})
export class AgGridTemplateRendererComponent
  implements ICellRendererAngularComp {
  template: TemplateRef<any>;
  templateContext: { $implicit: any; params: any };

  refresh(params: any): boolean {
    this.templateContext = {
      $implicit: params.data,
      params: params,
    };
    return true;
  }

  agInit(params: ICellRendererParams): void {
    this.template = params['templateRef'];
    this.refresh(params);
  }
}
