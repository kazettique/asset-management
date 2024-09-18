import { DDashboardAggregate, MDashboardAggregate, VDashboardAggregate } from '@/types';

export abstract class DashboardTransformer {
  // db model -> model
  public static DMDashboardAggregateTransformer(src: DDashboardAggregate): MDashboardAggregate {
    return {
      category: src.category.map((item) => ({
        avg: item._avg,
        categoryId: item.categoryId,
        count: item._count,
        max: item._max,
        sum: item._sum,
      })),
      endCurrency: src.endCurrency.map((item) => ({
        assetCount: item._count.endCurrency,
        currencyName: item.endCurrency,
      })),
      general: {
        avg: src.general._avg,
        max: src.general._max,
        sum: src.general._sum,
      },
      ranking: src.ranking.map((item) => ({
        categoryName: item.category ? item.category.name : null,
        name: item.name,
        startCurrency: item.startCurrency,
        startDate: item.startDate,
        startPrice: item.startPrice,
      })),
      startCurrency: src.startCurrency.map((item) => ({
        assetCount: item._count.startCurrency,
        currencyName: item.startCurrency,
      })),
    };
  }

  // model -> view model
  public static MVDashboardAggregateTransformer(src: MDashboardAggregate): VDashboardAggregate {
    return src;
  }
}
