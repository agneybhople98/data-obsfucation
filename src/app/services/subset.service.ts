import { Injectable } from '@angular/core';

const ELEMENT_DATA: any[] = [
  {
    obsControlId: 'SP-98765',
    obsControlName: 'Utility Account Subset Plan',
    obsControlDescription: 'Utility accounts for non-production environments.',
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
    obsControlId: 'SP-98764',
    obsControlName: 'Financial Data',
    obsControlDescription:
      'Utility financial data for safe use in test and development environments.',
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
    obsControlId: 'SP-98763',
    obsControlName: 'Person Entity',
    obsControlDescription:
      'Person Entity for secure pre-production and testing.',
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
    obsControlId: 'SP-98762',
    obsControlName: 'Field Activity Data Subset Plan',
    obsControlDescription: 'Field activity data for development/test usage.',
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
    obsControlId: 'SP-98761',
    obsControlName: 'Billing & Financial History',
    obsControlDescription: 'Extract billing and financial history data.',
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
    obsControlId: 'SP-98760',
    obsControlName: 'Support Interaction Data',
    obsControlDescription: 'Support tickets and customer interactions.',
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
    obsControlId: 'SP-98759',
    obsControlName: 'Outage Data',
    obsControlDescription:
      'Extract claim headers and line items, including statuses and adjudication outcomes.',
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
    obsControlId: 'SP-98765',
    obsControlName: 'Membership & Policy Data Subset Plan',
    obsControlDescription:
      'Masks sensitive details in customer memberships, policies, and eligibility for staging.',
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
    obsControlId: 'SP-98764',
    obsControlName: 'Customer & Account Subset Plan',
    obsControlDescription:
      'Extract Customer & Account details for list of accounts',
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
    obsControlId: 'SP-98763',
    obsControlName: 'Billing Transactions data subset plan',
    obsControlDescription: 'Subset billing data for M11 bill cycle accounts.',
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
    obsControlId: 'SP-98762',
    obsControlName: 'Membership Plan Enrollments Subset Plan',
    obsControlDescription:
      'Extracts enrollment data , plan types, and coverage start/end dates.',
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
    obsControlId: 'SP-98761',
    obsControlName: 'Billing Transactions data subset JobPlan - Prod',
    obsControlDescription:
      'Extract subset insurance coverage data, benefits, and associated financial limits.',
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
    obsControlId: 'SP-98760',
    obsControlName: 'Claim Details Subset Plan - EU',
    obsControlDescription:
      'Extracts claim headers and line items, including statuses and adjudication outcomes.',
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
    obsControlId: 'SP-98759',
    obsControlName: 'Claims Payments & Payouts - AUS',
    obsControlDescription:
      'Extracts financial disbursements data, payment references, and claim resolution info.',
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
export class SubsetService {
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
