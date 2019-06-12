import { tableList, FilterFormList, operate } from '@/interface';
import { gender, department, educationalQualification } from '@/utils/constant';

/* -------------------------------------------------------------
| Item list for forms in m-form
|-------------------------------------------------------------*/
export const defaultItemList: FilterFormList[] = [
  {
    key: 'id',
    type: 'input',
    label: 'id',
    placeholder: 'Leave it untouched!',
  },
  {
    type: 'input', key: 'salutation', label: 'salutation', placeholder: 'salutation',
  },
  {
    type: 'input', key: 'firstName', label: 'firstName', placeholder: 'firstName',
  },
  {
    type: 'input', key: 'middleName', label: 'middleName', placeholder: 'middleName',
  },
  {
    type: 'input', key: 'lastName', label: 'lastName', placeholder: 'lastName',
  },
  {
    type: 'input', key: 'image', label: 'image', placeholder: 'image',
  },
  {
    type: 'input', key: 'status', label: 'status', placeholder: 'status',
  },
  {
    type: 'input', key: 'employeeNo', label: 'employeeNo', placeholder: 'employeeNo',
  },
  {
    type: 'select', key: 'gender', label: 'gender', placeholder: 'gender', options: [...gender],
  },
  {
    type: 'date', key: 'birthday', label: 'birthday', placeholder: 'birthday',
  },
  {
    type: 'date', key: 'joiningDate', label: 'joiningDate', placeholder: 'joiningDate',
  },
  {
    type: 'input', key: 'emergencyContact', label: 'emergencyContact', placeholder: 'emergencyContact',
  },
  {
    type: 'input', key: 'emergencyPhoneNo', label: 'emergencyPhoneNo', placeholder: 'emergencyPhoneNo',
  },
  {
    type: 'date', key: 'contractStartDate', label: 'contractStartDate', placeholder: 'contractStartDate',
  },
  {
    type: 'date', key: 'contractEndDate', label: 'contractEndDate', placeholder: 'contractEndDate',
  },
  {
    type: 'input', key: 'department', label: 'department', placeholder: 'department', options: [...department],
  },
  {
    type: 'input', key: 'designation', label: 'designation', placeholder: 'designation',
  },
  {
    type: 'input', key: 'reportsTo', label: 'reportsTo', placeholder: 'reportsTo',
  },
  {
    type: 'input', key: 'grade', label: 'grade', placeholder: 'grade',
  },
  {
    type: 'input', key: 'branch', label: 'branch', placeholder: 'branch',
  },
  {
    type: 'input', key: 'leavePolicy', label: 'leavePolicy', placeholder: 'leavePolicy',
  },
  {
    type: 'input', key: 'holidayList', label: 'holidayList', placeholder: 'holidayList',
  },
  {
    type: 'input', key: 'salaryMode', label: 'salaryMode', placeholder: 'salaryMode',
  },
  {
    type: 'input', key: 'bankName', label: 'bankName', placeholder: 'bankName',
  },
  {
    type: 'input', key: 'bankAccount', label: 'bankAccount', placeholder: 'bankAccount',
  },
  {
    type: 'input', key: 'healthInsurance', label: 'healthInsurance', placeholder: 'healthInsurance',
  },
  {
    type: 'input',
    key: 'healthInsuranceProvider',
    label: 'healthInsuranceProvider,',
    placeholder: 'healthInsuranceProvider',
  },
  {
    type: 'input', key: 'healthInsuranceNo', label: 'healthInsuranceNo', placeholder: 'healthInsuranceNo',
  },
  {
    type: 'input', key: 'cellPhone', label: 'cellPhone', placeholder: 'cellPhone',
  },
  {
    type: 'input', key: 'preferedEmail', label: 'preferedEmail', placeholder: 'preferedEmail',
  },
  {
    type: 'input', key: 'companyEmail', label: 'companyEmail', placeholder: 'companyEmail',
  },
  {
    type: 'input', key: 'personalEmail', label: 'personalEmail', placeholder: 'personalEmail',
  },
  {
    type: 'input', key: 'unsubscribed', label: 'unsubscribed', placeholder: 'unsubscribed',
  },
  {
    type: 'input',
    key: 'permanentAccommodation',
    label: 'permanentAccommodation,',
    placeholder: 'permanentAccommodation',
  },
  {
    type: 'input', key: 'permanentAddress', label: 'permanentAddress', placeholder: 'permanentAddress',
  },
  {
    type: 'input', key: 'currentAccomodation', label: 'currentAccomodation', placeholder: 'currentAccomodation',
  },
  {
    type: 'input', key: 'currentAddress', label: 'currentAddress', placeholder: 'currentAddress',
  },
  {
    type: 'input', key: 'bio', label: 'bio', placeholder: 'bio',
  },
  {
    type: 'input', key: 'passportNumber', label: 'passportNumber', placeholder: 'passportNumber',
  },
  {
    type: 'date', key: 'dateOfIssue', label: 'dateOfIssue', placeholder: 'dateOfIssue',
  },
  {
    type: 'input', key: 'placeOfIssue', label: 'placeOfIssue', placeholder: 'placeOfIssue',
  },
  {
    type: 'input', key: 'maritalStatus', label: 'maritalStatus', placeholder: 'maritalStatus',
  },
  {
    type: 'input', key: 'bloodGroup', label: 'bloodGroup', placeholder: 'bloodGroup',
  },
  {
    type: 'input', key: 'familyBackground', label: 'familyBackground', placeholder: 'familyBackground',
  },
  {
    type: 'input', key: 'healthDetails', label: 'healthDetails', placeholder: 'healthDetails',
  },
  {
    type: 'input',
    key: 'educationalQualification',
    label: 'educationalQualification,',
    placeholder: 'educationalQualification',
    options: [...educationalQualification],
  },
  {
    type: 'input',
    key: 'previousWorkExperience',
    label: 'previousWorkExperience,',
    placeholder: 'previousWorkExperience',
  },
  {
    type: 'input', key: 'externalWorkHistory', label: 'externalWorkHistory', placeholder: 'externalWorkHistory',
  },
  {
    type: 'input', key: 'historyInCompany', label: 'historyInCompany', placeholder: 'historyInCompany',
  },
  {
    type: 'date', key: 'relievingDate', label: 'relievingDate', placeholder: 'relievingDate',
  },
  {
    type: 'input', key: 'reasonForLeaving', label: 'reasonForLeaving', placeholder: 'reasonForLeaving',
  },
  {
    type: 'input', key: 'leaveEncashed', label: 'leaveEncashed', placeholder: 'leaveEncashed',
  },
  {
    type: 'date', key: 'encashDate', label: 'encashDate', placeholder: 'encashDate',
  },
  {
    type: 'input', key: 'resiged', label: 'resiged', placeholder: 'resiged',
  },
  {
    type: 'input',
    key: 'reasonForResignation',
    label: 'reasonForResignation',
    placeholder: 'reasonForResignation',
  },
  {
    type: 'input', key: 'feedback', label: 'feedback', placeholder: 'feedback',
  },
];

