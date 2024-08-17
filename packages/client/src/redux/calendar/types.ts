import { IBase } from '~/types';

export interface ICalendar extends IBase {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isAllDay: boolean;
  category: string;
}

export type GetCalendarByTimeRequest = {
  startDate?: Date;
  endDate?: Date;
};

export type CreateOrUpdateCalendarRequest = {
  memberIds?: string[];
} & Partial<Omit<ICalendar, 'createAt' | 'updateAt'>>;
