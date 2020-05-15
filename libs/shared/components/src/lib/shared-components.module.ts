import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@angular/flex-layout';

import { GdGridComponent } from './gd-grid/gd-grid.component';

@NgModule({
  declarations: [GdGridComponent],
  imports: [CommonModule, GridModule],
  exports: [GdGridComponent],
})
export class SharedComponentsModule {}
