import { Injectable } from '@angular/core';
import {
  concat,
  map,
  Observable,
  of,
  timer,
  BehaviorSubject,
  tap,
  catchError,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface JobElement {
  jobId: string;
  jobName: any;
  jobDescription: string;
  triggeredOn: string;
  progress: number;
  status: 'success' | 'in-progress' | 'failed';
  obsfucationControlName: string;
  tasks: any;
}

export interface JobDataControlElement {
  jobControlId: string;
  jobControlName: any;
  jobControlDescription: string;
  lastTriggeredOn: string;
  obsfucationControlId: string;
}

const ELEMENT_DATA: JobElement[] = [
  {
    jobId: 'RUN-98765',
    jobName: 'HC_SvcData_Obf_EU',
    jobDescription:
      'Obfuscates healthcare service records from EU regions for non-production use.',
    triggeredOn: '04/01/2025 07:23:12AM',
    status: 'in-progress',
    obsfucationControlName: 'Healthcare service - Meta',
    progress: 0,
    tasks: [
      {
        taskId: 'TASK-78901234',
        taskDescription: 'CopySchemaAndData',
        status: 'In Progress',
        // Format the startTime consistently with endTime
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: [
          {
            name: 'Copy Schema And Data is Successful',
          },
        ],
      },
      {
        taskId: 'TASK-20547689',
        taskDescription: 'CreateProceduresAndFunctions',
        status: 'In Progress',
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: [
          {
            name: 'Create Procedures And Functions is Successful',
          },
        ],
      },
      {
        taskId: 'TASK-30982345',
        taskDescription: 'CreateMaskingScript',
        status: 'In Progress',
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: [{ name: 'Create Masking Script is Successful' }],
      },
      {
        taskId: 'TASK-55678901',
        taskDescription: "MaskTable-'CI_CUSTOMERS'",
        status: 'In Progress',
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: [
          { name: 'STARIFY applied on FIRST_NAME column.' },
          { name: 'RANDOMIZE applied on SSN column.' },
          { name: 'FAKER applied on EMAIL column. ' },
          { name: 'FAKER applied on SSN column.' },
          { name: 'FAKER applied on PHONE_NUMBER column.' },
        ],
      },
      {
        taskId: 'TASK-55678902',
        taskDescription: "MaskTable-'CI_ORDERS'",
        status: 'Failed',
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: [
          { name: 'STARIFY applied on PAYMENT_METHOD column.' },
          { name: 'FAKER applied on SHIPPING_ADDRESS column.' },
          { name: 'REPLACE_WITH_CONSTANT applied on STATUS column.' },
        ],
      },
      {
        taskId: 'TASK-55678903',
        taskDescription: "MaskTable-'CI_PER'",
        status: 'In Progress',
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: [{ name: 'FAKER applied on EMAILID column.' }],
      },
      {
        taskId: 'TASK-55678904',
        taskDescription: "MaskTable-'CI_PER_ADDR_SEAS'",
        status: 'Pending',
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: [{ name: 'FAKER applied on ENTITY_NAME column.' }],
      },
      {
        taskId: 'TASK-55678905',
        taskDescription: "MaskTable-'CI_PER_NAME'",
        status: 'Pending',
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: [{ name: 'FAKER applied on PHONE column.' }],
      },
      {
        taskId: 'TASK-55678905',
        taskDescription: "MaskTable-'CI_PER_PHONE'",
        status: 'Pending',
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: [{ name: 'FAKER applied on ADDRESS1 column.' }],
      },
    ],
  },
  {
    jobId: 'RUN-00123',
    jobName: 'Insurance_Claims_Obf',
    jobDescription:
      'Masks insurance claims data for safe use in test and development environments.',
    triggeredOn: '04/02/2025 07:33:22AM',
    status: 'failed',
    obsfucationControlName: 'Healthcare service - Meta',
    progress: 90,
    tasks: [
      {
        taskId: 'TASK-78901234',
        taskDescription: 'CopySchemaAndData',
        status: 'Completed',
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: [{ name: 'Copy Schema And Data is Successful' }],
      },
      {
        taskId: 'TASK-20547689',
        taskDescription: 'CreateProceduresAndFunctions',
        status: 'Completed',
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: [{ name: 'Create Procedures And Functions is Successful' }],
      },
      {
        taskId: 'TASK-30982345',
        taskDescription: 'CreateMaskingScript',
        status: 'Completed',
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: [{ name: 'Create Masking Script is Successful' }],
      },
      {
        taskId: 'TASK-55678901',
        taskDescription: "MaskTable-'CI_PER'",
        status: 'Completed',
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: [{ name: 'FAKER applied on EMAILID column.' }],
      },
      {
        taskId: 'TASK-12346',
        taskDescription: 'Encrypting social security numbers',
        status: 'Failed',
        errorMessage: '`SQL Error: ORA-00904: "EMAILID": invalid identifier`',
        message: [
          {
            name: 'SQL Error: ORA-00904: "EMAILID": invalid identifier https://docs.oracle.com/error-help/db/ora-00904/00904. 00000 - "%s: invalid identifier"',
          },
        ],
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
      },
    ],
  },
  {
    jobId: 'RUN-98763',
    jobName: 'HC_Provider_TestDB_Obf',
    jobDescription:
      'Anonymizes healthcare provider database for secure pre-production testing.',
    triggeredOn: '04/04/2025 08:22:10AM',
    status: 'failed',
    obsfucationControlName: 'Healthcare service - Meta',
    progress: 50,
    tasks: [
      {
        taskId: 'TASK-12347',
        taskDescription: 'Anonymizing addresses',
        status: 'Failed',
        errorMessage: '`SQL Error: ORA-00904: "EMAILID": invalid identifier`',
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: [
          {
            name: 'SQL Error: ORA-00904: "EMAILID": invalid identifier https://docs.oracle.com/error-help/db/ora-00904/00904. 00000 - "%s: invalid identifier"',
          },
        ],
      },
    ],
  },
  {
    jobId: 'RUN-98764',
    jobName: 'HC_SvcData_Obf_AUS',
    jobDescription:
      'Obfuscates healthcare service data from Australia for dev/test usage.',
    triggeredOn: '04/03/2025 08:11:09AM',
    status: 'success',
    obsfucationControlName: 'Healthcare service - Meta',

    progress: 100,
    tasks: [
      {
        taskId: 'TASK-12349',
        taskDescription: 'Masking phone numbers',
        status: 'Completed',
        errorMessage: null,
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: [{ name: 'Masking phone numbers is Successful' }],
      },
    ],
  },
  {
    jobId: 'RUN-98762',
    jobName: 'Patient_Demographics_Obf_EU',
    jobDescription:
      'Masks master patient demographic data for EU compliance and test use.',
    triggeredOn: '04/05/2025 09:30:33AM',
    status: 'success',
    obsfucationControlName: 'Healthcare service - Meta',
    progress: 100,
    tasks: [
      {
        taskId: 'TASK-12350',
        taskDescription: 'Shuffling demographic data',
        status: 'Completed',
        errorMessage: null,
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: [{ name: 'Shuffling demographic data is Successful' }],
      },
    ],
  },
  {
    jobId: 'RUN-98762',
    jobName: 'CoreBanking_Customer_Obf_EU',
    jobDescription:
      'Masks customer data in core banking systems for EU compliance testing.',
    triggeredOn: '04/05/2025 09:30:33AM',
    status: 'success',
    obsfucationControlName: 'Healthcare service - Meta',
    progress: 100,
    tasks: [
      {
        taskId: 'TASK-12351',
        taskDescription: 'Substituting email addresses',
        status: 'Failed',
        errorMessage: `'SQL Error: ORA-00904: "EMAILID": invalid identifier https://docs.oracle.com/error-help/db/ora-00904/00904. 00000 - "%s: invalid identifier"'`,
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: [
          {
            name: 'SQL Error: ORA-00904: "EMAILID": invalid identifier https://docs.oracle.com/error-help/db/ora-00904/00904. 00000 - "%s: invalid identifier"',
          },
        ],
      },
    ],
  },
  {
    jobId: 'RUN-98762',
    jobName: 'CreditCardTxn_Archive_Obf',
    jobDescription:
      'Historic credit card transaction anonymization for analytical workloads.',
    triggeredOn: '04/05/2025 09:30:33AM',
    status: 'success',
    obsfucationControlName: 'Healthcare service - Meta',
    progress: 100,
    tasks: [
      {
        taskId: 'TASK-12351',
        taskDescription: 'Substituting email addresses',
        status: 'Failed',
        errorMessage: `'SQL Error: ORA-00904: "EMAILID": invalid identifier https://docs.oracle.com/error-help/db/ora-00904/00904. 00000 - "%s: invalid identifier"'`,
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: 'SQL Log: Cloning Schema is Successful',
      },
    ],
  },
  {
    jobId: 'RUN-98761',
    jobName: 'InsurancePolicy_Obf_US',
    jobDescription:
      'Obfuscates insurance policyholder details in U.S. policy DBs.',
    triggeredOn: '04/05/2025 09:30:33AM',
    status: 'success',
    obsfucationControlName: 'Healthcare service - Meta',
    progress: 100,
    tasks: [
      {
        taskId: 'TASK-12351',
        taskDescription: 'Substituting email addresses',
        status: 'Failed',
        errorMessage: `'SQL Error: ORA-00904: "EMAILID": invalid identifier https://docs.oracle.com/error-help/db/ora-00904/00904. 00000 - "%s: invalid identifier"'`,
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: 'SQL Log: Cloning Schema is Successful',
      },
    ],
  },
  {
    jobId: 'RUN-98760',
    jobName: 'UtilityBilling_Obf_AUS',
    jobDescription:
      'Obfuscates billing and customer data in Australian utility systems.',
    triggeredOn: '04/05/2025 09:30:33AM',
    status: 'success',
    obsfucationControlName: 'Healthcare service - Meta',
    progress: 100,
    tasks: [
      {
        taskId: 'TASK-12351',
        taskDescription: 'Substituting email addresses',
        status: 'Failed',
        errorMessage: `'SQL Error: ORA-00904: "EMAILID": invalid identifier https://docs.oracle.com/error-help/db/ora-00904/00904. 00000 - "%s: invalid identifier"'`,
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: 'SQL Log: Cloning Schema is Successful',
      },
    ],
  },
  {
    jobId: 'RUN-98759',
    jobName: 'CustomerSupport_Utility_Obf_US',
    jobDescription:
      'Masks support tickets and customer interactions in U.S. utility CRM systems.',
    triggeredOn: '04/05/2025 09:30:33AM',
    status: 'success',
    obsfucationControlName: 'Healthcare service - Meta',
    progress: 100,
    tasks: [
      {
        taskId: 'TASK-12351',
        taskDescription: 'Substituting email addresses',
        status: 'Failed',
        errorMessage: `'SQL Error: ORA-00904: "EMAILID": invalid identifier https://docs.oracle.com/error-help/db/ora-00904/00904. 00000 - "%s: invalid identifier"'`,
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: 'SQL Log: Cloning Schema is Successful',
      },
    ],
  },
  {
    jobId: 'RUN-98758',
    jobName: 'OutageReports_Obf_Global',
    jobDescription:
      'Global anonymization of outage data for analytics, reporting, and compliance.',
    triggeredOn: '04/05/2025 09:30:33AM',
    status: 'success',
    obsfucationControlName: 'Healthcare service - Meta',
    progress: 100,
    tasks: [
      {
        taskId: 'TASK-12351',
        taskDescription: 'Substituting email addresses',
        status: 'Failed',
        errorMessage: `'SQL Error: ORA-00904: "EMAILID": invalid identifier https://docs.oracle.com/error-help/db/ora-00904/00904. 00000 - "%s: invalid identifier"'`,
        startTime: (() => {
          const date = new Date();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
        })(),
        endTime: null,
        message: 'SQL Log: Cloning Schema is Successful',
      },
    ],
  },
];

const ELEMENT_DATA_JOB_CONTROL: JobDataControlElement[] = [
  {
    jobControlId: 'JC-98765',
    jobControlName: 'HC_SvcData_Obf_EU',
    jobControlDescription:
      'Obfuscates healthcare service records from EU regions for non-production use.',
    lastTriggeredOn: '04/01/2025 07:23:12AM',
    obsfucationControlId: 'OC-98765',
  },
  {
    jobControlId: 'JC-00123',
    jobControlName: 'Insurance_Claims_Obf',
    jobControlDescription:
      'Masks insurance claims data for safe use in test and development environments.',
    lastTriggeredOn: '04/02/2025 07:33:22AM',
    obsfucationControlId: 'OC-32455',
  },
  {
    jobControlId: 'JC-98764',
    jobControlName: 'HC_Provider_TestDB_Obf',
    jobControlDescription:
      'Anonymizes healthcare provider database for secure pre-production testing.',
    lastTriggeredOn: '04/03/2025 08:11:09AM',
    obsfucationControlId: 'OC-23455',
  },
  {
    jobControlId: 'JC-98763',
    jobControlName: 'HC_SvcData_Obf_AUS',
    jobControlDescription:
      'Obfuscates healthcare service data from Australia for dev/test usage.',
    lastTriggeredOn: '04/04/2025 08:22:10AM',
    obsfucationControlId: 'OC-23445',
  },
  {
    jobControlId: 'JC-98762',
    jobControlName: 'Patient_Demographics_Obf_EU',
    jobControlDescription:
      'Masks master patient demographic data for EU compliance and test use.',
    lastTriggeredOn: '04/05/2025 09:30:33AM',
    obsfucationControlId: 'OC-65577',
  },
  {
    jobControlId: 'JC-98762',
    jobControlName: 'CoreBanking_Customer_Obf_EU',
    jobControlDescription:
      'Masks customer data in core banking systems for EU compliance testing.',
    lastTriggeredOn: '04/05/2025 09:30:33AM',
    obsfucationControlId: 'OC-67890',
  },
  {
    jobControlId: 'JC-98762',
    jobControlName: 'CreditCardTxn_Archive_Obf',
    jobControlDescription:
      'Historic credit card transaction anonymization for analytical workloads.',
    lastTriggeredOn: '04/05/2025 09:30:33AM',
    obsfucationControlId: 'OC-45456',
  },
  {
    jobControlId: 'JC-98762',
    jobControlName: 'InsurancePolicy_Obf_US',
    jobControlDescription:
      'Obfuscates insurance policyholder details in U.S. policy DBs.',
    lastTriggeredOn: '04/05/2025 09:30:33AM',
    obsfucationControlId: 'OC-43234',
  },
  {
    jobControlId: 'JC-98762',
    jobControlName: 'UtilityBilling_Obf_AUS',
    jobControlDescription:
      'Obfuscates billing and customer data in Australian utility systems.',
    lastTriggeredOn: '04/05/2025 09:30:33AM',
    obsfucationControlId: 'OC-43230',
  },
  {
    jobControlId: 'JC-98762',
    jobControlName: 'CustomerSupport_Utility_Obf_US',
    jobControlDescription:
      'Masks support tickets and customer interactions in U.S. utility CRM systems.',
    lastTriggeredOn: '04/05/2025 09:30:33AM',
    obsfucationControlId: 'OC-43229',
  },
  {
    jobControlId: 'JC-98762',
    jobControlName: 'OutageReports_Obf_Global',
    jobControlDescription:
      'Global anonymization of outage data for analytics, reporting, and compliance.',
    lastTriggeredOn: '04/05/2025 09:30:33AM',
    obsfucationControlId: 'OC-43227',
  },
];

@Injectable({
  providedIn: 'root',
})
export class JobsDataService {
  private apiUrl =
    'https://merry-measured-trout.ngrok-free.app/api/dih/run-job';
  private jobsDataSubject = new BehaviorSubject<JobElement[]>(ELEMENT_DATA);
  private jobsDataControlData = new BehaviorSubject<JobDataControlElement[]>(
    ELEMENT_DATA_JOB_CONTROL
  );

  // private jobsDataControlData: JobDataControlElement[] =
  //   ELEMENT_DATA_JOB_CONTROL;

  // Observable to subscribe to job data changes
  jobsData$ = this.jobsDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  resetJobData() {
    this.jobsDataSubject.next(JSON.parse(JSON.stringify(ELEMENT_DATA)));
  }

  getJobById(jobId: string): JobElement | undefined {
    return this.jobsDataSubject.value.find((job) => job.jobId === jobId);
  }

  getAllJobs(): JobElement[] {
    return this.jobsDataSubject.value;
  }

  getAllJobControlData(): JobDataControlElement[] {
    return this.jobsDataControlData.value;
  }

  /**
   * Updates a single task status to "Completed"
   * @param jobId The ID of the job containing the task
   * @param taskIndex The index of the task in the tasks array
   * @returns The updated job if successful, undefined otherwise
   */
  private updateSingleTaskStatus(
    jobId: string,
    taskIndex: number
  ): JobElement | undefined {
    const currentJobs = this.jobsDataSubject.value;
    const jobIndex = currentJobs.findIndex((job) => job.jobId === jobId);

    if (
      jobIndex === -1 ||
      !currentJobs[jobIndex].tasks ||
      taskIndex >= currentJobs[jobIndex].tasks.length
    ) {
      return undefined;
    }

    // Create a new array with the updated job
    const updatedJobs = [...currentJobs];
    const job = { ...updatedJobs[jobIndex] };
    const tasks = [...job.tasks];

    // Only proceed if previous task is completed or this is the first task
    if (taskIndex > 0) {
      const previousTask = tasks[taskIndex - 1];
      if (previousTask.status !== 'Completed') {
        return job;
      }
    }

    const task = { ...tasks[taskIndex] };

    // Set start time for current task with current time
    const startDate = new Date();
    task.startTime = this.formatDate(startDate);
    task.status = 'In Progress';

    // After a delay, mark as completed and set end time
    setTimeout(() => {
      task.status = 'Completed';
      // Add 3 seconds to the start time for the end time
      const endDate = new Date(startDate.getTime() + 3000);
      task.endTime = this.formatDate(endDate);

      tasks[taskIndex] = task;

      // Update job progress
      const completedTasks = tasks.filter(
        (t: any) => t.status === 'Completed'
      ).length;
      job.progress = Math.round((completedTasks / tasks.length) * 100);
      if (completedTasks === tasks.length) {
        job.status = 'success';
      }

      updatedJobs[jobIndex] = job;
      this.jobsDataSubject.next(updatedJobs);
    }, 200);

    tasks[taskIndex] = task;
    job.tasks = tasks;
    updatedJobs[jobIndex] = job;
    this.jobsDataSubject.next(updatedJobs);

    return job;
  }

  /**
   * Updates task statuses one by one with a 1-second interval between each update
   * @param jobId The ID of the job containing the tasks
   * @returns An Observable that emits the updated job after each task update
   */
  updateTasksSequentially(jobId: string): Observable<JobElement | undefined> {
    const job = this.getJobById(jobId);
    if (!job || !job.tasks || job.tasks.length === 0) {
      return of(undefined);
    }

    // Reset all task times and status
    const currentJobs = [...this.jobsDataSubject.value];
    const jobIndex = currentJobs.findIndex((j) => j.jobId === jobId);
    if (jobIndex !== -1) {
      const updatedJob = { ...currentJobs[jobIndex] };
      updatedJob.tasks = updatedJob.tasks.map((task: any) => ({
        ...task,
        startTime: undefined,
        endTime: null,
      }));
      updatedJob.status = 'in-progress';
      updatedJob.progress = 0;
      currentJobs[jobIndex] = updatedJob;
      this.jobsDataSubject.next(currentJobs);
    }

    // Create an array of observables, each updating one task after a delay
    const taskCount = job.tasks.length;
    const updateObservables: Observable<JobElement | undefined>[] = [];

    for (let i = 0; i < taskCount; i++) {
      const updateObservable = timer(300 * (i + 1)).pipe(
        map(() => this.updateSingleTaskStatus(jobId, i))
      );
      updateObservables.push(updateObservable);
    }

    return concat(...updateObservables);
  }

  // Move this method to job service where you will have all the REST API
  runJobByName(
    jobName: string = 'OBF_EXECUTE_MAIN_JOB_ARCHDEV'
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}?jobName=${jobName}`, {}).pipe(
      tap((response) => console.log('Job run response:', response)),
      catchError((error) => {
        console.error('Error running job:', error);
        throw error;
      })
    );
  }

  formatDate(date: any) {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
    const hours = d.getHours() % 12 || 12;
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const seconds = d.getSeconds().toString().padStart(2, '0');
    const ampm = d.getHours() >= 12 ? 'PM' : 'AM';

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
  }
}
