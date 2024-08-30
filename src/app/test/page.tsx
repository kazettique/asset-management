'use client';

import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Utils } from '@/utils';

dayjs.extend(relativeTime);
dayjs.extend(duration);

export default function Page() {
  // function DetailedRelativeTime(startDate: Dayjs, endDate: Dayjs): string {
  //   const duration = dayjs.duration(endDate.diff(startDate));

  //   const durationInYears = duration.years();
  //   const durationInMonths = duration.months();
  //   const durationInDays = duration.days();

  //   console.log('durationInYears', durationInYears);
  //   console.log('durationInMonths', durationInMonths);
  //   console.log('durationInDays', durationInDays);

  //   return duration.humanize();
  // }

  const startDate: Dayjs = dayjs('2024-01-01');
  const endDate: Dayjs = dayjs('2024-02-01');

  const output = Utils.DetailedRelativeTime(startDate, endDate);

  return (
    <>
      <h1>Hello, Test Page!</h1>
      <div>{output}</div>
    </>
  );
}
