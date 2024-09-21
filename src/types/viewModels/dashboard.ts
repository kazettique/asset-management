import { MDashboardAggregate, MDashboardRank } from '../models';

export interface VDashboardAggregate extends MDashboardAggregate {}

export interface VDashboardRank extends MDashboardRank {}

export interface VDashboardRankTable {
  categoryName: string;
  name: string;
  startDate: string;
  startPrice: string;
}