/* -------------------------------------------------------------
| Field list for tables in filter-table
|-------------------------------------------------------------*/
export const tableFieldsList: tableList[] = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
  },
  {
    title: 'Employee No',
    dataIndex: 'empoyeeNo',
  },
  {
    title: 'birthday',
    dataIndex: 'birthday',
  },
];

/* -------------------------------------------------------------
| Item list for filter forms in filter-table
|-------------------------------------------------------------*/
export const filterFormItemList: FilterFormList[] = [
  {
    key: 'id',
    type: 'input',
    label: 'id',
    placeholder: 'Leave it untouched!',
  },
  {
    type: 'input', key: 'firstName', label: 'firstName', placeholder: 'firstName',
  },
  {
    type: 'input', key: 'lastName', label: 'lastName', placeholder: 'lastName',
  },
  {
    type: 'input', key: 'status', label: 'status', placeholder: 'status',
  },
  {
    type: 'input', key: 'employeeNo', label: 'employeeNo', placeholder: 'employeeNo',
  },
  {
    type: 'select', key: 'gender', label: 'gender', placeholder: 'gender',
  },
  {
    type: 'date', key: 'birthday', label: 'birthday', placeholder: 'birthday',
  },
];

/* -------------------------------------------------------------
| Backend params to find path of http response
|-------------------------------------------------------------*/
export const BackParams: any = {
  code: 'data.result.resultCode',
  codeOK: 0,
  message: 'data.result.resultMessage',
  data: 'data.entity',
  columns: 'config.params.columns',
  total: 'config.params.pageParams.total',
};

/* -------------------------------------------------------------
| Buttons for operations in filter-table
|-------------------------------------------------------------*/
export const operateBtn: operate[] = [
  {
    key: 'edit',
    rowKey: 'id',
    color: 'blue',
    text: '编辑',
    roles: true,
  },
  {
    key: 'delete',
    rowKey: 'id',
    color: 'red',
    text: '删除',
    roles: true,
    msg: '确定删除？',
  },
  {
    key: 'export',
    rowKey: 'id',
    color: 'orange',
    text: '导出',
    roles: true,
    msg: '确定导出？',
  },
];
