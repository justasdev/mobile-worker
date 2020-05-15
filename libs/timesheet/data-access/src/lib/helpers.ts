import {
  DayInfo,
  ApprovalState,
  EventType,
  ExpenseDetail,
  HoursDetail,
  MwEvent,
  MwEventDto,
} from '@mobile-worker/timesheet/shared/types';
import { toDateString } from '@mobile-worker/timesheet/shared/helpers';

export const eventDtoToEvent = (eventDto: MwEventDto) =>
  ({
    ...eventDto,
    date: new Date(eventDto.date),
    firstTaskStart: new Date(eventDto.firstTaskStart),
    lastTaskEnd: new Date(eventDto.lastTaskEnd),
  } as MwEvent);

export const eventToDto = (event: MwEvent) =>
  ({
    ...event,
    date: toDateString(event.date),
    firstTaskStart: toDateString(event.date),
    lastTaskEnd: toDateString(event.date),
  } as MwEventDto);

export const sortEventsByDate = (
  { date: d1 }: MwEvent,
  { date: d2 }: MwEvent,
  dir = 1
) => {
  const t1 = d1.getTime();
  const t2 = d2.getTime();
  if (t1 === t2) {
    return 0;
  }
  return t1 < t2 ? dir : dir * -1;
};

/**
 * @param mwEvents MwEvents of single day
 * @return DayInfo (summary of day events)
 */
export const mwEventsToDayInfo = (mwEvents: MwEvent[]) => {
  if (!mwEvents.length) {
    return;
  }
  const hoursDetails: HoursDetail[] = [];
  const additionalHoursDetails: HoursDetail[] = [];
  const expenseDetails: ExpenseDetail[] = [];
  let workHours = 0;
  let approved = true;
  let rejected = false;
  for (const event of mwEvents) {
    approved = approved && event.isApproved;
    rejected = event.isRejected || rejected;
    //              isExpenseType  x - - x
    //           isHoursEventType  - x - x
    // isAdditionalHoursEventType  - - x x
    //                 isWorkHour  x x x x
    if (event.isHoursEventType) {
      hoursDetails.push({
        name: event.eventTypeName,
        duration: event.quantity,
      });
    } else if (event.isExpenseType) {
      expenseDetails.push({
        name: event.eventTypeName,
        quantity: event.quantity,
        total: event.price,
      });
    } else if (event.isAdditionalHoursEventType) {
      additionalHoursDetails.push({
        name: event.eventTypeName,
        duration: event.quantity,
      });
    }
    if (event.isWorkHour && !event.isExpenseType) {
      workHours += event.quantity;
    }
  }

  let dayType: ApprovalState;
  if (!approved && !rejected) {
    dayType = ApprovalState.Neutral;
  } else if (approved) {
    dayType = ApprovalState.Positive;
  } else if (rejected) {
    dayType = ApprovalState.Negative;
  }

  const { date, firstTaskStart, lastTaskEnd } = mwEvents[0];

  return {
    date,
    workHours,
    dayType,
    hoursDetails,
    expenseDetails,
    additionalHoursDetails,
    firstTaskStart,
    lastTaskEnd,
  } as DayInfo;
};

export const getMwEventType = ({
  isExpenseType,
  isAdditionalHoursEventType,
  isHoursEventType,
}: MwEvent | MwEventDto) => {
  if (isExpenseType) {
    return EventType.Expenses;
  }
  if (isAdditionalHoursEventType) {
    return EventType.AdditionalHours;
  }
  if (isHoursEventType) {
    return EventType.Hours;
  }
};

export const getApprovalState = ({ isApproved, isRejected }: MwEvent) => {
  if (isApproved) {
    return ApprovalState.Positive;
  }
  if (isRejected) {
    return ApprovalState.Negative;
  }
};

export const compareByApprovalState = (
  { isApproved, isRejected }: MwEvent,
  { isApproved: appr1, isRejected: reject1 }: MwEvent
) => {
  const a = Number(isApproved) + Number(isRejected) * 10;
  const b = Number(appr1) + Number(reject1) * 10;
  return a < b ? -1 : a > b ? 1 : 0;
};

export const compareByType = (
  { isExpenseType, isHoursEventType, isAdditionalHoursEventType }: MwEvent,
  {
    isExpenseType: ex,
    isHoursEventType: het,
    isAdditionalHoursEventType: ad,
  }: MwEvent
) => {
  const a =
    Number(isExpenseType) +
    Number(isHoursEventType) * 13 +
    Number(isAdditionalHoursEventType) * 100;
  const b = Number(ex) + Number(het) * 13 + Number(ad) * 100;

  return a < b ? -1 : a > b ? 1 : 0;
};

export const getFlagsByEventType = (eventType: EventType) => ({
  isAdditionalHoursEventType: eventType === EventType.AdditionalHours,
  isHoursEventType: eventType === EventType.Hours,
  isExpenseType: eventType === EventType.Expenses,
});
