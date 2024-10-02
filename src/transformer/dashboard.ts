import { CurrencyCode } from 'currency-codes-ts/dist/types';
import getSymbolFromCurrency from 'currency-symbol-map';
import dayjs from 'dayjs';

import { CommonConstant } from '@/constant';
import { DashboardConstant } from '@/constant/dashboard';
import {
  DDashboardAggregate,
  DDashboardCalendar,
  MDashboardAggregate,
  MDashboardCalendar,
  MForex,
  NNumber,
  VDashboardAggregate,
  VDashboardCalendar,
  VDashboardCalendarBirthday,
  VDashboardCalendarTable,
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
      displayForex: src.displayForex,
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
      startPrice = getSymbolFromCurrency(src.startForex.targetCurrency) + Utils.NumberWithCommas(calculatedPrice);
    } else if (src.startPrice) {
      startPrice = getSymbolFromCurrency(CommonConstant.BASE_CURRENCY) + Utils.NumberWithCommas(src.startPrice);
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

  public static VDashboardGeneralDisplayTransformer(
    src: VDashboardGeneral,
    displayForex: CurrencyCode = 'USD',
  ): VDashboardGeneralDisplay {
    const transformPrice = (price: NNumber) =>
      getSymbolFromCurrency(displayForex) +
      (price ? Utils.NumberWithCommas(Math.round(price)) : CommonConstant.DEFAULT_EMPTY_STRING);

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

  public static DMDashboardCalendarTransformer(src: DDashboardCalendar): MDashboardCalendar {
    return src;
  }

  public static MVDashboardCalendarTransformer(src: MDashboardCalendar): VDashboardCalendar {
    return src;
  }

  // view model -> table model
  public static VTDashboardCalendarTransformer(src: VDashboardCalendarBirthday): VDashboardCalendarTable {
    let startPrice: string = CommonConstant.DEFAULT_EMPTY_STRING;

    if (src.startPrice && src.targetCurrency && src.rate) {
      const calculatedPrice = Utils.ConvertToTargetCurrency(src.startPrice, src.rate);
      startPrice = getSymbolFromCurrency(src.targetCurrency) + Utils.NumberWithCommas(calculatedPrice);
    } else if (src.startPrice) {
      startPrice = getSymbolFromCurrency(CommonConstant.BASE_CURRENCY) + Utils.NumberWithCommas(src.startPrice);
    }

    let age: string = dayjs().diff(dayjs(src.startDate), 'year') + 'yr old';

    return {
      age,
      name: src.name,
      startDate: src.startDate ? Utils.GetDateTimeString(src.startDate) : CommonConstant.DEFAULT_EMPTY_STRING,
      startPrice,
    };
  }

  // price convert for dashboard aggregate data
  public static MDashboardCalculatePriceTransformer(
    src: MDashboardAggregate,
    displayForex: MForex,
  ): MDashboardAggregate {
    const rate = displayForex.rate;

    return {
      ...src,
      category: src.category.map((item) => ({
        ...item,
        avg: {
          endPrice: item.avg.endPrice ? Utils.ConvertToTargetCurrency(item.avg.endPrice, rate) : item.avg.endPrice,
          startPrice: item.avg.startPrice
            ? Utils.ConvertToTargetCurrency(item.avg.startPrice, rate)
            : item.avg.endPrice,
        },
        max: {
          endPrice: item.max.endPrice ? Utils.ConvertToTargetCurrency(item.max.endPrice, rate) : item.max.endPrice,
          startPrice: item.max.startPrice
            ? Utils.ConvertToTargetCurrency(item.max.startPrice, rate)
            : item.max.endPrice,
        },
        sum: {
          endPrice: item.sum.endPrice ? Utils.ConvertToTargetCurrency(item.sum.endPrice, rate) : item.sum.endPrice,
          startPrice: item.sum.startPrice
            ? Utils.ConvertToTargetCurrency(item.sum.startPrice, rate)
            : item.avg.endPrice,
        },
      })),
      general: {
        avg: {
          endPrice: src.general.avg.endPrice
            ? Utils.ConvertToTargetCurrency(src.general.avg.endPrice, rate)
            : src.general.avg.endPrice,
          startPrice: src.general.avg.startPrice
            ? Utils.ConvertToTargetCurrency(src.general.avg.startPrice, rate)
            : src.general.avg.startPrice,
        },
        max: {
          endPrice: src.general.max.endPrice
            ? Utils.ConvertToTargetCurrency(src.general.max.endPrice, rate)
            : src.general.max.endPrice,
          startPrice: src.general.max.startPrice
            ? Utils.ConvertToTargetCurrency(src.general.max.startPrice, rate)
            : src.general.max.startPrice,
        },
        sum: {
          endPrice: src.general.sum.endPrice
            ? Utils.ConvertToTargetCurrency(src.general.sum.endPrice, rate)
            : src.general.sum.endPrice,
          startPrice: src.general.sum.startPrice
            ? Utils.ConvertToTargetCurrency(src.general.sum.startPrice, rate)
            : src.general.sum.startPrice,
        },
      },
    };
  }
}
