import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';
import { CurrencyCode } from 'currency-codes-ts/dist/types';

import { CommonConstant } from '@/constant';
import { DashboardConstant } from '@/constant/dashboard';
import { DashboardFetcher, QuoteFetcher } from '@/fetcher';
import { dashboardMachine } from '@/machines/dashboard';
import { DashboardTransformer } from '@/transformer';
import { VDashboardCalendarTable, VDashboardRankTable } from '@/types';
import { Utils } from '@/utils';

export default function useDashboardData() {
  const [state, send] = useMachine(dashboardMachine, {});

  const { data: aggregateData } = useQuery({
    queryFn: () => DashboardFetcher.FindAggregate(),
    queryKey: ['dashboard aggregate'],
  });

  const { data: calendarData } = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => DashboardFetcher.FindCalendar(state.context.currentDate.toDate()),
    queryKey: ['dashboard calendar', state.context.currentDate.month(), state.context.currentDate.year()],
  });

  const { data: quoteData } = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => QuoteFetcher.FindRandom(),
    queryKey: ['dashboard quote'],
  });

  const categoryChartData = aggregateData
    ? DashboardTransformer.VCDashboardCategoryTransformer(aggregateData.data.category)
    : DashboardConstant.DEFAULT_DASHBOARD_CATEGORY_CHART;

  const priceRankingList: VDashboardRankTable[] = aggregateData
    ? aggregateData.data.ranking.map((item) => DashboardTransformer.VTDashboardRankTransformer(item))
    : [];

  const generalData =
    aggregateData && aggregateData.data.displayForex
      ? DashboardTransformer.VDashboardGeneralDisplayTransformer(
          aggregateData.data.general,
          aggregateData.data.displayForex as CurrencyCode,
        )
      : aggregateData
        ? DashboardTransformer.VDashboardGeneralDisplayTransformer(aggregateData.data.general)
        : DashboardConstant.DEFAULT_DASHBOARD_GENERAL_DISPLAY;

  const liveCount: string = aggregateData
    ? Utils.NumberWithCommas(aggregateData.data.liveCount)
    : CommonConstant.DEFAULT_EMPTY_STRING;
  const deadCount: string = aggregateData
    ? Utils.NumberWithCommas(aggregateData.data.deadCount)
    : CommonConstant.DEFAULT_EMPTY_STRING;
  const totalCount: string = aggregateData
    ? Utils.NumberWithCommas(aggregateData.data.liveCount + aggregateData.data.deadCount)
    : CommonConstant.DEFAULT_EMPTY_STRING;

  const calendarTableData: VDashboardCalendarTable[] = calendarData
    ? calendarData.data.birthday.map((item) => DashboardTransformer.VTDashboardCalendarTransformer(item))
    : [];

  const todaysQuoteData = quoteData ? quoteData.data : null;

  return {
    calendarTableData,
    categoryChartData,
    deadCount,
    generalData,
    liveCount,
    priceRankingList,
    send,
    state,
    todaysQuoteData,
    totalCount,
  };
}
