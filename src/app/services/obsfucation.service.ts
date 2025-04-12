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

@Injectable({
  providedIn: 'root',
})
export class ObsfucationService {
  private obsfucationData: any[] = ELEMENT_DATA;
  constructor() {}

  getAllObsfucations() {
    return this.obsfucationData;
  }
}
