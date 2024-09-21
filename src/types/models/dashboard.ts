import { Id, NNumber, NString, NType } from '../base';

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

export interface MDashboardAggregate {
  category: {
    avg: { endPrice: NNumber; startPrice: NNumber };
    categoryId: NType<Id>;
    count: { categoryId: NNumber };
    max: { endPrice: NNumber; startPrice: NNumber };
    sum: { endPrice: NNumber; startPrice: NNumber };
  }[];
  general: {
    avg: { endPrice: NNumber; startPrice: NNumber };
    max: { endPrice: NNumber; startPrice: NNumber };
    sum: { endPrice: NNumber; startPrice: NNumber };
  };
  ranking: MDashboardRank[];
}
