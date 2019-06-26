declare module '@antv/data-set' {
  const EventEmitter: any;

  function cloneOptions(options: any): {};

  interface DataSetState {
    state: any
  }

  class DataSet extends EventEmitter {
    // constructor(initialProps?: DataSetState);
    _getUniqueViewName(): any;

    createView(name: any, options?: {}): View;

    getView(name: any): View;

    setView(name: any, view: View): void;

    setState(name: any, value: any): void;
  }

  class View extends EventEmitter {
    // constructor(dataSet?: any, options?: any);
    /**
     * 数据列
     */
    rows: any[]

    /**
     * 包含原始数据列
     */
    origin: any[]

    /**
     * 数据集工具
     */
    dataSet: DataSet

    loose: boolean

    dataType: string

    isView: boolean

    isDataView: boolean

    transforms: any[]

    watchingStates: any

    _parseStateExpression(expr: any): any;

    _preparseOptions(options?: any): {};

    _prepareSource(source?: any, options?: any): this;

    /**
     * 获取视图的数据源
     * @param source 视图源
     * @param options 选项
     */
    source(source: any, options?: any): this;

    /**
     * 将一个视图专为新视图
     * @param options 转换选项
     */
    transform(options?: {}): this;

    _executeTransform(options: any): void;

    _reExecuteTransforms(): void;

    /**
     * 添加新的一行
     * @param row 新行
     */
    addRow(row: any): void;

    /**
     * 删除一行
     * @param index 索引
     */
    removeRow(index: any): void;

    /**
     * 更新一行
     * @param index 索引
     * @param newRow 新数据
     */
    updateRow(index: any, newRow: any): void;

    /**
     * 查找
     * @param query 查找
     */
    findRows(query: any): any;

    findRow(query: any): any;

    getColumnNames(): any;

    getColumnName(index: any): any;

    getColumnIndex(columnName: any): any;

    getColumn(columnName: any): any;

    getColumnData(columnName: any): any;

    getSubset(startRowIndex: any, endRowIndex: any, columnNames: any): any[];

    toString(prettyPrint: any): string;

    _reExecute(): void;
  }

  type DVTransformer = typeof transformer

  /**
   * 根据原视图和对比视图，生成可以展示的数据格式
   * @param {View} sourceDv  源视图
   * @param {View} checkDv 对比视图
   * @param {any} options 选项
   * @returns {Object} DVHelper 返回数据对象
   */
  function transformer(
    sourceDv: View,
    checkDv: View,
    options: any,
  ): DVHelper;

  interface DVHelper {
    source?: View;
    check?: View;
    labels?: Array<string>;
    data?: Array<number>;
    series?: Array<number>;
    namedSeries?: any;
  }

  interface DVHelperOptions {
    field: string | string[];
    operate: string;
    x: string;
    y: any;
  }

}
