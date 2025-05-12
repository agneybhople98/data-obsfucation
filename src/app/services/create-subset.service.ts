import { Injectable } from '@angular/core';

export interface SubsetElement {
  tableName: string;
  columnName: any;
  subsetStrategiesColumn: string;
  subsetRules: string;
}
const ELEMENT_DATA: SubsetElement[] = [
  {
    tableName: 'CI_PER',
    columnName: ['PER_ID', 'DATE'],
    subsetStrategiesColumn:
      'Obfuscate utility accounts for non-production environments.',
    subsetRules: '',
  },
];

@Injectable({
  providedIn: 'root',
})
export class CreateSubsetService {
  private subsetData: any[] = ELEMENT_DATA;
  constructor() {}

  getAllSubsetData() {
    return this.subsetData;
  }
}
