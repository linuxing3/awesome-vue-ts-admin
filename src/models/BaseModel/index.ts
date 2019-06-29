import {
  Model,
  Query,
  Attr,
  String,
  Number,
  Boolean,
  BelongsTo,
  BelongsToMany,
  Increment,
  HasOne,
  HasMany,
  MorphOne,
  MorphTo,
  MorphMany,
  HasManyBy,
  MorphToMany,
  MorphedByMany,
  HasManyThrough,
  Attribute,
} from '@vuex-orm/core';
import {
  keys, pullAll, uniq, map,
} from 'lodash';
import { checkStringMatch } from '@/utils/helper';
import {
  countAllByMonth,
} from '@/utils/datetime';
import { PageParams, PageConfig, StatisticInfo } from '@/interface';
import { ILocalForageModel } from 'vuex-orm-localforage';

export class BaseModel extends Model implements ILocalForageModel {
  static primaryKey = 'id';

  static meta = {
    section: 'dev',
  };

  static fieldsKeys(): string[] {
    return keys(this.fields());
  }

  static ids(): any[] {
    return map(this.fields(), 'id');
  }

  /**
   * 获取所有的关系型字段
   * @returns {Array<string>} all relations of the model
   */
  static relationFields(): string[] {
    return this.fieldsKeys().reduce((list: string[], field: string) => {
      const fieldAttribute: Attribute = this.fields()[field];
      if (this.isFieldRelation(fieldAttribute)) {
        list.push(`${field}_id`);
        list.push(field);
      }
      return list;
    }, []);
  }

  /**
   * 非关系型字段，同isFieldAttribute
   * @returns {Array<string>} fields which value are not BelongsTo
   */
  static nonRelationFields(): string[] {
    return pullAll(this.fieldsKeys(), this.relationFields());
  }

  /**
   * 关系型数据键值中包括_id的
   */
  static relationFieldsWithId(): string[] {
    return this.relationFields().filter(r => r.match(/.*_id/));
  }

  // 关系型数据键值中不包括_id的
  static nonRelationFieldsNoId(): string[] {
    return this.relationFields().filter(r => !r.match(/.*_id/));
  }

  static count(): number {
    return this.query().count();
  }

  /**
   * 获取分页配置
   * @param {any} pageParams page params should be equal to front
   * @returns {PageConfig}
   */
  static pageConfig(pageParams: PageParams): PageConfig {
    const total = this.query().count();
    const page = pageParams.page;
    const pageNum = (pageParams.pageNum && parseInt(pageParams.pageNum)) || 1;
    const pageSize = (pageParams.pageSize && parseInt(pageParams.pageSize)) || 10;
    const totalPage = Math.ceil(total / pageSize) || 0;
    // offset and next
    const offset = (pageNum - 1) * pageSize || 0;
    const next = (pageNum >= totalPage ? total % pageSize : pageSize) + 1;
    return {
      page,
      total,
      pageNum,
      pageSize,
      totalPage,
      offset,
      next,
    };
  }

  /**
   * 在链式查询中加入页面设置，并返回结果
   * @param paginationConfig 页面设置
   * @param query 链式查询
   */
  static pageQuery(paginationConfig: any, query?: Query): Query {
    if (!query) query = this.query();
    return query
      .offset(paginationConfig.offset)
      .limit(paginationConfig.pageSize);
  }

  /**
   * 在链式查询中加入页面设置，并返回结果
   * 使用lodash.values()获取值构成数组
   * @param query 链式查询
   */
  static countByMonth(fieldName: string, withName: boolean, format: string = 'YYYY-MM-DD'): {[name: string]: number } {
    return countAllByMonth(this.all(), fieldName, withName);
  }

  /**
   * 在链式查询中加入过滤器，并返回结果
   * @param filter filter in format { name: 'xx', age: ''}, or 'xx'
   */
  static searchQuery(filter = {}, query?: Query): Query {
    if (!query) query = this.query();
    console.log('type of filter: ', typeof filter);
    if (typeof filter === 'object') {
      console.log('searchQuery with object: ', filter);
      return Object.keys(filter).reduce((query, key) => query.where((record) => {
        // lazy search
        const filterValue = typeof filter[key] === 'string' ? filter[key] : '';
        const matchResult = checkStringMatch(record[key])(filterValue);
        // console.log(`filter key ${key} matched: `, matchResult);
        return matchResult;
        // exact match search
        // (filter[key] === undefined || '') ? true : record[key] === filter[key]
        // with query builder
        // (filter[key] === undefined || '') ? true : query.where(key, filter[key])
      }), query);
    } if (typeof filter === 'string') {
      console.log('searchQuery with string: ', filter);
      return this.fieldsKeys().reduce((query, key) => query.where((record) => {
        checkStringMatch(record[key])(filter);
      }), query);
    }
    return query;
  }

  /**
   * 使用lodash获取某模型中某一字段的全部值组成的数组
   * @param Model 模型
   * @param fieldDef 字段名
   * @returns 某一字段的全部值组成的数组
   */
  static uniqueValuesOfField(fieldName: string): string[] {
    const records: any[] = this.query().get();
    return uniq(map(records, fieldName));
    // return uniq(keys(mapKeys(records, record => record[fieldName])))
  }

  /**
   * 从每个字段值中的唯一值，获取数量
   * 获取最大值，最小值，总和
   * @param fieldName string
   * @returns 某一字段的全部值的计数
   */
  static aggregateValuesOfField(fieldName: string): StatisticInfo {
    const uniqueValues = this.uniqueValuesOfField(fieldName);
    const max = this.query().max(fieldName);
    const min = this.query().min(fieldName);
    const sum = this.query().sum(fieldName);
    const statisticInfo: StatisticInfo = {
      field: fieldName,
      max,
      min,
      sum,
      statistic: {},
    };
    return uniqueValues.reduce((statistic, value) => {
      const count = this.query().where(fieldName, value).count();
      statistic.statistic[value] = count;
      return statistic;
    }, statisticInfo);
  }

  /**
   * 生成全部统计数据
   */
  static aggregateValuesOfAllFields(): { [ name: string ]: StatisticInfo} {
    return this.fieldsKeys().reduce((statistic, field) => {
      statistic[field] = this.aggregateValuesOfField(field);
      return statistic;
    }, {});
  }

  /**
   * 判断某一字段是否为数字型
   *
   * @param {Attribute | undefined} field
   * @returns {boolean}
   */
  static isFieldNumber(field: Attribute): boolean {
    if (!field) return false;
    return field instanceof Number || field instanceof Increment;
  }

  /**
   * 判断某一字段是否为属性型(即不属于关系型)
   * @param {Attribute} field
   * @returns {boolean}
   */
  static isFieldAttribute(field: Attribute): boolean {
    return (
      field instanceof Increment
      || field instanceof Attr
      || field instanceof String
      || field instanceof Number
      || field instanceof Boolean
    );
  }

  /**
   * 判断某一字段是否为关系
   * @param {Attribute} field
   * @returns {boolean}
   */
  static isFieldRelation(field: Attribute): boolean {
    return (
      field instanceof HasOne
      || field instanceof HasMany
      || field instanceof HasManyBy
      || field instanceof HasManyThrough
      || field instanceof BelongsTo
      || field instanceof BelongsToMany
      || field instanceof MorphTo
      || field instanceof MorphOne
      || field instanceof MorphMany
      || field instanceof MorphToMany
      || field instanceof MorphedByMany
    );
  }
}
