import { useQuery } from '@tanstack/react-query';

import { CommonConstant } from '@/constant';
import { DashboardConstant } from '@/constant/dashboard';
import { DashboardFetcher } from '@/fetcher';
import { DashboardTransformer } from '@/transformer';
import { VDashboardRankTable } from '@/types';
import { Utils } from '@/utils';

export default function useDashboardData() {
  const { data, isPending, refetch } = useQuery({
    queryFn: () => DashboardFetcher.FindAggregate(),
    queryKey: ['dashboard'],
  });

  const categoryChartData = data
    ? DashboardTransformer.VCDashboardCategoryTransformer(data.data.category)
    : DashboardConstant.DEFAULT_DASHBOARD_CATEGORY_CHART;

  const priceRankingList: VDashboardRankTable[] = data
    ? data.data.ranking.map((item) => DashboardTransformer.VTDashboardRankTransformer(item))
    : [];

  const generalData = data
    ? DashboardTransformer.VDashboardGeneralDisplayTransformer(data.data.general)
    : DashboardConstant.DEFAULT_DASHBOARD_GENERAL_DISPLAY;

  const liveCount: string = data ? Utils.NumberWithCommas(data.data.liveCount) : CommonConstant.DEFAULT_EMPTY_STRING;
  const deadCount: string = data ? Utils.NumberWithCommas(data.data.deadCount) : CommonConstant.DEFAULT_EMPTY_STRING;

  return {
    categoryChartData,
    deadCount,
    generalData,
    liveCount,
    priceRankingList,
  };
}
