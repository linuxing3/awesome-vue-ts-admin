import {
  map, countBy, find,
} from 'lodash';
import moment, { months, MomentInput, Moment } from 'moment';
import { View } from '@antv/data-set';

export const testMonthData = [
  {
    date: '2019-04-01',
    type: 'in',
  },
  {
    date: '2019-02-01',
    type: 'in',
  },
  {
    date: '2019-02-11',
    type: 'in',
  },
  {
    date: '2019-03-01',
    type: 'out',
  },
  {
    date: '2019-03-01',
    type: 'out',
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
 * @param normal 从日期对象到字符串，反之为从字符串到日期对象
 * @param typeKey 对象中标记日期类型的键
 * @param typeValue 对象中标记日期类型的值
 * @param uniKey 对象中唯一标识符
 */
export const convertDate = (itemList: any[], items: object[]|object, normal = true, format1 = 'l', format2 = 'YYYY/M/D', typeKey = 'type', typeValue = 'date', uniKey = 'key') => {
  // helper convert and reconvert functions
  const func = (v: MomentInput, f: string): string => moment(v).format(f);
  const refunc = (v: MomentInput, f: string): Moment => moment(v, f);
  const hfunc = (item: any, fields: any[], callback: Function, format = 'l') => {
    fields.map((f) => {
      item[f] = callback(item[f], format);
    });
  };
  const dateFields = map(itemList.filter(o => o[typeKey] === typeValue), uniKey);
  // if items is array
  if (Array.isArray(items)) {
    if (normal) {
      return map(items, (item) => {
        hfunc(item, dateFields, func, format1);
        return item;
      });
    }
    return map(items, (item) => {
      hfunc(item, dateFields, refunc, format2);
      return item;
    });
  }
  // if items is object
  if (normal) {
    hfunc(items, dateFields, func, format1);
    return [items];
  }
  hfunc(items, dateFields, refunc, format2);
  return [items];
};

''
export const dvCountAllByMonth = (state, data, options) => {
  const dv = new View({
    state,
  }).source(data);
  const { field, as, operate } = options;
  dv.transform({
    // 选取【日期】列
    type: 'pick',
    fields: [field],
  })
    .transform({
      // 日期转化为【月份】，另存一列
      type: 'map',
      callback(row) {
        row[as] = months(moment(row[field]).month());
        return row;
      },
    })
    .transform({
      // 统计月份【计数】
      type: 'aggregate',
      fields: [as],
      operations: operate,
      as: operate,
      groupBy: [as],
    });
  return dv;
};
