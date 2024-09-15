'use client';

import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { useMemo, useState } from 'react';

import { Utils } from '@/utils';

import BasicIcon from './BasicIcon';

dayjs.extend(localeData);

interface CalendarUnit {
  date: Dayjs;
  display: string;
}

export interface Props {
  className?: string;
}

// ref: https://www.creative-tim.com/twcomponents/component/free-tailwind-css-calendar-component
// ref: https://webdesign.tutsplus.com/learn-how-to-code-a-simple-javascript-calendar-and-datepicker--cms-108322t
export default function BasicCalendar(props: Props) {
  const { className = '' } = props;

  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const displayYear = useMemo<string>(() => currentDate.format('YYYY'), [currentDate]);
  const displayMonth = useMemo<string>(() => currentDate.format('MMMM'), [currentDate]);

  const calendarData = useMemo<CalendarUnit[][]>(() => {
    const generateCalendarList = () => {
      let firstDateOfThisMonth: Dayjs = currentDate.startOf('month');

      let lastDateOfThisMonth: Dayjs = currentDate.endOf('month');

      // Get the last date of the previous month
      let lastDateOfLastMonth: Dayjs = currentDate.subtract(1, 'month').endOf('month');

      // Variable to store the generated calendar HTML
      let result: CalendarUnit[] = [];

      // Loop to add the dates of the current month
      for (let i = firstDateOfThisMonth.day(); i > 0; i--) {
        const _date = lastDateOfLastMonth.subtract(i - 1, 'day');

        result.push({
          date: _date,
          display: Utils.GetDateTimeString(_date, 'D'),
        });
      }

      // Loop to add the first dates of the next month
      for (let i = 1; i <= lastDateOfThisMonth.date(); i++) {
        const _date = lastDateOfLastMonth.add(i, 'day');
        result.push({
          date: _date,
          display: Utils.GetDateTimeString(_date, 'D'),
        });
      }

      // Loop to add the first dates of the next month
      for (let i = lastDateOfThisMonth.day(); i < 6; i++) {
        const _date = lastDateOfThisMonth.add(i + 1 - lastDateOfThisMonth.day(), 'day');
        result.push({
          date: _date,
          display: Utils.GetDateTimeString(_date, 'D'),
        });
      }

      return result;
    };

    return Utils.SplitArrayIntoChunks(generateCalendarList(), 7);
  }, [currentDate]);

  const checkIsThisMonth = (date: Dayjs): boolean => currentDate.isSame(date, 'month');
  const checkIsToday = (date: Dayjs): boolean => currentDate.isSame(date, 'date');

  const weekDaysList = useMemo(() => dayjs.weekdaysMin(), []);

  return (
    <div {...props} className={`${className}`} data-test-comp={BasicCalendar.name}>
      <div className="md:p-8 p-5 dark:bg-gray-800 rounded-t">
        <div className="px-4 flex items-center justify-between">
          <BasicIcon
            onClick={() => setCurrentDate((prev) => prev.subtract(1, 'month'))}
            iconType="caret-left-solid"
            className="text-xl focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100 cursor-pointer h-10 w-10 flex justify-center items-center rounded-full hover:bg-gray-50 transition-all duration-300"
          />

          <div className="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800">
            <span>{displayMonth}</span>
            <span>&nbsp;</span>
            <span>{displayYear}</span>
          </div>

          <BasicIcon
            onClick={() => setCurrentDate((prev) => prev.add(1, 'month'))}
            iconType="caret-right-solid"
            className="text-xl focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100 cursor-pointer h-10 w-10 flex justify-center items-center rounded-full hover:bg-gray-50 transition-all duration-300"
          />
        </div>

        <div className="flex items-center justify-between pt-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {weekDaysList.map((weekday, index) => (
                  <th key={index}>
                    <div className="w-full flex justify-center">
                      <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">{weekday}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {calendarData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((col, colIndex) => (
                    <td key={colIndex}>
                      <div className="h-full w-full flex justify-center items-center">
                        <button
                          data-is-this-month={checkIsThisMonth(col.date)}
                          data-is-today={checkIsToday(col.date)}
                          onClick={() => setCurrentDate(col.date)}
                          className="dark:text-gray-100 data-[is-this-month='true']:text-gray-600 data-[is-this-month='false']:text-gray-300 data-[is-today='true']:bg-slate-100 rounded-full flex justify-center items-center w-10 h-10"
                        >
                          {col.display}
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
