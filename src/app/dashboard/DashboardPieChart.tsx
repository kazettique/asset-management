import { ResponsivePie } from '@nivo/pie';

import { ChartDatum } from '@/types';

export interface Props {
  className?: string;
  data: ChartDatum[];
  title: string;
}

export default function DashboardPieChart(props: Props) {
  const { className = '', title, data } = props;

  return (
    <div className={`flex flex-col ${className}`} data-test-comp={DashboardPieChart.name}>
      <div className="p-4 grow">
        <ResponsivePie data={data} innerRadius={0.6} padAngle={0.5} cornerRadius={5} />
      </div>
      <div className="dark:text-white font-semibold shrink-0 capitalize text-center text-xs">{title}</div>
    </div>
  );
}
