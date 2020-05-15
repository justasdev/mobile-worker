import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SnackBarService } from './snack-bar.service';

@NgModule({
  declarations: [],
  imports: [MatSnackBarModule],
  providers: [SnackBarService],
})
export class SharedServicesModule {}
