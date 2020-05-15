import { InjectionToken } from '@angular/core';
import { DEFAULT_MESSAGE_DURATION } from '@mobile-worker/timesheet/shared/static-data';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

/**
 * This is quite an over engineering, just want to show one of approaches of providing configuration
 */
export const DEFAULT_SNACKBAR_SUCCESS_CONFIG = new InjectionToken<
  MatSnackBarConfig
>('snackbar-success-message-config', {
  providedIn: 'any',
  factory: () => ({
    duration: DEFAULT_MESSAGE_DURATION,
    panelClass: 'snackbar-success',
  }),
});

export const DEFAULT_SNACKBAR_ERROR_CONFIG = new InjectionToken<
  MatSnackBarConfig
>('snackbar-error-message-config', {
  providedIn: 'any',
  factory: () => ({
    duration: DEFAULT_MESSAGE_DURATION,
    panelClass: 'snackbar-error',
  }),
});
