import { CommonConstant } from '@/constant';
import {
  DDashboardAggregate,
  MDashboardAggregate,
  VDashboardAggregate,
  VDashboardRank,
  VDashboardRankTable,
} from '@/types';
import { Utils } from '@/utils';

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
      general: {
        avg: src.general._avg,
        max: src.general._max,
        sum: src.general._sum,
      },
      ranking: src.ranking.map((item) => ({
        categoryName: item.category.name,
        name: item.name,
        startDate: item.startDate,
        startForex: item.startForex,
        startPrice: item.startPrice,
      })),
    };
  }

  // model -> view model
  public static MVDashboardAggregateTransformer(src: MDashboardAggregate): VDashboardAggregate {
    return src;
  }

  // view model -> table model
  public static VTDashboardRankTransformer(src: VDashboardRank): VDashboardRankTable {
    let startPrice: string = CommonConstant.DEFAULT_EMPTY_STRING;

    if (src.startPrice && src.startForex) {
      const calculatedPrice = Utils.ConvertToTargetCurrency(src.startPrice, src.startForex.rate);
      startPrice = '(' + src.startForex.targetCurrency + ') ' + Utils.NumberWithCommas(calculatedPrice);
    } else if (src.startPrice) {
      startPrice = '(' + CommonConstant.BASE_CURRENCY + ') ' + Utils.NumberWithCommas(src.startPrice);
    }

    return {
      categoryName: src.categoryName,
      name: src.name,
      startDate: src.startDate ? Utils.GetDateTimeString(src.startDate) : CommonConstant.DEFAULT_EMPTY_STRING,
      startPrice,
    };
  }
}
