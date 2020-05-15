import { EventType } from './enums';

/**
 * In prod we use SimpleEnum type for such mappings
 * that contains value, name, and belongings.
 * It is very convenient to use with pipes.
 */
export const MW_EVENT_TO_STRING = {
  [EventType.Expenses]: 'Expenses',
  [EventType.AdditionalHours]: 'Additional Hours',
  [EventType.Hours]: 'Hours',
};
