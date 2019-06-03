import {
  map, countBy,
} from 'lodash';
import moment, { months } from 'moment';

export const testMonthData = [
  {
    date: '2019-04-01',
    in: 'in',
  },
  {
    date: '2019-02-01',
    in: 'in',
  },
  {
    date: '2019-02-11',
    in: 'in',
  },
  {
    date: '2019-03-01',
    in: 'out',
  },
  {
    date: '2019-03-01',
    in: 'out',
  },
];

/**
 * 将日期转化为月份文字
 * @param monthData data with date key
 * @param key key with date data
 * @param format date format to use
 */
export const dateToMonthName = (
  monthData: any[],
  key: string,
  format: string = 'YYYY-MM-DD',
) => map(map(monthData, key), (o: string) => months(moment(o, format).month()));

/**
 * 将日期转化为月份索引
 * @param monthData data with date key
 * @param key key with date data
 * @param format date format to use
 */
export const dateToMonthIndex = (
  monthData: any[],
  key: string,
  format: string = 'YYYY-MM-DD',
) => map(map(monthData, key), (o: string) => moment(o, format).month());


/**
 * 将缺失的月份数据用基本数据填充
 * @param monthData month data
 * @param defaultNumber default number to fill empty position
 */
export const fillAllMonth = (monthData: { [x: string]: any; }, defaultNumber: number) => map(months(), m => (monthData[m] ? monthData[m] : defaultNumber));

/**
 * 按日期的月份统计数量
 * @param {array} data data to process
 * @param {string} fieldName field to pick
 * @param {string} withName use month name over index
 * @example
 * monthData = [
 *   {
 *     date: '2019-01-01'
 *   },
 *   {
 *     date: '2019-02-01'
 *   },
 *   {
 *     date: '2019-02-11'
 *   },
 *   {
 *     date: '2019-03-01'
 *   }
 * ]
 * dateToMonthIndex = [ 0, 1, 1, 2 ]
 * dateToMonthName = [ "February", "April", ... ]
 * countByMonth = { 3: 1, 1: 2, 2: 2 }
 * countByMonth = { April: 1, February: 2, March: 2 }
 */
export const countAllByMonth = (data: any[], fieldName: string, withName: boolean) => {
  let dateToMonth = null;
  if (withName) {
    dateToMonth = dateToMonthName(data, fieldName);
  } else {
    dateToMonth = dateToMonthIndex(data, fieldName);
  }
  return countBy(dateToMonth, v => v);
};
