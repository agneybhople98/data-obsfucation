import { Injectable } from '@angular/core';

const ELEMENT_DATA: any[] = [
  {
    obsControlId: 'OC-98765',
    obsControlName: 'Healthcare service - Meta',
    obsControlDescription:
      'Healthcare Service UHG Schema A - Created for Masking Prod Data',
    createdBy: 'Miller Smith',
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
    obsControlId: 'OC-32455',
    obsControlName: 'Insurance Claims - Master',
    obsControlDescription:
      'Healthcare Service UHG Schema B - Created for Masking Prod Data',
    createdBy: 'Smith Wilson',
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
    obsControlId: 'OC-23455',
    obsControlName: 'Healthcare Provider - ARCHDEV',
    obsControlDescription:
      'Healthcare Service UHG Schema C - Created for Masking Prod Data',
    createdBy: 'Jonny Johnson',
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
    obsControlId: 'OC-23445',
    obsControlName: 'RadiologyImages_Metadata',
    obsControlDescription:
      'Healthcare Service UHG Schema D - Created for Masking Prod Data',
    createdBy: 'Chris Brown',
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
    obsControlId: 'OC-65577',
    obsControlName: 'PatientEHR_US - Master',
    obsControlDescription:
      'Healthcare Service UHG Schema E - Created for Masking Prod Data',
    createdBy: 'Maria Garcia',
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
    obsControlId: 'OC-67890',
    obsControlName: 'Healthcare Service - F',
    obsControlDescription:
      'Healthcare Service UHG Schema F - Created for Masking Prod Data',
    createdBy: 'Rodriguez V',
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
    obsControlId: 'OC-45456',
    obsControlName: 'Healthcare Service - G',
    obsControlDescription:
      'Healthcare Service UHG Schema G - Created for Masking Prod Data',
    createdBy: 'Martinez Sofia',
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
