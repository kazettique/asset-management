import dayjs, { Dayjs } from 'dayjs';

export interface Props {
  className?: string;
  date: Dayjs | Date;
}

// ref: https://www.creative-tim.com/twcomponents/component/calendar-date
export default function BasicMiniCalendar(props: Props) {
  const { className = '', date } = props;

  const year = dayjs(date).format('YYYY');
  const month = dayjs(date).format('MMM');
  const day = dayjs(date).format('DD');
  const dayOfTheWeek = dayjs(date).format('ddd');

  return (
    <div
      className={`block rounded overflow-hidden bg-white text-center w-24 ${className}`}
      data-test-comp={BasicMiniCalendar.name}
    >
      <div className="bg-red-500 text-white py-1">{month}</div>
      <div className="pt-1 border-l border-r">
        <span className="text-4xl font-bold">{day}</span>
      </div>
      <div className="pb-2 px-2 border-l border-r border-b rounded-b flex justify-between">
        <span className="text-xs font-bold">{dayOfTheWeek}</span>
        <span className="text-xs font-bold">{year}</span>
      </div>
    </div>
  );
}
