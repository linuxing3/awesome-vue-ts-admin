import { BaseModel } from '@/models/BaseModel';
import UserMilitant from '../../UserMilitant/models/UserMilitant';
import UserAppraisal from '../../UserAppraisal/models/UserAppraisal';
import UserDesignation from '../../UserDesignation/models/UserDesignation';

export interface IMember {
  id?: string
  department?: string
  name: string
  gender?: string
  birthday?: string
  etnia?: string
  academicBackground?: string
  foreignLanguage?: string
  politicalRole?: string
  positionAndRank?: string
  militantRole?: string
  duty?: string
  fromEntity?: string
  arrivingDate?: string
  rotatingDate?: string
  sendingEntity?: string
  conyugeName?: string
  conyugeEntity?: string
  conyugeBonus?: string
  memo?: string
  protocolId?: string
  isActive?: string | boolean
  militant?: string
  appraisals?: string[] | any[]
  designations?: string[] | any[]
  projects?: string[] | any[]
}

export default class Member extends BaseModel {
  static entity = 'member'

  static meta = {
    section: 'core',
  }

  static fields() {
    return {
      id: this.increment(),
      department: this.string('Business'),
      name: this.string('Daniel'),
      gender: this.string('male'),
      birthday: this.string('2009-09-09'),
      etnia: this.string('han'),
      academicBackground: this.string('Master'),
      foreignLanguage: this.string('Spanish'),
      politicalRole: this.string('CPC'),
      positionAndRank: this.string('Directorial'),
      militantRole: this.string('Discipline comissioner'),
      duty: this.string('Political Consellor'),
      fromEntity: this.string('MFA'),
      arrivingDate: this.string('2016-04-09'),
      rotatingDate: this.string('2020-04-09'),
      sendingEntity: this.string('MFA'),
      conyugeName: this.string('Luna'),
      conyugeEntity: this.string('n/a'),
      conyugeBonus: this.string('n/a'),
      memo: this.string('n/a'),
      protocolId: this.string(''),
      isActive: this.string('n/a'),
      militant: this.hasOne(UserMilitant, 'user_id'),
      appraisals: this.hasMany(UserAppraisal, 'user_id'),
      designations: this.hasMany(UserDesignation, 'user_id'),
    };
  }
}
