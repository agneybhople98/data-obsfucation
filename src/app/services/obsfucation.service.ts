import { Injectable } from '@angular/core';

const ELEMENT_DATA: any[] = [
  {
    obsControlId: 'OP-98765',
    obsControlName: 'Utility Account Obfuscation',
    obsControlDescription:
      'Obfuscate utility accounts for non-production environments.',
    createdBy: 'Miller Smith',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEV',
    },
  },
  {
    obsControlId: 'OP-98764',
    obsControlName: 'Financial Data Masking',
    obsControlDescription:
      'Mask utility financial data for safe use in test and development environments.',
    createdBy: 'Smith Wilson',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA_Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEV',
    },
  },
  {
    obsControlId: 'OP-98763',
    obsControlName: 'Person Entity Anonymization',
    obsControlDescription:
      'Anonymize persons for secure pre-production and testing.',
    createdBy: 'Jonny Johnson',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEV',
    },
  },
  {
    obsControlId: 'OP-98762',
    obsControlName: 'Field Activity Data Obfuscation',
    obsControlDescription:
      'Obfuscate field activity data for development/test usage.',
    createdBy: 'Chris Brown',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEV',
    },
  },
  {
    obsControlId: 'OP-98761',
    obsControlName: 'Billing & Financial History',
    obsControlDescription: 'Obfuscates billing and financial history data.',
    createdBy: 'Maria Garcia',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEV',
    },
  },
  {
    obsControlId: 'OP-98760',
    obsControlName: 'Support Interaction Data Masking',
    obsControlDescription: 'Mask support tickets and customer interactions.',
    createdBy: 'Rodriguez V',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEV',
    },
  },
  {
    obsControlId: 'OP-98759',
    obsControlName: 'Outage Data Anonymization',
    obsControlDescription:
      'Global anonymization of outage data for analytics, reporting, and compliance.',
    createdBy: 'Martinez Sofia',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEV',
    },
  },
];
const ELEMENT_DATA_HEALTHCARE: any[] = [
  {
    obsControlId: 'OP-98765',
    obsControlName: 'HC SvcData Obfuscation - EU',
    obsControlDescription:
      'Obfuscates healthcare service records from EU regions for non-production environments.',
    createdBy: 'Miller Smith',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEV',
    },
  },
  {
    obsControlId: 'OP-98764',
    obsControlName: 'Insurance Claims Obfuscation',
    obsControlDescription:
      'Masks insurance claims data for safe use in test and development environements.',
    createdBy: 'Smith Wilson',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA_Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEV',
    },
  },
  {
    obsControlId: 'OP-98763',
    obsControlName: 'HC Provider TestDB Obfuscation',
    obsControlDescription:
      'Anonymizes healthcare provider database for secure pre-production and testing.',
    createdBy: 'Jonny Johnson',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEV',
    },
  },
  {
    obsControlId: 'OP-98762',
    obsControlName: 'HC SvcData Obfuscation - AUS',
    obsControlDescription:
      'Obfuscates healthcare service data from Australia for dev/test usage.',
    createdBy: 'Chris Brown',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEV',
    },
  },
  {
    obsControlId: 'OP-98761',
    obsControlName: 'Insurance Policy Obfuscation - US',
    obsControlDescription:
      'Obfuscates insurance policyholder details in U.S. policy DBs.',
    createdBy: 'Maria Garcia',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEV',
    },
  },
  {
    obsControlId: 'OP-98760',
    obsControlName: 'Outage Reports Obfuscation - Global',
    obsControlDescription:
      'Global anonymization of outage data for analytics, reporting, and compliance.',
    createdBy: 'Rodriguez V',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEV',
    },
  },
  {
    obsControlId: 'OP-98759',
    obsControlName: 'Patient Master Prod Obfuscation - EU',
    obsControlDescription:
      'Patient Master system - Production environment for the EU region.',
    createdBy: 'Martinez Sofia',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEV',
    },
  },
];

// New Data

@Injectable({
  providedIn: 'root',
})
export class ObsfucationService {
  private obsfucationData: any[] = ELEMENT_DATA;

  private healthcareObfuscationData: any[] = ELEMENT_DATA_HEALTHCARE;
  // private obsfucationStrategies: any[] = ELEMENT_DATA_2;

  constructor() {}
  getAllObsfucations() {
    return this.obsfucationData;
  }
  getAllHealthcareObfuscation() {
    return this.healthcareObfuscationData;
  }
}
