import { Injectable } from '@angular/core';

const ELEMENT_DATA: any[] = [
  {
    obsControlId: 'OC-98765',
    obsControlName: 'Healthcare service - Meta',
    obsControlDescription:
      'Healthcare Service UHG Schema A - Created for Masking Prod Data',
    createdBy: ' Miller Smith',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'MSKADM',
    },
  },
  {
    obsControlId: 'OC-98766',
    obsControlName: 'Healthcare service - Meta',
    obsControlDescription:
      'Healthcare Service UHG Schema A - Created for Masking Prod Data',
    createdBy: ' Miller Smith',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA_Advisory',
      password: 'riahealthcare123',
      schemaName: 'MSKADM',
    },
  },
  {
    obsControlId: 'OC-98766',
    obsControlName: 'Healthcare service - Meta',
    obsControlDescription:
      'Healthcare Service UHG Schema A - Created for Masking Prod Data',
    createdBy: ' Miller Smith',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'MSKADM',
    },
  },
  {
    obsControlId: 'OC-98766',
    obsControlName: 'Healthcare service - Meta',
    obsControlDescription:
      'Healthcare Service UHG Schema A - Created for Masking Prod Data',
    createdBy: ' Miller Smith',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'MSKADM',
    },
  },
  {
    obsControlId: 'OC-98766',
    obsControlName: 'Healthcare service - Meta',
    obsControlDescription:
      'Healthcare Service UHG Schema A - Created for Masking Prod Data',
    createdBy: ' Miller Smith',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'MSKADM',
    },
  },
  {
    obsControlId: 'OC-98766',
    obsControlName: 'Healthcare service - Meta',
    obsControlDescription:
      'Healthcare Service UHG Schema A - Created for Masking Prod Data',
    createdBy: ' Miller Smith',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'MSKADM',
    },
  },
  {
    obsControlId: 'OC-98766',
    obsControlName: 'Healthcare service - Meta',
    obsControlDescription:
      'Healthcare Service UHG Schema A - Created for Masking Prod Data',
    createdBy: ' Miller Smith',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'MSKADM',
    },
  },
  {
    obsControlId: 'OC-98766',
    obsControlName: 'Healthcare service - Meta',
    obsControlDescription:
      'Healthcare Service UHG Schema A - Created for Masking Prod Data',
    createdBy: ' Miller Smith',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'MSKADM',
    },
  },
  {
    obsControlId: 'OC-98766',
    obsControlName: 'Healthcare service - Meta',
    obsControlDescription:
      'Healthcare Service UHG Schema A - Created for Masking Prod Data',
    createdBy: ' Miller Smith',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'MSKADM',
    },
  },
];
const ELEMENT_DATA_2: any[] = [
  {
    selectColumn: 'Name',
    obsfucationStrategy:
      'Healthcare Service UHG Schema A - Created for Masking Prod Data',
    obsfucationRules: ' Miller Smith',
  },
  {
    selectColumn: 'SSN_NUMBER',
    obsfucationStrategy:
      'Healthcare Service UHG Schema A - Created for Masking Prod Data',
    obsfucationRules: ' Miller Smith',
  },
  {
    selectColumn: 'Email Address',
    obsfucationStrategy:
      'Healthcare Service UHG Schema A - Created for Masking Prod Data',
    obsfucationRules: ' Miller Smith',
  },
  {
    selectColumn: 'Date of Birth',
    obsfucationStrategy:
      'Healthcare Service UHG Schema A - Created for Masking Prod Data',
    obsfucationRules: ' Miller Smith',
  },
  {
    selectColumn: 'Address',
    obsfucationStrategy:
      'Healthcare Service UHG Schema A - Created for Masking Prod Data',
    obsfucationRules: ' Miller Smith',
  },
  {
    selectColumn: 'Credit Card Number',
    obsfucationStrategy:
      'Healthcare Service UHG Schema A - Created for Masking Prod Data',
    obsfucationRules: ' Miller Smith',
  },
  {
    selectColumn: 'Account Number',
    obsfucationStrategy:
      'Healthcare Service UHG Schema A - Created for Masking Prod Data',
    obsfucationRules: ' Miller Smith',
  },
];

@Injectable({
  providedIn: 'root',
})
export class ObsfucationService {
  private obsfucationData: any[] = ELEMENT_DATA;
  private obsfucationStrategies: any[] = ELEMENT_DATA_2;

  constructor() {}
  getAllObsfucations() {
    return this.obsfucationData;
  }
  getAllObsfucationStrategies() {
    return this.obsfucationStrategies;
  }
}
