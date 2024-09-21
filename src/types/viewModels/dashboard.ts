import { ChartDatum } from '../common';
import { MDashboardAggregate, MDashboardCategory, MDashboardGeneral, MDashboardRank } from '../models';

export interface VDashboardAggregate extends MDashboardAggregate {}

export interface VDashboardRank extends MDashboardRank {}

export interface VDashboardCategory extends MDashboardCategory {}

export interface VDashboardGeneral extends MDashboardGeneral {}

export interface VDashboardRankTable {
  categoryName: string;
  name: string;
  startDate: string;
  startPrice: string;
}

export interface VDashboardCategoryChart {
  avgEndPrice: ChartDatum[];
  avgStartPrice: ChartDatum[];
  count: ChartDatum[];
  maxEndPrice: ChartDatum[];
  maxStartPrice: ChartDatum[];
  sumEndPrice: ChartDatum[];
  sumStartPrice: ChartDatum[];
}

export interface VDashboardGeneralDisplay {
  avg: { endPrice: string; startPrice: string };
  max: { endPrice: string; startPrice: string };
  sum: { endPrice: string; startPrice: string };
}
