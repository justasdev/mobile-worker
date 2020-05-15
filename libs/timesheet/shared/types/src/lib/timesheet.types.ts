import { ApprovalState } from '@mobile-worker/timesheet/shared/static-data';

export interface MwEventDto {
  id?: string;
  /**
   * Date format ‘YYYY-MM-DD’
   */
  date: string;
  /**
   * Just an event type name. Should be unique in the day scope.
   */
  quantity: number;
  /**
   * Used only with expense
   */
  price: number | null;
  /**
   * Just an event type name. Should be unique in the day scope.
   */
  eventTypeName: string;
  /**
   * If true, ​isHourEventType and isAdditionalHourEventType should be false.
   */
  isExpenseType: boolean;
  /**
   * If true, ​isExpenseType ​ and isAdditionalHourEventType should be false.
   */
  isHoursEventType: boolean;
  /**
   * If true, isHoursEventTypeand isExpenseTypeshould be false.
   */
  isAdditionalHoursEventType: boolean;
  /**
   * Only work hours in the calendar section should be calculated. So if this value is set to false it shouldn’t be added to the hours amount in the calendar section.
   */
  isWorkHour: boolean;
  /**
   * If this is set to true - isRejected ​ should be false.
   */
  isApproved: boolean;
  /**
   * If this is set to true - isApproved ​ should be false.
   */
  isRejected: boolean;
  /**
   * Tasks contain events. This number is used in the calendar section.
   */
  tasksCount: number;
  /**
   * Should be used to calculate first day task start time.
   */
  firstTaskStart: string;
  /**
   * Should be used to calculate last task end time.
   */
  lastTaskEnd: string;
}

interface DateStringsToDates {
  date: Date;
  firstTaskStart: Date;
  lastTaskEnd: Date;
}

export type MwEvent = Omit<MwEventDto, keyof DateStringsToDates> &
  DateStringsToDates;

export interface HoursDetail {
  name: string;
  duration: number;
}

export interface Day {
  date: Date;
  workHours: number;
  dayType: ApprovalState;
}

export interface DayDetails {
  firstTaskStart: Date;
  lastTaskEnd: Date;
  hoursDetails: HoursDetail[];
  expenseDetails: ExpenseDetail[];
  additionalHoursDetails: HoursDetail[];
}

export type DayInfo = Day & DayDetails;

export interface ExpenseDetail {
  name: string;
  quantity: number;
  total: number;
}
