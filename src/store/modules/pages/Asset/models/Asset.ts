import { BaseModel } from '@/models/BaseModel';

export interface IAsset {
  id?: string;
  assetName: string;
  itemCode?: string;
  itemName?: string;
  assetCategory?: string;
  assetOwner?: string;
  assetOwnerCompany?: string;
  image?: string;
  location?: string;
  custodian?: string;
}

export default class Asset extends BaseModel {
  static entity = 'asset';

  static meta = {
    section: 'core',
  };

  static fields() {
    return {
      id: this.increment(),
      assetName: this.string('asset'),
      itemCode: this.string('itemCode'),
      itemName: this.string('itemName'),
      assetCategory: this.string('assetCategory'),
      assetOwner: this.string('assetOwner'),
      assetOwnerCompany: this.string('assetOwnerCompany'),
      image: this.string('image'),
      brand: this.string('brand'),
      model: this.string('model'),
      price: this.string('price'),
      producedDate: this.string('2019-03-08'),
      purchasedDate: this.string('2019-03-08'),
      descriptions: this.string('descriptions'),
      barCode: this.string('barCode'),
      supplier: this.string('supplier'),
      location: this.string('location'),
      custodian: this.string('custodian'),
    };
  }
}
