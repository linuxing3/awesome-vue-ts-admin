import { BaseModel } from '@/models/BaseModel';

export interface IUserMilitant {
  id?: string;
  name?: string;
  admistionDate?: string;
  formalizationDate?: string;
  registerDate?: string;
  transferDate?: string;
}

export default class UserMilitant extends BaseModel {
  static entity = 'userMilitant';

  static meta = {
    section: 'core',
  };

  static fields() {
    return {
      id: this.increment(),
      name: this.string('Daniel'),
      gender: this.string('male'),
      etnia: this.string('han'),
      idNumber: this.string('888888'),
      birthday: this.string('2009-09-09'),
      academicBackground: this.string('Master'),
      hrCategory: this.string('public official'),
      department: this.string('Business'),
      workPosition: this.string('Business'),
      positionAndRank: this.string('Director'),
      militantComission: this.string('CN'),
      militantRole: this.string('Secretary'),
      militantAdmissionDate: this.string('2009-09-09'),
      militantFormalizationDate: this.string('2009-09-09'),
      militanceStatus: this.string('normal'),
      telephone: this.string('1111111'),
      homeAddress: this.string('home'),
      looseContact: this.boolean(false),
      floating: this.boolean(false),
      registerDate: this.string('2009-09-09'),
      transferDate: this.string('2009-09-09'),
      user_id: this.attr(null),
    };
  }
}
