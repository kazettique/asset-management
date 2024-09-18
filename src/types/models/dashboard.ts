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

export interface MDashboardAggregate {
  category: {
    avg: {
      endPrice: NNumber;
      startPrice: NNumber;
    };
    categoryId: NType<Id>;
    count: {
      categoryId: NNumber;
    };
    max: {
      endPrice: NNumber;
      startPrice: NNumber;
    };
    sum: {
      endPrice: NNumber;
      startPrice: NNumber;
    };
  }[];
  endCurrency: {
    assetCount: NNumber;
    currencyName: NString;
  }[];
  general: {
    avg: {
      endPrice: NNumber;
      startPrice: NNumber;
    };
    max: {
      endPrice: NNumber;
      startPrice: NNumber;
    };
    sum: {
      endPrice: NNumber;
      startPrice: NNumber;
    };
  };
  ranking: {
    categoryName: NString;
    name: string;
    startCurrency: NString;
    startDate: NType<Date>;
    startPrice: NNumber;
  }[];
  startCurrency: {
    assetCount: NNumber;
    currencyName: NString;
  }[];
}
