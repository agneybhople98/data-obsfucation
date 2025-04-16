import { Injectable } from '@angular/core';

const ELEMENT_DATA: any[] = [
  {
    obsControlId: 'OC-98765',
    obsControlName: 'Healthcare service - Meta',
    obsControlDescription:
      'Healthcare Service Schema A - Created for Masking Prod Data',
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
      'Healthcare Service Schema B - Created for Masking Prod Data',
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
      'Healthcare Service Schema C - Created for Masking Prod Data',
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
      'Healthcare Service Schema D - Created for Masking Prod Data',
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
      'Healthcare Service Schema E - Created for Masking Prod Data',
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
      'Healthcare Service Schema F - Created for Masking Prod Data',
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
      'Healthcare Service Schema G - Created for Masking Prod Data',
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

// New Data

// Main data structure for tables and their columns
export interface TableData {
  tables: TableDefinition[];
  selectedTable?: string;
}

// Table definition with columns and obfuscation details
export interface TableDefinition {
  tableName: string;
  columns: ColumnDefinition[];
}

// Individual column definition with obfuscation strategies and rules
export interface ColumnDefinition {
  columnName: string;
  displayName: string;
  obfStrategy?: string;
  obfRules?: any;
}

// Sample data implementation
export const TABLE_DATA: TableData = {
  tables: [
    {
      tableName: 'CI_CUSTOMERS',
      columns: [
        {
          columnName: 'CUSTOMER_ID',
          displayName: 'Customer ID',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'FIRST_NAME',
          displayName: 'First Name',
          obfStrategy: 'STARIFY',
          obfRules: {
            first: 'R',
            second: '2',
          },
        },
        {
          columnName: 'LAST_NAME',
          displayName: 'Last Name',
          obfStrategy: 'RANDOMIZE',
          obfRules: {
            first: 'ALPHA',
            second: '5',
          },
        },
        {
          columnName: 'EMAIL',
          displayName: 'Email Address',
          obfStrategy: 'FAKER',
          obfRules: 'EMAIL',
        },
        {
          columnName: 'SSN',
          displayName: 'SSN Number',
          obfStrategy: 'FAKER',
          obfRules: 'SSN',
        },
        {
          columnName: 'DOB',
          displayName: 'Date of Birth',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'PHONE_NUMBER',
          displayName: 'Phone Number',
          obfStrategy: 'FAKER',
          obfRules: 'PHONE',
        },
      ],
    },
    {
      tableName: 'CI_ORDERS',
      columns: [
        {
          columnName: 'ORDER_ID',
          displayName: 'Order ID',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CUSTOMER_ID',
          displayName: 'Customer ID',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'ORDER_AMOUNT',
          displayName: 'Order Amount',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'ORDER_DATE',
          displayName: 'Order Date',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'PAYMENT_METHOD',
          displayName: 'Payment Method',
          obfStrategy: 'STARIFY',
          obfRules: {
            first: 'L',
            second: '3',
          },
        },
        {
          columnName: 'SHIPPING_ADDRESS',
          displayName: 'Shipping Address',
          obfStrategy: 'FAKER',
          obfRules: 'ADDRESS',
        },
        {
          columnName: 'STATUS',
          displayName: 'Status',
          obfStrategy: 'REPLACE_WITH_CONSTANT',
          obfRules: 'Delivered',
        },
      ],
    },
    {
      tableName: 'CI_PER',
      columns: [
        {
          columnName: 'PER_ID',
          displayName: 'Person ID',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'LANGUAGE_CD',
          displayName: 'Language Code',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'PER_OR_BUS_FLG',
          displayName: 'Person or Business Flag',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'LS_SL_FLG',
          displayName: 'LS SL Flag',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'LS_SL_DESCR',
          displayName: 'LS SL Description',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'EMAILID',
          displayName: 'Email ID',
          obfStrategy: 'FAKER',
          obfRules: 'EMAIL',
        },
        {
          columnName: 'OVRD_MAIL_NAME1',
          displayName: 'Override Mail Name 1',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'OVRD_MAIL_NAME2',
          displayName: 'Override Mail Name 2',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'OVRD_MAIL_NAME3',
          displayName: 'Override Mail Name 3',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'ADDRESS1',
          displayName: 'Address 1',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'ADDRESS2',
          displayName: 'Address 2',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'ADDRESS3',
          displayName: 'Address 3',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'ADDRESS4',
          displayName: 'Address 4',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CITY',
          displayName: 'City',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'NUM1',
          displayName: 'Number 1',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'NUM2',
          displayName: 'Number 2',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'COUNTY',
          displayName: 'County',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'POSTAL',
          displayName: 'Postal Code',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'HOUSE_TYPE',
          displayName: 'House Type',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'GEO_CODE',
          displayName: 'Geo Code',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'IN_CITY_LIMIT',
          displayName: 'In City Limit',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'STATE',
          displayName: 'State',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'COUNTRY',
          displayName: 'Country',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'VERSION',
          displayName: 'Version',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'RECV_MKTG_INFO_FLG',
          displayName: 'Receive Marketing Info Flag',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'WEB_PASSWD',
          displayName: 'Web Password',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'WEB_PWD_HINT_FLG',
          displayName: 'Web Password Hint Flag',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'WEB_PASSWD_ANS',
          displayName: 'Web Password Answer',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'PER_DATA_AREA',
          displayName: 'Person Data Area',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CIS_DIVISION',
          displayName: 'CIS Division',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'ACCESS_GRP_CD',
          displayName: 'Access Group Code',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'BIRTH_DT',
          displayName: 'Birth Date',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'SINCE_DT',
          displayName: 'Since Date',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CRE_BY',
          displayName: 'Created By',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'LAST_UPD_BY',
          displayName: 'Last Updated By',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CRE_DTTM',
          displayName: 'Creation Date Time',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'LAST_UPD_DTTM',
          displayName: 'Last Update Date Time',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'BO_STATUS_CD',
          displayName: 'BO Status Code',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'STATUS_UPD_DTTM',
          displayName: 'Status Update Date Time',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'BUS_OBJ_CD',
          displayName: 'Business Object Code',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'BO_DATA_AREA',
          displayName: 'BO Data Area',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CUST_SEG_FLG',
          displayName: 'Customer Segment Flag',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CUST_TIER_FLG',
          displayName: 'Customer Tier Flag',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'SRC_SYSTEM_CD',
          displayName: 'Source System Code',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'REL_MGR',
          displayName: 'Relationship Manager',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'IM_REFUND_SW',
          displayName: 'IM Refund Switch',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'ADV_DEP_LVL_FLG',
          displayName: 'Advanced Deposit Level Flag',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'ADV_DEP_AMT',
          displayName: 'Advanced Deposit Amount',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'ADV_DEP_GRACE_DAYS',
          displayName: 'Advanced Deposit Grace Days',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'DRAG_DAYS',
          displayName: 'Drag Days',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'COLL_CL_CD',
          displayName: 'Collection Class Code',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CR_REVIEW_DT',
          displayName: 'Credit Review Date',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'POSTPONE_CR_RVW_DT',
          displayName: 'Postpone Credit Review Date',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
      ],
    },
    {
      tableName: 'CI_PER_ADDR_SEAS',
      columns: [
        {
          columnName: 'PER_ID',
          displayName: 'Person ID',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'SEQ_NUM',
          displayName: 'Sequence Number',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'ADDRESS1',
          displayName: 'Address 1',
          obfStrategy: 'FAKER',
          obfRules: {
            first: 'ADDRESS',
            second: undefined,
          },
        },
        {
          columnName: 'ADDRESS2',
          displayName: 'Address 2',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'ADDRESS3',
          displayName: 'Address 3',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'ADDRESS4',
          displayName: 'Address 4',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CITY',
          displayName: 'City',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'NUM1',
          displayName: 'Number 1',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'NUM2',
          displayName: 'Number 2',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'COUNTY',
          displayName: 'County',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'POSTAL',
          displayName: 'Postal Code',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'HOUSE_TYPE',
          displayName: 'House Type',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'GEO_CODE',
          displayName: 'Geo Code',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'IN_CITY_LIMIT',
          displayName: 'In City Limit',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'STATE',
          displayName: 'State',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'COUNTRY',
          displayName: 'Country',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'VERSION',
          displayName: 'Version',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'SEASON_START_MMDD',
          displayName: 'Season Start MMDD',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'SEASON_END_MMDD',
          displayName: 'Season End MMDD',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'EFF_STATUS',
          displayName: 'Effective Status',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
      ],
    },
    {
      tableName: 'CI_PER_NAME',
      columns: [
        {
          columnName: 'PER_ID',
          displayName: 'Person ID',
          obfStrategy: undefined,
          obfRules: {},
        },
        {
          columnName: 'SEQ_NUM',
          displayName: 'Sequence Number',
          obfStrategy: undefined,
          obfRules: {},
        },
        {
          columnName: 'ENTITY_NAME',
          displayName: 'Entity Name',
          obfStrategy: 'FAKER',
          obfRules: {
            first: 'NAME',
            second: undefined,
          },
        },
        {
          columnName: 'NAME_TYPE_FLG',
          displayName: 'Name Type Flag',
          obfStrategy: undefined,
          obfRules: {},
        },
        {
          columnName: 'VERSION',
          displayName: 'Version',
          obfStrategy: undefined,
          obfRules: {},
        },
        {
          columnName: 'PRIM_NAME_SW',
          displayName: 'Primary Name Switch',
          obfStrategy: undefined,
          obfRules: {},
        },
        {
          columnName: 'ENTITY_NAME_UPR',
          displayName: 'Entity Name Upper',
          obfStrategy: undefined,
          obfRules: {},
        },
      ],
    },
    {
      tableName: 'CI_PER_PHONE',
      columns: [
        {
          columnName: 'PER_ID',
          displayName: 'Person ID',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'SEQ_NUM',
          displayName: 'Sequence Number',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'PHONE_TYPE_CD',
          displayName: 'Phone Type Code',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'COUNTRY_CODE',
          displayName: 'Country Code',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'PHONE',
          displayName: 'Phone',
          obfStrategy: 'FAKER',
          obfRules: {
            first: 'PHONE',
            second: undefined,
          },
        },
        {
          columnName: 'EXTENSION',
          displayName: 'Extension',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'VERSION',
          displayName: 'Version',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
      ],
    },
  ],
  selectedTable: 'CI_CUSTOMERS',
};

@Injectable({
  providedIn: 'root',
})
export class ObsfucationService {
  private obsfucationData: any[] = ELEMENT_DATA;
  // private obsfucationStrategies: any[] = ELEMENT_DATA_2;

  constructor() {}
  getAllObsfucations() {
    return this.obsfucationData;
  }
  // getAllObsfucationStrategies() {
  //   return this.obsfucationStrategies;
  // }
}
