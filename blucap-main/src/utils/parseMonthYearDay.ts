import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

type Maybe<T> = T | undefined | null;

export const parseMonthYearDay = (
  date: Maybe<{
    month: Maybe<number>;
    year: Maybe<number>;
  }>,
): Dayjs => {
  if (!date?.month || !date?.year) return dayjs();

  return dayjs(`${date.month}/${date.year}`, [
    'MM/YYYY',
    'M/YYYY',
    'MM/YY',
    'M/YY',
  ]);
};
export function diffInYearMonth(
  dateA: Dayjs,
  dateB: Dayjs,
): { years: number; months: number };

export function diffInYearMonth(
  dateA: Dayjs,
  dateB: Dayjs,
  format: (year: number, month: number) => string,
): string;

export function diffInYearMonth(
  dateA: Dayjs,
  dateB: Dayjs,
  format?: (year: number, month: number) => string,
): { years: number; months: number } | string {
  const years = dateA.diff(dateB, 'y');
  const months = dateA.diff(dateB, 'm') % 12;
  if (format) return format(years, months);
  return { years, months };
}
