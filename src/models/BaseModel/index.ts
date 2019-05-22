import {
  Model,
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

export class BaseModel extends Model {
  static primaryKey = 'id';

  static meta = {
    section: 'dev',
  };

  static fieldsKeys(): string[] {
    return keys(this.fields());
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

  /**
   * Find unique value of a field
   * As the max, min, sum in Query
   * @param fieldName string
   */
  $uniqueValuesOfField(fieldName: string): any[] {
    const records: any[] = this.$query().get();
    return uniq(map(records, fieldName));
  }
}
