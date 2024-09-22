import { Id, Name, NNumber, NString, NType } from '../base';
import { DDashboardCalendar, DDashboardCalendarBirthday } from '../dbModels';

// export interface DDashboard {
//   calendar: {};
//   recent: {};
//   statistics: {
//     categoryCount: {
//       count: number;
//       id: Id;
//       name: string;
//     }[];
//     sumEndPrice: number;
//     sumStartPrice: number;
//     sumThisYearEndPrice: number;
//     sumThisYearStartPrice: number;
//   };
// }

export interface MDashboardRank {
  categoryName: string;
  name: string;
  startDate: NType<Date>;
  startForex: NType<{ rate: number; targetCurrency: string }>;
  startPrice: NNumber;
}

export interface MDashboardCategory {
  avg: { endPrice: NNumber; startPrice: NNumber };
  categoryId: Id;
  categoryName: Name;
  count: { categoryId: NNumber };
  max: { endPrice: NNumber; startPrice: NNumber };
  sum: { endPrice: NNumber; startPrice: NNumber };
}

export interface MDashboardGeneral {
  avg: { endPrice: NNumber; startPrice: NNumber };
  max: { endPrice: NNumber; startPrice: NNumber };
  sum: { endPrice: NNumber; startPrice: NNumber };
}

export interface MDashboardAggregate {
  category: MDashboardCategory[];
  deadCount: number;
  general: MDashboardGeneral;
  liveCount: number;
  ranking: MDashboardRank[];
}

export interface MDashboardCalendarBirthday extends DDashboardCalendarBirthday {}

export interface MDashboardCalendar extends DDashboardCalendar {}
