import { BaseModel } from '@/models/BaseModel';
import EmployeePromotion from './EmployeePromotion';
import Leave from '../../Leave/models/Leave';

export interface IEmployee {
  id?: string;
  salutation?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  image?: string;
  status?: string;
  employeeNo?: string;
  gender?: string;
  birthday?: string;
  joiningDate?: string;
  emergencyContact?: string;
  emergencyPhoneNo?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  department?: string;
  designation?: string;
  reportsTo?: string;
  grade?: string;
  branch?: string;
  leavePolicy?: string;
  holidayList?: string;
  salaryMode?: string;
  bankName?: string;
  bankAccount?: string;
  healthInsurance?: string;
  healthInsuranceProvider?: string;
  healthInsuranceNo?: string;
  cellPhone?: string;
  preferedEmail?: string;
  companyEmail?: string;
  personalEmail?: string;
  unsubscribed?: string;
  permanentAccommodation?: string;
  permanentAddress?: string;
  currentAccomodation?: string;
  currentAddress?: string;
  bio?: string;
  passportNumber?: string;
  dateOfIssue?: string;
  placeOfIssue?: string;
  maritalStatus?: string;
  bloodGroup?: string;
  familyBackground?: string;
  healthDetails?: string;
  educationalQualification?: string;
  previousWorkExperience?: string;
  externalWorkHistory?: string;
  historyInCompany?: string;
  relievingDate?: string;
  reasonForLeaving?: string;
  leaveEncashed?: string;
  encashDate?: string;
  resiged?: string;
  reasonForResignation?: string;
  feedback?: string;
}

export default class Employee extends BaseModel {
  static entity = 'employee';

  static meta = {
    section: 'core',
  };

  static fields() {
    return {
      id: this.increment(),
      salutation: this.string('salutation'),
      firstName: this.string('firstName'),
      middleName: this.string('middleName'),
      lastName: this.string('lastName'),
      image: this.string('image'),
      status: this.string('status'),
      employeeNo: this.string('employeeNo'),
      gender: this.string('gender'),
      birthday: this.string('2019-03-08'),
      joiningDate: this.string('2019-03-08'),
      emergencyContact: this.string('emergencyContact'),
      emergencyPhoneNo: this.string('emergencyPhoneNo'),
      contractStartDate: this.string('2019-03-08'),
      contractEndDate: this.string('2019-03-08'),
      department: this.string('department'),
      designation: this.string('designation'),
      reportsTo: this.string('reportsTo'),
      grade: this.string('grade'),
      branch: this.string('branch'),
      leavePolicy: this.string('leavePolicy'),
      holidayList: this.string('holidayList'),
      salaryMode: this.string('salaryMode'),
      bankName: this.string('bankName'),
      bankAccount: this.string('bankAccount'),
      healthInsurance: this.string('healthInsurance'),
      healthInsuranceProvider: this.string('healthInsuranceProvider'),
      healthInsuranceNo: this.string('healthInsuranceNo'),
      cellPhone: this.string('cellPhone'),
      preferedEmail: this.string('preferedEmail'),
      companyEmail: this.string('companyEmail'),
      personalEmail: this.string('personalEmail'),
      unsubscribed: this.string('unsubscribed'),
      permanentAccommodation: this.string('permanentAccommodation'),
      permanentAddress: this.string('permanentAddress'),
      currentAccomodation: this.string('currentAccomodation'),
      currentAddress: this.string('currentAddress'),
      bio: this.string('bio'),
      passportNumber: this.string('passportNumber'),
      dateOfIssue: this.string('2019-03-08'),
      placeOfIssue: this.string('placeOfIssue'),
      maritalStatus: this.string('maritalStatus'),
      bloodGroup: this.string('bloodGroup'),
      familyBackground: this.string('familyBackground'),
      healthDetails: this.string('healthDetails'),
      educationalQualification: this.string('educationalQualification'),
      previousWorkExperience: this.string('previousWorkExperience'),
      externalWorkHistory: this.string('externalWorkHistory'),
      historyInCompany: this.string('historyInCompany'),
      relievingDate: this.string('2019-03-08'),
      reasonForLeaving: this.string('reasonForLeaving'),
      leaveEncashed: this.string('leaveEncashed'),
      encashDate: this.string('2019-03-08'),
      resiged: this.string('resiged'),
      reasonForResignation: this.string('reasonForResignation'),
      feedback: this.string('feedback'),
      promotions: this.hasMany(EmployeePromotion, 'employee_id'),
      leaves: this.hasMany(Leave, 'employee_id'),
    };
  }
}
