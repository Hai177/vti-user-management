export type Event = {
  title: string;
  description?: string;
  isAllDay?: boolean;
  start: Date;
  end: Date;
  category: string;
};
