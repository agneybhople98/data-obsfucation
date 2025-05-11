import { Injectable } from '@angular/core';

// Sample data implementation

// Main data structure for tables and their columns
export interface TableData {
  tables: TableDefinition[];
  selectedTable?: string;
}

// Individual column definition with obfuscation strategies and rules
export interface ColumnDefinition {
  columnName: string;
  displayName: string;
  subsetStrategy?: string;
  subsetRules?: any;
  conditionValues?: any;
  isExpandable?: boolean;
  options?: any;
  inputValue?: any;
}

// Table definition with columns and obfuscation details
export interface TableDefinition {
  tableName: string;
  columns: ColumnDefinition[];
}

// Utility Table Data
export const TABLE_DATA_HEATLHCARE: TableData = {
  tables: [
    {
      tableName: 'CI_CUSTOMERS',
      columns: [
        {
          columnName: 'CUSTOMER_ID',
          displayName: 'Customer ID',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'FIRST_NAME',
          displayName: 'First Name',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'LAST_NAME',
          displayName: 'Last Name',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'EMAIL',
          displayName: 'Email Address',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'SSN',
          displayName: 'SSN Number',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'DOB',
          displayName: 'Date of Birth',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'PHONE_NUMBER',
          displayName: 'Phone Number',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
      ],
    },
    {
      tableName: 'CI_ORDERS',
      columns: [
        {
          columnName: 'ORDER_ID',
          displayName: 'Order ID',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CUSTOMER_ID',
          displayName: 'Customer ID',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ORDER_AMOUNT',
          displayName: 'Order Amount',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ORDER_DATE',
          displayName: 'Order Date',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'PAYMENT_METHOD',
          displayName: 'Payment Method',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'SHIPPING_ADDRESS',
          displayName: 'Shipping Address',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'STATUS',
          displayName: 'Status',
          subsetStrategy: 'REPLACE_WITH_CONSTANT',
          subsetRules: {
            min: 'Delivered',
            max: undefined,
          },
        },
      ],
    },
    {
      tableName: 'CI_PER',
      columns: [
        {
          columnName: 'PER_ID',
          displayName: 'Person ID',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'EMAILID',
          displayName: 'Email ID',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },

        {
          columnName: 'POSTAL',
          displayName: 'Postal Code',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CITY',
          displayName: 'City',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },

        {
          columnName: 'PER_OR_BUS_FLG',
          displayName: 'Person or Business Flag',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'LANGUAGE_CD',
          displayName: 'Language Code',
          subsetStrategy: 'Condition',
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADDRESS1',
          displayName: 'Address 1',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'LS_SL_FLG',
          displayName: 'LS SL Flag',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'LS_SL_DESCR',
          displayName: 'LS SL Description',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },

        {
          columnName: 'OVRD_MAIL_NAME1',
          displayName: 'Override Mail Name 1',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'OVRD_MAIL_NAME2',
          displayName: 'Override Mail Name 2',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'OVRD_MAIL_NAME3',
          displayName: 'Override Mail Name 3',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },

        {
          columnName: 'ADDRESS2',
          displayName: 'Address 2',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADDRESS3',
          displayName: 'Address 3',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADDRESS4',
          displayName: 'Address 4',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },

        {
          columnName: 'NUM1',
          displayName: 'Number 1',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'NUM2',
          displayName: 'Number 2',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'COUNTY',
          displayName: 'County',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },

        {
          columnName: 'HOUSE_TYPE',
          displayName: 'House Type',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'GEO_CODE',
          displayName: 'Geo Code',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'IN_CITY_LIMIT',
          displayName: 'In City Limit',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'STATE',
          displayName: 'State',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'COUNTRY',
          displayName: 'Country',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'VERSION',
          displayName: 'Version',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'RECV_MKTG_INFO_FLG',
          displayName: 'Receive Marketing Info Flag',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'WEB_PASSWD',
          displayName: 'Web Password',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'WEB_PWD_HINT_FLG',
          displayName: 'Web Password Hint Flag',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'WEB_PASSWD_ANS',
          displayName: 'Web Password Answer',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'PER_DATA_AREA',
          displayName: 'Person Data Area',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CIS_DIVISION',
          displayName: 'CIS Division',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ACCESS_GRP_CD',
          displayName: 'Access Group Code',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'BIRTH_DT',
          displayName: 'Birth Date',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'SINCE_DT',
          displayName: 'Since Date',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CRE_BY',
          displayName: 'Created By',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'LAST_UPD_BY',
          displayName: 'Last Updated By',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CRE_DTTM',
          displayName: 'Creation Date Time',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'LAST_UPD_DTTM',
          displayName: 'Last Update Date Time',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'BO_STATUS_CD',
          displayName: 'BO Status Code',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'STATUS_UPD_DTTM',
          displayName: 'Status Update Date Time',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'BUS_OBJ_CD',
          displayName: 'Business Object Code',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'BO_DATA_AREA',
          displayName: 'BO Data Area',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CUST_SEG_FLG',
          displayName: 'Customer Segment Flag',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CUST_TIER_FLG',
          displayName: 'Customer Tier Flag',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'SRC_SYSTEM_CD',
          displayName: 'Source System Code',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'REL_MGR',
          displayName: 'Relationship Manager',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'IM_REFUND_SW',
          displayName: 'IM Refund Switch',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADV_DEP_LVL_FLG',
          displayName: 'Advanced Deposit Level Flag',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADV_DEP_AMT',
          displayName: 'Advanced Deposit Amount',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADV_DEP_GRACE_DAYS',
          displayName: 'Advanced Deposit Grace Days',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'DRAG_DAYS',
          displayName: 'Drag Days',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'COLL_CL_CD',
          displayName: 'Collection Class Code',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CR_REVIEW_DT',
          displayName: 'Credit Review Date',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'POSTPONE_CR_RVW_DT',
          displayName: 'Postpone Credit Review Date',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
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
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'SEQ_NUM',
          displayName: 'Sequence Number',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADDRESS1',
          displayName: 'Address 1',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADDRESS2',
          displayName: 'Address 2',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADDRESS3',
          displayName: 'Address 3',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADDRESS4',
          displayName: 'Address 4',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CITY',
          displayName: 'City',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'NUM1',
          displayName: 'Number 1',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'NUM2',
          displayName: 'Number 2',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'COUNTY',
          displayName: 'County',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'POSTAL',
          displayName: 'Postal Code',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'HOUSE_TYPE',
          displayName: 'House Type',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'GEO_CODE',
          displayName: 'Geo Code',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'IN_CITY_LIMIT',
          displayName: 'In City Limit',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'STATE',
          displayName: 'State',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'COUNTRY',
          displayName: 'Country',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'VERSION',
          displayName: 'Version',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'SEASON_START_MMDD',
          displayName: 'Season Start MMDD',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'SEASON_END_MMDD',
          displayName: 'Season End MMDD',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'EFF_STATUS',
          displayName: 'Effective Status',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
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
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'SEQ_NUM',
          displayName: 'Sequence Number',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'ENTITY_NAME',
          displayName: 'Entity Name',
          subsetStrategy: undefined,
          subsetRules: {
            min: '10',
            max: '1000',
          },
        },
        {
          columnName: 'NAME_TYPE_FLG',
          displayName: 'Name Type Flag',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'VERSION',
          displayName: 'Version',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'PRIM_NAME_SW',
          displayName: 'Primary Name Switch',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'ENTITY_NAME_UPR',
          displayName: 'Entity Name Upper',
          subsetStrategy: undefined,
          subsetRules: {
            min: '10',
            max: '200',
          },
        },
      ],
    },
    {
      tableName: 'CI_PER_PHONE',
      columns: [
        {
          columnName: 'PER_ID',
          displayName: 'Person ID',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'SEQ_NUM',
          displayName: 'Sequence Number',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'PHONE_TYPE_CD',
          displayName: 'Phone Type Code',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'COUNTRY_CODE',
          displayName: 'Country Code',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'PHONE',
          displayName: 'Phone',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'EXTENSION',
          displayName: 'Extension',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'VERSION',
          displayName: 'Version',
          subsetStrategy: undefined,
          subsetRules: {},
        },
      ],
    },
    {
      tableName: 'C1_ADDRESS',
      columns: [
        {
          columnName: 'ADDRESS_ID',
          displayName: 'Address Id',
          subsetStrategy: 'undefined',
          subsetRules: {},
        },
        {
          columnName: 'ADDRESS1',
          displayName: 'Address 1',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADDRESS1_UPR',
          displayName: 'Address Upper',
          subsetStrategy: undefined,
          subsetRules: {},
        },

        {
          columnName: 'ADDRESS2',
          displayName: 'Address 2',
          subsetStrategy: undefined,
          subsetRules: {},
        },

        {
          columnName: 'CITY',
          displayName: 'City',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CITY_UPR',
          displayName: 'City Upper',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'COUNTY',
          displayName: 'County',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'POSTAL',
          displayName: 'Address 1',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'HOUSE_TYPE',
          displayName: 'House Type',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'GEO_CODE',
          displayName: 'Geo Code',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'IN_CITY_LIMIT',
          displayName: 'In City Limit',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'STATE',
          displayName: 'State',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'COUNTRY',
          displayName: 'Country',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'VERSION',
          displayName: 'Version',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'PER_ADDR_ID',
          displayName: 'Person Address ID',
          subsetStrategy: undefined,
          subsetRules: {},
        },
      ],
    },

    {
      tableName: 'CI_PER_ID',
      columns: [
        {
          columnName: 'PER_ID',
          displayName: 'Per Id',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'ID_TYPE_CD',
          displayName: 'ID Type CD',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'PER_ID_NBR',
          displayName: 'Per Id NBR',
          subsetStrategy: undefined,
          subsetRules: {},

          isExpandable: true,
          options: [
            {
              selectedOnCondition: 'ID_TYPE_CD',
              selectedOperator: '=',
              selectedValue: 'SSN',
              selectedObfStrategy: 'FAKER',
              selectedObfRule: 'SSN',
              inputValue: '',
            },
          ],
        },
        {
          columnName: 'PRIM_SW',
          displayName: 'Prime SW',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'VERSION',
          displayName: 'Version',
          subsetStrategy: undefined,
          subsetRules: {},
        },
      ],
    },
    {
      tableName: 'CI_PER_CHAR',
      columns: [
        {
          columnName: 'PER_ID',
          displayName: 'Per Id',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CHAR_TYPE_CD',
          displayName: 'Char Type CD',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CHAR_VAL',
          displayName: 'Char Val',
          subsetStrategy: undefined,
          isExpandable: true,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },

          options: [
            {
              selectedOnCondition: 'CHAR_TYPE_CD',
              selectedOperator: '=',
              selectedValue: 'CM-GENDR',
              selectedObfStrategy: 'REPLACE_WITH_CONSTANT',
              selectedObfRule: 'F',
              inputValue: '',
            },
          ],
        },
        {
          columnName: 'EFFDT',
          displayName: 'Effdt',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADHOC_CHAR_VAL',
          displayName: 'Adhoc Char Val',
          isExpandable: true,
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },

          options: [
            {
              selectedOnCondition: 'CHAR_TYPE_CD',
              selectedOperator: '=',
              selectedValue: 'CMLNAME',
              selectedObfStrategy: 'STARIFY',
              selectedObfRule: 'L',
              inputValue: '3',
            },
          ],
        },

        {
          columnName: 'VERSION',
          displayName: 'Version',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CHAR_VAL_FK1',
          displayName: 'Character Value FK 2',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CHAR_VAL_FK2',
          displayName: 'Character Value FK 2',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CHAR_VAL_FK3',
          displayName: 'Character Value FK 3',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CHAR_VAL_FK4',
          displayName: 'Character Value FK 4',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CHAR_VAL_FK5',
          displayName: 'Character Value FK 5',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
      ],
    },
  ],
  selectedTable: 'CI_PER',
};
// Healthcare Table Data
export const TABLE_DATA_UTILITY: TableData = {
  tables: [
    {
      tableName: 'CI_PER',
      columns: [
        {
          columnName: 'PER_ID',
          displayName: 'Person ID',
          subsetStrategy: 'Condition',
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'LANGUAGE_CD',
          displayName: 'Language Code',
          subsetStrategy: 'Condition',
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'PER_OR_BUS_FLG',
          displayName: 'Person or Business Flag',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'LS_SL_FLG',
          displayName: 'LS SL Flag',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'LS_SL_DESCR',
          displayName: 'LS SL Description',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'EMAILID',
          displayName: 'Email ID',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'OVRD_MAIL_NAME1',
          displayName: 'Override Mail Name 1',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'OVRD_MAIL_NAME2',
          displayName: 'Override Mail Name 2',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'OVRD_MAIL_NAME3',
          displayName: 'Override Mail Name 3',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADDRESS1',
          displayName: 'Address 1',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADDRESS2',
          displayName: 'Address 2',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADDRESS3',
          displayName: 'Address 3',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADDRESS4',
          displayName: 'Address 4',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CITY',
          displayName: 'City',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'NUM1',
          displayName: 'Number 1',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'NUM2',
          displayName: 'Number 2',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'COUNTY',
          displayName: 'County',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'POSTAL',
          displayName: 'Postal Code',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'HOUSE_TYPE',
          displayName: 'House Type',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'GEO_CODE',
          displayName: 'Geo Code',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'IN_CITY_LIMIT',
          displayName: 'In City Limit',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'STATE',
          displayName: 'State',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'COUNTRY',
          displayName: 'Country',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'VERSION',
          displayName: 'Version',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'RECV_MKTG_INFO_FLG',
          displayName: 'Recv Mktg Info Flag',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'WEB_PASSWD',
          displayName: 'Web Password ',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'WEB_PWD_HINT_FLG',
          displayName: 'Web Pwd Hint Flg ',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'WEB_PASSWD_ANS',
          displayName: 'Web Passwd Ans',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'PER_DATA_AREA',
          displayName: 'Per Data Area',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
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
          subsetStrategy: 'Condition',
          subsetRules: {},
        },
        {
          columnName: 'SEQ_NUM',
          displayName: 'Sequence Number',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'ENTITY_NAME',
          displayName: 'Entity Name',
          subsetStrategy: undefined,
          subsetRules: {
            min: '200',
            max: '4000',
          },
        },
        {
          columnName: 'NAME_TYPE_FLG',
          displayName: 'Name Type Flag',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'VERSION',
          displayName: 'Version',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'PRIM_NAME_SW',
          displayName: 'Primary Name Switch',
          subsetStrategy: undefined,
          subsetRules: {},
        },
        {
          columnName: 'ENTITY_NAME_UPR',
          displayName: 'Entity Name Upper',
          subsetStrategy: undefined,
          subsetRules: {},
        },
      ],
    },

    {
      tableName: 'CI_PER_ADDR_SEAS',
      columns: [
        {
          columnName: 'PER_ID',
          displayName: 'Person ID',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'SEQ_NUM',
          displayName: 'Sequence Number',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADDRESS1',
          displayName: 'Address 1',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADDRESS2',
          displayName: 'Address 2',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADDRESS3',
          displayName: 'Address 3',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADDRESS4',
          displayName: 'Address 4',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CITY',
          displayName: 'City',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'NUM1',
          displayName: 'Number 1',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'NUM2',
          displayName: 'Number 2',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'COUNTY',
          displayName: 'County',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'POSTAL',
          displayName: 'Postal Code',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'HOUSE_TYPE',
          displayName: 'House Type',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'GEO_CODE',
          displayName: 'Geo Code',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'IN_CITY_LIMIT',
          displayName: 'In City Limit',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'STATE',
          displayName: 'State',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'COUNTRY',
          displayName: 'Country',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'VERSION',
          displayName: 'Version',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'SEASON_START_MMDD',
          displayName: 'Season Start MMDD',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'SEASON_END_MMDD',
          displayName: 'Season End MMDD',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'EFF_STATUS',
          displayName: 'Effective Status',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
      ],
    },
    {
      tableName: 'CI_PER_ID',
      columns: [
        {
          columnName: 'PER_ID',
          displayName: 'Per Id',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ID_TYPE_CD',
          displayName: 'ID Type CD',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'PER_ID_NBR',
          displayName: 'Per Id NBR',
          subsetStrategy: undefined,
          isExpandable: true,

          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },

          options: [
            {
              selectedOnCondition: 'ID_TYPE_CD',
              selectedOperator: '=',
              selectedValue: 'SSN',
              selectedObfStrategy: 'FAKER',
              selectedObfRule: 'SSN',
              inputValue: '',
            },
          ],
        },
        {
          columnName: 'PRIM_SW',
          displayName: 'Prime SW',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'VERSION',
          displayName: 'Version',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ENCR_PER_ID_NBR',
          displayName: 'Character Value FK 5',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'HASH_PER_ID_NBR',
          displayName: 'Character Value FK 5',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
      ],
    },
    {
      tableName: 'CI_PER_CONTDET',
      columns: [
        {
          columnName: 'C1_CONTACT_ID',
          displayName: 'C1_CONTACT_ID',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'PER_ID',
          displayName: 'PER_ID',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'COMM_RTE_TYPE_CD',
          displayName: 'COMM_RTE_TYPE_CD',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CONTACT_VALUE',
          displayName: 'CONTACT_VALUE',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CND_PRIMARY_FLAG',
          displayName: 'CND_PRIMARY_FLAG',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CONTACT_VALUE_EXT',
          displayName: 'CONTACT_VALUE_EXT',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'DND_START_TM',
          displayName: 'DND_START_TM',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'DND_END_TM',
          displayName: 'DND_END_TM',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CND_VERIFY_STATUS_FLAG',
          displayName: 'CND_VERIFY_STATUS_FLAG',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CND_ACTINACT_FLG',
          displayName: 'CND_ACTINACT_FLG',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CONTACT_NAME',
          displayName: 'CONTACT_NAME',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'VERSION',
          displayName: 'VERSION',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
      ],
    },
    {
      tableName: 'CI_PER_CHAR',
      columns: [
        {
          columnName: 'PER_ID',
          displayName: 'Per Id',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CHAR_TYPE_CD',
          displayName: 'Char Type CD',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CHAR_VAL',
          displayName: 'Char Val',
          subsetStrategy: undefined,
          isExpandable: true,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },

          options: [
            {
              selectedOnCondition: 'CHAR_TYPE_CD',
              selectedOperator: '=',
              selectedValue: 'C2M_SNR',
              selectedObfStrategy: 'REPLACE_WITH_CONSTANT',
              selectedObfRule: 'Y',
              inputValue: '',
            },
          ],
        },
        {
          columnName: 'EFFDT',
          displayName: 'Effdt',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'ADHOC_CHAR_VAL',
          displayName: 'Adhoc Char Val',
          isExpandable: true,
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
          options: [
            {
              selectedOnCondition: 'CHAR_TYPE_CD',
              selectedOperator: '=',
              selectedValue: 'C2MBTHDT',
              selectedObfStrategy: 'FAKER',
              selectedObfRule: 'DATE',
              inputValue: '',
            },
          ],
        },

        {
          columnName: 'VERSION',
          displayName: 'Version',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CHAR_VAL_FK1',
          displayName: 'Character Value FK 2',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CHAR_VAL_FK2',
          displayName: 'Character Value FK 2',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CHAR_VAL_FK3',
          displayName: 'Character Value FK 3',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CHAR_VAL_FK4',
          displayName: 'Character Value FK 4',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'CHAR_VAL_FK5',
          displayName: 'Character Value FK 5',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
        {
          columnName: 'SRCH_CHAR_VAL',
          displayName: 'Srch Char Val',
          subsetStrategy: undefined,
          subsetRules: {
            min: undefined,
            max: undefined,
            minPercent: 0,
            maxPercent: 100,
          },
        },
      ],
    },
  ],
  selectedTable: 'CI_PER',
};

@Injectable({
  providedIn: 'root',
})
export class CreateSubsetService {
  constructor() {}
}
