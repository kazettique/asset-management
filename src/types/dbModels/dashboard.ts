import { Id, Name, NNumber, NString, NType } from '../base';

export interface DDashboardAggregate {
  allCategories: { id: Id; name: Name }[];
  category: {
    _avg: { endPrice: NNumber; startPrice: NNumber };
    _count: { categoryId: NNumber };
    _max: { endPrice: NNumber; startPrice: NNumber };
    _sum: { endPrice: NNumber; startPrice: NNumber };
    categoryId: Id;
  }[];
  deadCount: number;
  displayForex: string;
  general: {
    _avg: { endPrice: NNumber; startPrice: NNumber };
    _max: { endPrice: NNumber; startPrice: NNumber };
    _sum: { endPrice: NNumber; startPrice: NNumber };
  };
  liveCount: number;
  ranking: {
    category: { name: string };
    name: string;
    startDate: NType<Date>;
    startForex: NType<{ rate: number; targetCurrency: string }>;
    startPrice: NNumber;
  }[];
}

export interface DDashboardCalendarBirthday {
  name: string;
  rate: NNumber;
  startDate: Date;
  startPrice: NNumber;
  targetCurrency: NString;
}

export interface DDashboardCalendar {
  birthday: DDashboardCalendarBirthday[];
}
