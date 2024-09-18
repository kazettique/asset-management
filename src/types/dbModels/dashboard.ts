import { Id, NNumber, NString, NType } from '../base';

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
  endCurrency: {
    _count: { endCurrency: NNumber };
    endCurrency: NString;
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
    startCurrency: NString;
    startDate: NType<Date>;
    startPrice: NNumber;
  }[];
  startCurrency: {
    _count: { startCurrency: NNumber };
    startCurrency: NString;
  }[];
}
