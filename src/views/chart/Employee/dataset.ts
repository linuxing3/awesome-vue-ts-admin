import { countByCategory, DVHelper } from '@/utils/datetime';

/* -------------------------------------------------------------
| Query from Model
|-------------------------------------------------------------*/
import models from '@/models';
const Entity: any = models.employee;

// Query from localforage
let employees: any[] = [];
Entity.$fetch().then(() => {
  employees = Entity.all();
  console.log('Entity Data:', employees);
});

/* -------------------------------------------------------------
| Transform with @antv/data-set tools
|-------------------------------------------------------------*/
const employeeSerie: DVHelper = countByCategory(employees, {
  field: 'birthday',
  as: 'month',
  operate: 'count',
});

console.log('Chart Data:', employeeSerie);

export const employeeBasicAreaOptions = {
  chart: {
    height: 380,
    type: 'area',
    zoom: {
      enabled: !1,
    },
  },
  dataLabels: {
    enabled: !1,
  },
  stroke: {
    width: 3,
    curve: 'straight',
  },
  colors: ['#fa5c7c'],
  series: [{
    name: '入职月份',
    data: employeeSerie.data,
  }],
  title: {
    text: '雇员入职时间图表',
    align: 'left',
  },
  subtitle: {
    text: '按月统计',
    align: 'left',
  },
  labels: employeeSerie.labels,
  xaxis: {
    type: 'string',
  },
  yaxis: {
    opposite: !0,
  },
  legend: {
    horizontalAlign: 'left',
  },
  grid: {
    row: {
      colors: ['#f1f3fa', 'transparent'],
    },
    borderColor: '#f1f3fa',
  },
  responsive: [{
    breakpoint: 600,
    options: {
      chart: {
        toolbar: {
          show: !1,
        },
      },
      legend: {
        show: !1,
      },
    },
  }],
};
