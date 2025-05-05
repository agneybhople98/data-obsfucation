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
      'Anonymizes healthcare provider profiles and contact information for NA region',
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
    obsControlName: 'Healthcare Policy data',
    obsControlDescription:
      'Masking sensitive details in healthcare policy records for testing on stage enviroment',
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
    obsControlName: 'Healthcare Accounts Data',
    obsControlDescription:
      'Obfuscates financial and user account information from production data',
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
    obsControlName: 'Billing Info Data',
    obsControlDescription:
      'Secures billing transactions and payment records for performance testing enviroment',
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
    obsControlName: 'Medical History records obfuscation',
    obsControlDescription:
      'Anonymizes sensitive medical records and treatment histories',
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
    obsControlName: 'Insurance Coverage obfuscation',
    obsControlDescription:
      'Masks member coverage plans and insurance provider data.',
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
    obsControlName: 'Service Provider Directory obfuscation',
    obsControlDescription:
      'Anonymizes healthcare provider profiles and contact information for NA region',
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
    obsControlName: 'Pharmacy Claims obfuscation',
    obsControlDescription:
      'Secures prescription claim data including drug codes and patient info',
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
