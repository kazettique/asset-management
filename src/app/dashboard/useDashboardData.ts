import { useQuery } from '@tanstack/react-query';

import { DashboardFetcher } from '@/fetcher';
import { DashboardTransformer } from '@/transformer';
import { VDashboardRankTable } from '@/types';

export default function useDashboardData() {
  const { data, isPending, refetch } = useQuery({
    queryFn: () => DashboardFetcher.FindAggregate(),
    queryKey: ['dashboard'],
  });

  const pieChartData = data
    ? data.data.category.map((item) => ({
        id: item.categoryId || '',
        label: item.categoryId || '',
        value: item.count.categoryId || '',
      }))
    : [];

  const priceRankingList: VDashboardRankTable[] = data
    ? data.data.ranking.map((item) => DashboardTransformer.VTDashboardRankTransformer(item))
    : [];

  return {
    pieChartData,
    priceRankingList,
  };
}
