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
  obfStrategy?: string;
  obfRules?: any;
  isExpandable?: boolean;
  selectedOnCondition?: any;
  selectedOperator?: any;
  selectedValue?: any;
  selectedObfStrategy?: any;
  selectedObfRule?: any;
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
          obfRules: {
            first: 'EMAIL',
            second: undefined,
          },
        },
        {
          columnName: 'SSN',
          displayName: 'SSN Number',
          obfStrategy: 'FAKER',
          obfRules: {
            first: 'SSN',
            second: undefined,
          },
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
          obfRules: {
            first: 'PHONE',
            second: undefined,
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
          obfRules: {
            first: 'ADDRESS',
            second: undefined,
          },
        },
        {
          columnName: 'STATUS',
          displayName: 'Status',
          obfStrategy: 'REPLACE_WITH_CONSTANT',
          obfRules: {
            first: 'Delivered',
            second: undefined,
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
          obfRules: {
            first: 'EMAIL',
            second: undefined,
          },
        },

        {
          columnName: 'POSTAL',
          displayName: 'Postal Code',
          obfStrategy: 'RANDOMIZE',
          obfRules: {
            first: 'NUMERIC',
            second: '6',
          },
        },
        {
          columnName: 'CITY',
          displayName: 'City',
          obfStrategy: 'STARIFY',
          obfRules: {
            first: 'L',
            second: '3',
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
          columnName: 'LANGUAGE_CD',
          displayName: 'Language Code',
          obfStrategy: 'REPLACE_WITH_CONSTANT',
          obfRules: {
            first: 'ENG',
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
            first: 'FULL_NAME',
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
          obfRules: {},
        },
        {
          columnName: 'SEQ_NUM',
          displayName: 'Sequence Number',
          obfStrategy: undefined,
          obfRules: {},
        },
        {
          columnName: 'PHONE_TYPE_CD',
          displayName: 'Phone Type Code',
          obfStrategy: undefined,
          obfRules: {},
        },
        {
          columnName: 'COUNTRY_CODE',
          displayName: 'Country Code',
          obfStrategy: undefined,
          obfRules: {},
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
          obfRules: {},
        },
        {
          columnName: 'VERSION',
          displayName: 'Version',
          obfStrategy: undefined,
          obfRules: {},
        },
      ],
    },
    {
      tableName: 'C1_ADDRESS',
      columns: [
        {
          columnName: 'ADDRESS_ID',
          displayName: 'Address Id',
          obfStrategy: 'undefined',
          obfRules: {},
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
          columnName: 'ADDRESS1_UPR',
          displayName: 'Address Upper',
          obfStrategy: undefined,
          obfRules: {},
        },

        {
          columnName: 'ADDRESS2',
          displayName: 'Address 2',
          obfStrategy: undefined,
          obfRules: {},
        },

        {
          columnName: 'CITY',
          displayName: 'City',
          obfStrategy: 'REPLACE_WITH_CONSTANT',
          obfRules: {
            first: 'California',
            second: undefined,
          },
        },
        {
          columnName: 'CITY_UPR',
          displayName: 'City Upper',
          obfStrategy: undefined,
          obfRules: {},
        },
        {
          columnName: 'COUNTY',
          displayName: 'County',
          obfStrategy: undefined,
          obfRules: {},
        },
        {
          columnName: 'POSTAL',
          displayName: 'Address 1',
          obfStrategy: 'RANDOMIZE',
          obfRules: {
            first: 'NUMERIC',
            second: '6',
          },
        },
        {
          columnName: 'HOUSE_TYPE',
          displayName: 'House Type',
          obfStrategy: undefined,
          obfRules: {},
        },
        {
          columnName: 'GEO_CODE',
          displayName: 'Geo Code',
          obfStrategy: undefined,
          obfRules: {},
        },
        {
          columnName: 'IN_CITY_LIMIT',
          displayName: 'In City Limit',
          obfStrategy: undefined,
          obfRules: {},
        },
        {
          columnName: 'STATE',
          displayName: 'State',
          obfStrategy: 'REPLACE_WITH_CONSTANT',
          obfRules: {
            first: 'CA',
            second: undefined,
          },
        },
        {
          columnName: 'COUNTRY',
          displayName: 'Country',
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
          columnName: 'PER_ADDR_ID',
          displayName: 'Person Address ID',
          obfStrategy: undefined,
          obfRules: {},
        },
      ],
    },

    {
      tableName: 'CI_PER_ID',
      columns: [
        {
          columnName: 'PER_ID',
          displayName: 'Per Id',
          obfStrategy: undefined,
          obfRules: {},
        },
        {
          columnName: 'ID_TYPE_CD',
          displayName: 'ID Type CD',
          obfStrategy: undefined,
          obfRules: {},
        },
        {
          columnName: 'PER_ID_NBR',
          displayName: 'Per Id NBR',
          obfStrategy: undefined,
          obfRules: {},
        },
        {
          columnName: 'PRIM_SW',
          displayName: 'Prime SW',
          obfStrategy: undefined,
          obfRules: {},
        },
        {
          columnName: 'VERSION',
          displayName: 'Version',
          obfStrategy: undefined,
          obfRules: {},
        },
      ],
    },
    {
      tableName: 'CI_PER_CHAR',
      columns: [
        {
          columnName: 'PER_ID',
          displayName: 'Per Id',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CHAR_TYPE_CD',
          displayName: 'Char Type CD',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CHAR_VAL',
          displayName: 'Char Val',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'EFFDT',
          displayName: 'Effdt',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'ADHOC_CHAR_VAL',
          displayName: 'Adhoc Char Val',
          isExpandable: true,
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
          selectedOnCondition: 'CHAR_TYPE_CD',
          selectedOperator: '<',
          selectedValue: 'CM-GENDR',
          selectedObfStrategy: 'STARIFY',
          selectedObfRule: 'R',
          inputValue: '3',
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
          columnName: 'CHAR_VAL_FK1',
          displayName: 'Character Value FK 2',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CHAR_VAL_FK2',
          displayName: 'Character Value FK 2',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CHAR_VAL_FK3',
          displayName: 'Character Value FK 3',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CHAR_VAL_FK4',
          displayName: 'Character Value FK 4',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CHAR_VAL_FK5',
          displayName: 'Character Value FK 5',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
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
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'LANGUAGE_CD',
          displayName: 'Language Code',
          obfStrategy: 'REPLACE_WITH_CONSTANT',
          obfRules: {
            first: 'ENG',
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
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
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
          obfStrategy: 'FAKER',
          obfRules: {
            first: 'ADDRESS',
            second: undefined,
          },
        },
        {
          columnName: 'ADDRESS2',
          displayName: 'Address 2',
          obfStrategy: 'FAKER',
          obfRules: {
            first: 'ADDRESS',
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
          obfStrategy: 'STARIFY',
          obfRules: {
            first: 'L',
            second: '3',
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
          obfStrategy: 'RANDOMIZE',
          obfRules: {
            first: 'NUMERIC',
            second: '5',
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
          obfStrategy: 'REPLACE_WITH_CONSTANT',
          obfRules: {
            first: 'CA',
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
          displayName: 'Recv Mktg Info Flag',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'WEB_PASSWD',
          displayName: 'Web Password ',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'WEB_PWD_HINT_FLG',
          displayName: 'Web Pwd Hint Flg ',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'WEB_PASSWD_ANS',
          displayName: 'Web Passwd Ans',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'PER_DATA_AREA',
          displayName: 'Per Data Area',
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
            first: 'FULL_NAME',
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
      tableName: 'CI_PER_ID',
      columns: [
        {
          columnName: 'PER_ID',
          displayName: 'Per Id',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'ID_TYPE_CD',
          displayName: 'ID Type CD',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'PER_ID_NBR',
          displayName: 'Per Id NBR',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'PRIM_SW',
          displayName: 'Prime SW',
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
          columnName: 'ENCR_PER_ID_NBR',
          displayName: 'Character Value FK 5',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'HASH_PER_ID_NBR',
          displayName: 'Character Value FK 5',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
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
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'PER_ID',
          displayName: 'PER_ID',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'COMM_RTE_TYPE_CD',
          displayName: 'COMM_RTE_TYPE_CD',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CONTACT_VALUE',
          displayName: 'CONTACT_VALUE',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CND_PRIMARY_FLAG',
          displayName: 'CND_PRIMARY_FLAG',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CONTACT_VALUE_EXT',
          displayName: 'CONTACT_VALUE_EXT',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'DND_START_TM',
          displayName: 'DND_START_TM',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'DND_END_TM',
          displayName: 'DND_END_TM',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CND_VERIFY_STATUS_FLAG',
          displayName: 'CND_VERIFY_STATUS_FLAG',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CND_ACTINACT_FLG',
          displayName: 'CND_ACTINACT_FLG',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CONTACT_NAME',
          displayName: 'CONTACT_NAME',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'VERSION',
          displayName: 'VERSION',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
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
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CHAR_TYPE_CD',
          displayName: 'Char Type CD',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CHAR_VAL',
          displayName: 'Char Val',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'EFFDT',
          displayName: 'Effdt',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'ADHOC_CHAR_VAL',
          displayName: 'Adhoc Char Val',
          isExpandable: true,
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
          selectedOnCondition: 'CHAR_TYPE_CD',
          selectedOperator: '<',
          selectedValue: 'CM-GENDR',
          selectedObfStrategy: 'STARIFY',
          selectedObfRule: 'R',
          inputValue: '3',
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
          columnName: 'CHAR_VAL_FK1',
          displayName: 'Character Value FK 2',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CHAR_VAL_FK2',
          displayName: 'Character Value FK 2',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CHAR_VAL_FK3',
          displayName: 'Character Value FK 3',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CHAR_VAL_FK4',
          displayName: 'Character Value FK 4',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
          },
        },
        {
          columnName: 'CHAR_VAL_FK5',
          displayName: 'Character Value FK 5',
          obfStrategy: undefined,
          obfRules: {
            first: undefined,
            second: undefined,
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
export class ObfusactionTableDataService {
  constructor() {}
}
