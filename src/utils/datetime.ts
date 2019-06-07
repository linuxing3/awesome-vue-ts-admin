import {
  map, countBy, find,
} from 'lodash';
import moment, { months, MomentInput, Moment } from 'moment';
import { View } from '@antv/data-set';

export interface DVHelper {
  labels: Array<string>
  data: Array<number>
  source: any
  check: any
}

export interface DVHelperOptions {
  field: string
  as: string
  operate: string
}

export const initMonthLabel = months();

export const initMonthData = months().reduce((list, month) => {
  list.push({
    month,
    count: 0,
  });
  return list;
}, []);

export const initYearData = [
  {
    year: 2017,
    count: 0,
  },
  {
    year: 2018,
    count: 0,
  },
  {
    year: 2019,
    count: 0,
  },
  {
    year: 2020,
    count: 0,
  },
];

const mockData = [
  {
    date: '2019-04-01',
    type: 'in',
  },
  {
    date: '2019-02-01',
    type: 'in',
  },
  {
    date: '2018-02-11',
    type: 'in',
  },
  {
    date: '2017-03-01',
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
 * case 1.
 * dateToMonthIndex = [ 0, 1, 1, 2 ]
 * countByMonth = { 3: 1, 1: 2, 2: 2 }
 * case 2.
 * dateToMonthName = [ "February", "April", ... ]
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

export const monthlyTransformer = (sourceDv, checkDv, options) => {
  const { field, as, operate } = options;
  checkDv
    .transform({
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
    })
    .transform({
      type: 'pick',
      fields: [as, operate],
    });
  // 检查合并
  sourceDv.transform({
    type: 'map',
    callback(row) {
      const query = { [as]: row[as] };
      const matched = find(checkDv.rows, query);
      return matched !== undefined ? matched : row;
    },
  });
  return {
    source: sourceDv,
    check: checkDv,
  };
};

export const yearlyTransformer = (sourceDv, checkDv, options) => {
  const { field, as, operate } = options;
  checkDv
    .transform({
      // 选取【日期】列
      type: 'pick',
      fields: [field],
    })
    .transform({
      // 日期转化为【月份】，另存一列
      type: 'map',
      callback(row) {
        row[as] = moment(row[field]).year();
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
    })
    .transform({
      type: 'pick',
      fields: [as, operate],
    });
  // 检查合并
  sourceDv.transform({
    type: 'map',
    callback(row) {
      const query = { [as]: row[as] };
      const matched = find(checkDv.rows, query);
      return matched !== undefined ? matched : row;
    },
  });
  return {
    source: sourceDv,
    check: checkDv,
  };
};

/**
 * 获取数据集中某一【日期】列，转化为月，并按月计数
 * @param {any} state dv reactive state
 * @param {array} data array of object
 * @param {object} options field, as, operate, etc
 *
 * @example
 * @returns {object} which rows has the transformed data
 * [ { month: 'April', count: 1 },
 *   { month: 'February', count: 2 },
 *   { month: 'March', count: 2 } ]
 */
export const countByCategory = (checkData, options: DVHelperOptions, labels = initMonthLabel, initData = initMonthData, transformer = monthlyTransformer): DVHelper => {
  const sourceDv = new View().source(initData);
  const checkDv = new View().source(checkData);
  const { source, check } = transformer(sourceDv, checkDv, options);
  // 只输出按月统计数
  const data = source.rows.reduce((l, i) => {
    l.push(i.count);
    return l;
  }, []);

  return {
    labels,
    data,
    source,
    check,
  };
};

const monthlyData = countByCategory(
  mockData,
  {
    field: 'date',
    as: 'month',
    operate: 'count',
  },
);

const yearlyData = countByCategory(
  mockData,
  {
    field: 'date',
    as: 'year',
    operate: 'count',
  },
  ['2018', '2019', '2020'],
  initYearData,
  yearlyTransformer,
);
