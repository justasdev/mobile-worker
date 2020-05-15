import { format as formatDate, isValid, subDays } from 'date-fns';
import { rangeRight } from 'lodash';

import { DATE_FORMAT } from '@mobile-worker/timesheet/shared/static-data';

export const now = () => new Date();

export const toDateString = (date: Date, format = DATE_FORMAT) =>
  formatDate(date, format);

export const toDateIfValid = (date: string) => {
  let validDate: Date;
  try {
    validDate = new Date(date);
  } catch (e) {
    return;
  }
  if (isValid(validDate)) {
    return validDate;
  }
};

export const padNumber = (number: number) => (number > 9 ? '' : '0') + number;

export const getDaysFromDate = (days: number, date: Date) => {
  return rangeRight(0, days).map((sub) => subDays(date, sub));
};
