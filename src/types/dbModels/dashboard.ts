import { Id, Name, NNumber, NType } from '../base';

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
