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
      schemaName: 'ARCHDEVDEMO',
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
      schemaName: 'ARCHDEVDEMO',
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
      schemaName: 'ARCHDEVDEMO',
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
      schemaName: 'ARCHDEVDEMO',
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
      schemaName: 'ARCHDEVDEMO',
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
      schemaName: 'ARCHDEVDEMO',
    },
  },
  {
    obsControlId: 'OP-98759',
    obsControlName: 'Outage Data Anonymization',
    obsControlDescription:
      'Obfuscates claim headers and line items, including statuses and adjudication outcomes.',
    createdBy: 'Martinez Sofia',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEVDEMO',
    },
  },
];
const ELEMENT_DATA_HEALTHCARE: any[] = [
  {
    obsControlId: 'OP-98765',
    obsControlName: 'Membership & Policy Data Obfuscation',
    obsControlDescription:
      'Masks sensitive details in customer memberships, policies, and eligibility for staging.',
    createdBy: 'Miller Smith',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEVDEMO',
    },
  },
  {
    obsControlId: 'OP-98764',
    obsControlName: 'Customer & Account Obfuscation',
    obsControlDescription:
      'Obfuscates personally identifiable information (PII) in customer and account entities.',
    createdBy: 'Smith Wilson',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA_Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEVDEMO',
    },
  },
  {
    obsControlId: 'OP-98763',
    obsControlName: 'Billing Transactions - US Region',
    obsControlDescription:
      'Secures billing, adjustments, and payment data for performance testing.',
    createdBy: 'Jonny Johnson',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEVDEMO',
    },
  },
  {
    obsControlId: 'OP-98762',
    obsControlName: 'Membership Plan Enrollments Obfuscation',
    obsControlDescription:
      'Anonymizes enrollment details, plan types, and coverage start/end dates.',
    createdBy: 'Chris Brown',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEVDEMO',
    },
  },
  {
    obsControlId: 'OP-98761',
    obsControlName: 'Coverage & Benefits Obfuscation - Prod',
    obsControlDescription:
      'Masks insurance coverage data, benefits, and associated financial limits.',
    createdBy: 'Maria Garcia',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEVDEMO',
    },
  },
  {
    obsControlId: 'OP-98760',
    obsControlName: 'Claim Details Obfuscation - EU',
    obsControlDescription:
      'Obfuscates claim headers and line items, including statuses and adjudication outcomes.',
    createdBy: 'Rodriguez V',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEVDEMO',
    },
  },
  {
    obsControlId: 'OP-98759',
    obsControlName: 'Claims Payments & Payouts - AUS',
    obsControlDescription:
      'Anonymizes financial disbursements, payment references, and claim resolution info.',
    createdBy: 'Martinez Sofia',
    details: {
      name: 'Testing',
      databaseType: 'Oracle Database',
      url: 'https://do.uat.riaproducts.com/',
      username: 'RIA Advisory',
      password: 'riahealthcare123',
      schemaName: 'ARCHDEVDEMO',
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
