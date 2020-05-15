import { TestBed } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('SnackBarService', () => {
  let service: SnackBarService;
  let snackbar: MatSnackBar;

  beforeEach(() => {
    snackbar = { open: () => {} } as any;
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MatSnackBar,
          useValue: snackbar,
        },
      ],
    });
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test.each([['showSuccessMessage'], ['showErrorMessage']])(
    'should call %s',
    (method) => {
      expect.assertions(1);
      const spy = jest.spyOn(snackbar, 'open');
      // GIVEN
      const message = 'Test';
      const event = 'EVENT';
      const options = {};
      // WHEN
      service[method](message, event, options);
      expect(spy).toBeCalledWith(message, event, options);
    }
  );
});
