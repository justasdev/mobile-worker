import { Inject, Injectable, Optional } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { merge } from 'lodash';

import {
  DEFAULT_SNACKBAR_ERROR_CONFIG,
  DEFAULT_SNACKBAR_SUCCESS_CONFIG,
} from './injection-tokens';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(
    private snackBar: MatSnackBar,
    @Optional()
    @Inject(DEFAULT_SNACKBAR_SUCCESS_CONFIG)
    private snackbarSuccessConfig,
    @Optional()
    @Inject(DEFAULT_SNACKBAR_ERROR_CONFIG)
    private snackbarErrorConfig
  ) {}

  showSuccessMessage(
    message: string,
    action?: string,
    config?: MatSnackBarConfig
  ) {
    this.snackBar.open(
      message,
      action,
      merge(this.snackbarSuccessConfig, config)
    );
  }

  showErrorMessage(
    message: string,
    action?: string,
    config?: MatSnackBarConfig
  ) {
    this.snackBar.open(
      message,
      action,
      merge(this.snackbarErrorConfig, config)
    );
  }
}
