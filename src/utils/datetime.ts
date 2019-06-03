import {
  map, countBy, find,
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

/**
 * 整理数据
 * 如果items是对象，包裹为数组
 * 如果items是数组，不用包裹
 * 如果对象中存在日期类字段，转化为人类阅读格式
 * @param itemList 列属性定义
 * @param items 待处理数据对象或数据对象数组
 * @param typeKey 对象中标记日期类型的键
 * @param typeValue 对象中标记日期类型的值
 * @param uniKey 对象中唯一标识符
 */
export const convertDate = (itemList, items, format = 'l', typeKey = 'type', typeValue = 'date', uniKey = 'key') => {
  const dateFields = map(itemList.filter(o => o[typeKey] === typeValue), uniKey);
  if (Array.isArray(items)) {
    return map(items, (item) => {
      dateFields.map((field) => {
        item[field] = moment(item[field]).format(format);
      });
      return item;
    });
  }
  dateFields.map((field) => {
    items[field] = moment(items[field]).format(format);
  });
  return [items];
};
