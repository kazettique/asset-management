import { Id, NNumber, NType } from '../base';

export interface DDashboardAggregate {
  category: {
    _avg: {
      endPrice: NNumber;
      startPrice: NNumber;
    };
    _count: {
      categoryId: NNumber;
    };
    _max: {
      endPrice: NNumber;
      startPrice: NNumber;
    };
    _sum: {
      endPrice: NNumber;
      startPrice: NNumber;
    };
    categoryId: NType<Id>;
  }[];
  general: {
    _avg: {
      endPrice: NNumber;
      startPrice: NNumber;
    };
    _max: {
      endPrice: NNumber;
      startPrice: NNumber;
    };
    _sum: {
      endPrice: NNumber;
      startPrice: NNumber;
    };
  };
  ranking: {
    category: { name: string } | null;
    name: string;
    startDate: NType<Date>;
    startForex: NType<{ rate: number; targetCurrency: string }>;
    startPrice: NNumber;
  }[];
}
