import { CommonConstant } from '@/constant';
import { DashboardConstant } from '@/constant/dashboard';
import {
  DDashboardAggregate,
  MDashboardAggregate,
  NNumber,
  VDashboardAggregate,
  VDashboardCategory,
  VDashboardCategoryChart,
  VDashboardGeneral,
  VDashboardGeneralDisplay,
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
        categoryName:
          src.allCategories.find((_item) => _item.id === item.categoryId)?.name || CommonConstant.DEFAULT_EMPTY_STRING,
        count: item._count,
        max: item._max,
        sum: item._sum,
      })),
      deadCount: src.deadCount,
      general: {
        avg: src.general._avg,
        max: src.general._max,
        sum: src.general._sum,
      },
      liveCount: src.liveCount,
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

  // view model -> chart model
  public static VCDashboardCategoryTransformer(src: VDashboardCategory[]): VDashboardCategoryChart {
    return src.reduce<VDashboardCategoryChart>((acc, curr, index, arr) => {
      return {
        avgEndPrice: [
          ...acc.avgEndPrice,
          {
            id: curr.categoryName,
            label: curr.categoryName,
            value: curr.avg.endPrice ? Math.round(curr.avg.endPrice) : 0,
          },
        ],
        avgStartPrice: [
          ...acc.avgStartPrice,
          {
            id: curr.categoryName,
            label: curr.categoryName,
            value: curr.avg.startPrice ? Math.round(curr.avg.startPrice) : 0,
          },
        ],
        count: [
          ...acc.count,
          {
            id: curr.categoryName,
            label: curr.categoryName,
            value: curr.count.categoryId || 0,
          },
        ],
        maxEndPrice: [
          ...acc.maxEndPrice,
          {
            id: curr.categoryName,
            label: curr.categoryName,
            value: curr.max.endPrice ? Math.round(curr.max.endPrice) : 0,
          },
        ],
        maxStartPrice: [
          ...acc.maxStartPrice,
          {
            id: curr.categoryName,
            label: curr.categoryName,
            value: curr.max.startPrice ? Math.round(curr.max.startPrice) : 0,
          },
        ],
        sumEndPrice: [
          ...acc.sumEndPrice,
          {
            id: curr.categoryName,
            label: curr.categoryName,
            value: curr.sum.endPrice ? Math.round(curr.sum.endPrice) : 0,
          },
        ],
        sumStartPrice: [
          ...acc.sumStartPrice,
          {
            id: curr.categoryName,
            label: curr.categoryName,
            value: curr.sum.startPrice ? Math.round(curr.sum.startPrice) : 0,
          },
        ],
      };
    }, DashboardConstant.DEFAULT_DASHBOARD_CATEGORY_CHART);
  }

  public static VDashboardGeneralDisplayTransformer(src: VDashboardGeneral): VDashboardGeneralDisplay {
    const transformPrice = (price: NNumber) =>
      '$' + (price ? Utils.NumberWithCommas(Math.round(price)) : CommonConstant.DEFAULT_EMPTY_STRING);

    return {
      avg: {
        endPrice: transformPrice(src.avg.endPrice),
        startPrice: transformPrice(src.avg.startPrice),
      },
      max: {
        endPrice: transformPrice(src.max.endPrice),
        startPrice: transformPrice(src.max.startPrice),
      },
      sum: {
        endPrice: transformPrice(src.sum.endPrice),
        startPrice: transformPrice(src.sum.startPrice),
      },
    };
  }
}
