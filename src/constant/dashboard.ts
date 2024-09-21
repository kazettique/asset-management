import { VDashboardCategoryChart, VDashboardGeneral, VDashboardGeneralDisplay } from '@/types';

import { CommonConstant } from './common';

export abstract class DashboardConstant {
  public static readonly DEFAULT_DASHBOARD_CATEGORY_CHART: VDashboardCategoryChart = {
    avgEndPrice: [],
    avgStartPrice: [],
    count: [],
    maxEndPrice: [],
    maxStartPrice: [],
    sumEndPrice: [],
    sumStartPrice: [],
  };

  public static readonly DEFAULT_DASHBOARD_GENERAL: VDashboardGeneral = {
    avg: { endPrice: null, startPrice: null },
    max: { endPrice: null, startPrice: null },
    sum: { endPrice: null, startPrice: null },
  };

  public static readonly DEFAULT_DASHBOARD_GENERAL_DISPLAY: VDashboardGeneralDisplay = {
    avg: { endPrice: CommonConstant.DEFAULT_EMPTY_STRING, startPrice: CommonConstant.DEFAULT_EMPTY_STRING },
    max: { endPrice: CommonConstant.DEFAULT_EMPTY_STRING, startPrice: CommonConstant.DEFAULT_EMPTY_STRING },
    sum: { endPrice: CommonConstant.DEFAULT_EMPTY_STRING, startPrice: CommonConstant.DEFAULT_EMPTY_STRING },
  };
}
