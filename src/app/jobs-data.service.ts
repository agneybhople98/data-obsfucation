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
  filter,
  take,
  switchMap,
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
  obsfucationControlDescription: string;
}

// Utility Data

const ELEMENT_DATA: JobElement[] = [
  {
    jobId: 'RUN-98765',
    jobName: 'Utility Account Obfuscation – Non-Prod',
    jobDescription:
      'Obfuscate utility accounts for non-production environments.',
    triggeredOn: (() => {
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
    status: 'in-progress',
    obsfucationControlName: 'Utility Account Obfuscation',
    progress: 0,
    tasks: [
      {
        taskId: 'TASK-55678900',
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
        taskId: 'TASK-55678901',
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
        taskId: 'TASK-55678902',
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
        message: [
          { name: 'FAKER applied on EMAILID column.' },
          { name: 'STARIFY applied on CITY column.' },
          { name: 'FAKER applied on ADDRESS column.' },
          { name: 'REPLACE_WITH_CONSTANT applied on LANGUAGE_CD column.' },
          { name: 'RANDOMIZE applied on POSTAL column.' },
        ],
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
        message: [{ name: 'FAKER applied on  ADDRESS1 column.' }],
      },
      {
        taskId: 'TASK-55678905',
        taskDescription: "MaskTable-'C1_ADDRESS'",
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
        message: [
          { name: 'FAKER applied on ADDRESS1 column.' },
          {
            name: 'RANDOMIZE applied on POSTAL column.',
          },
          {
            name: 'REPLACE_WITH_CONSTANT applied on CITY column.',
          },
          {
            name: 'REPLACE_WITH_CONSTANT applied on STATE column.',
          },
        ],
      },
      {
        taskId: 'TASK-55678906',
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
        message: [{ name: 'FAKER applied on  FULLNAME column.' }],
      },
      {
        taskId: 'TASK-55678907',
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
        message: [{ name: 'FAKER applied on  PHONE column.' }],
      },
    ],
  },
  {
    jobId: 'RUN-98764',
    jobName: 'Financial Data Masking – Utility Systems',
    jobDescription:
      'Mask utility financial data for safe use in test and development environments.',
    triggeredOn: '28/04/2025 07:33:22AM',
    status: 'failed',
    obsfucationControlName: 'Financial Data Masking',
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
        taskId: 'TASK-55678900',
        taskDescription: "MaskTable-'CI_PER_Name'",
        status: 'Failed',
        errorMessage:
          'RUN-98764, Table : CI_PER_Name, Column : EmailID,  SQL Error: ORA-00904: "EMAILID": invalid identifier`',
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
    jobName: 'Person Entity Anonymization – Pre-Prod',
    jobDescription: 'Anonymize persons for secure pre-production and testing.',
    triggeredOn: '25/04/2025 08:22:10AM',
    status: 'failed',
    obsfucationControlName: 'Person Entity Anonymization',
    progress: 50,
    tasks: [
      {
        taskId: 'TASK-55678190',
        taskDescription: 'Anonymizing addresses',
        status: 'Failed',
        errorMessage:
          'RUN-98763, SQL Error: ORA-00904: "EMAILID": invalid identifier`',
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
    jobName: 'Field Activity Data Obfuscation – Dev/Test',
    jobDescription: 'Obfuscate field activity data for development/test usage.',
    triggeredOn: '20/04/2025 08:11:09AM',
    status: 'success',
    obsfucationControlName: 'Field Activity Data Obfuscation',

    progress: 100,
    tasks: [
      {
        taskId: 'TASK-55678291',
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
    jobId: 'RUN-98761',
    jobName: 'Billing & Financial History Obfuscation',
    jobDescription: 'Obfuscates billing and financial history data.',
    triggeredOn: '15/04/2025 09:30:33AM',
    status: 'success',
    obsfucationControlName: 'Billing & Financial History',
    progress: 100,
    tasks: [
      {
        taskId: 'TASK-55678292',
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
    jobId: 'RUN-98760',
    jobName: 'Support Interaction Data Masking',
    jobDescription: 'Mask support tickets and customer interactions.',
    triggeredOn: '10/04/2025 09:30:33AM',
    status: 'success',
    obsfucationControlName: 'Support Interaction Data Masking',
    progress: 100,
    tasks: [
      {
        taskId: 'TASK-55675291',
        taskDescription: 'Substituting email addresses',
        status: 'Failed',
        errorMessage: `RUN-98760 'SQL Error: ORA-00904: "EMAILID": invalid identifier https://docs.oracle.com/error-help/db/ora-00904/00904. 00000 - "%s: invalid identifier"'`,
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
    jobId: 'RUN-98759',
    jobName: 'Outage Data Anonymization – Global Compliance',
    jobDescription:
      'Global anonymization of outage data for analytics, reporting, and compliance.',
    triggeredOn: '05/04/2025 09:30:33AM',
    status: 'success',
    obsfucationControlName: 'Outage Data Anonymization',
    progress: 100,
    tasks: [
      {
        taskId: 'TASK-55678091',
        taskDescription: 'Substituting email addresses',
        status: 'Failed',
        errorMessage: `RUN-98759 'SQL Error: ORA-00904: "EMAILID": invalid identifier https://docs.oracle.com/error-help/db/ora-00904/00904. 00000 - "%s: invalid identifier"'`,
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
    jobControlName: 'Utility Account Obfuscation – Non-Prod',
    jobControlDescription:
      'Obfuscate utility accounts for non-production environments.',
    lastTriggeredOn: (() => {
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
    obsfucationControlId: 'Utility Account Obfuscation',
    obsfucationControlDescription:
      'Obfuscate utility accounts for non-production environments.',
  },
  {
    jobControlId: 'JC-98764',
    jobControlName: 'Financial Data Masking – Utility Systems',
    jobControlDescription:
      'Mask utility financial data for safe use in test and development environments.',
    lastTriggeredOn: '28/04/2025 07:33:22AM',
    obsfucationControlId: 'Financial Data Masking',
    obsfucationControlDescription:
      'Mask utility financial data for safe use in test and development environments.',
  },
  {
    jobControlId: 'JC-98763',
    jobControlName: 'Person Entity Anonymization – Pre-Prod',
    jobControlDescription:
      'Anonymize persons for secure pre-production and testing.',
    lastTriggeredOn: '25/04/2025 08:11:09AM',
    obsfucationControlId: 'Person Entity Anonymization',
    obsfucationControlDescription:
      'Anonymize persons for secure pre-production and testing.',
  },
  {
    jobControlId: 'JC-98762',
    jobControlName: 'Field Activity Data Obfuscation – Dev/Test',
    jobControlDescription:
      'Obfuscate field activity data for development/test usage.',
    lastTriggeredOn: '20/04/2025 08:22:10AM',
    obsfucationControlId: 'Field Activity Data Obfuscation',
    obsfucationControlDescription:
      'Obfuscate field activity data for development/test usage.',
  },
  {
    jobControlId: 'JC-98761',
    jobControlName: 'Billing & Financial History Obfuscation',
    jobControlDescription: 'Obfuscates billing and financial history data.',
    lastTriggeredOn: '15/04/2025 09:30:33AM',
    obsfucationControlId: 'Billing & Financial History',
    obsfucationControlDescription:
      'Obfuscates billing and financial history data.',
  },
  {
    jobControlId: 'JC-98760',
    jobControlName: 'Support Interaction Data Masking',
    jobControlDescription: 'Mask support tickets and customer interactions.',
    lastTriggeredOn: '10/04/2025 09:30:33AM',
    obsfucationControlId: 'Support Interaction Data Masking',
    obsfucationControlDescription:
      'Mask support tickets and customer interactions.',
  },
  {
    jobControlId: 'JC-98759',
    jobControlName: 'Outage Data Anonymization – Global Compliance',
    jobControlDescription:
      'Global anonymization of outage data for analytics, reporting, and compliance.',
    lastTriggeredOn: '05/04/2025 09:30:33AM',
    obsfucationControlId: 'Outage Data Anonymization',
    obsfucationControlDescription:
      'Global anonymization of outage data for analytics, reporting, and compliance.',
  },
];

// Healthcare Data

const ELEMENT_DATA_HEALTHCARE: JobElement[] = [
  {
    jobId: 'RUN-98765',
    jobName: 'HC SvcData Obfuscation EU',
    jobDescription:
      'Obfuscates healthcare service records from EU regions for non-production environments.',
    triggeredOn: (() => {
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
    status: 'in-progress',
    obsfucationControlName: 'HC SvcData Obfuscation - EU',
    progress: 0,
    tasks: [
      {
        taskId: 'TASK-55678900',
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
        taskId: 'TASK-55678901',
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
        taskId: 'TASK-55678902',
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
        message: [
          { name: 'FAKER applied on EMAILID column.' },
          { name: 'STARIFY applied on CITY column.' },
          { name: 'FAKER applied on ADDRESS column.' },
          { name: 'REPLACE_WITH_CONSTANT applied on LANGUAGE_CD column.' },
          { name: 'RANDOMIZE applied on POSTAL column.' },
        ],
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
        message: [{ name: 'FAKER applied on  ADDRESS1 column.' }],
      },
      {
        taskId: 'TASK-55678905',
        taskDescription: "MaskTable-'C1_ADDRESS'",
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
        message: [
          { name: 'FAKER applied on ADDRESS1 column.' },
          {
            name: 'RANDOMIZE applied on POSTAL column.',
          },
          {
            name: 'REPLACE_WITH_CONSTANT applied on CITY column.',
          },
          {
            name: 'REPLACE_WITH_CONSTANT applied on STATE column.',
          },
        ],
      },
      {
        taskId: 'TASK-55678906',
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
        message: [{ name: 'FAKER applied on  FULLNAME column.' }],
      },
      {
        taskId: 'TASK-55678907',
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
        message: [{ name: 'FAKER applied on  PHONE column.' }],
      },
    ],
  },
  {
    jobId: 'RUN-98764',
    jobName: 'Insurance Claims Obfuscation',
    jobDescription:
      'Masks insurance claims data for safe use in test and development environements.',
    triggeredOn: '28/04/2025 07:33:22AM',
    status: 'failed',
    obsfucationControlName: 'Insurance Claims Obfuscation',
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
        taskId: 'TASK-55678900',
        taskDescription: "MaskTable-'CI_PER_Name'",
        status: 'Failed',
        errorMessage:
          'RUN-98764, Table : CI_PER_Name, Column : EmailID,  SQL Error: ORA-00904: "EMAILID": invalid identifier`',
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
    jobName: 'HC Provider TestDB',
    jobDescription:
      'Anonymizes healthcare provider database for secure pre-production and testing.',
    triggeredOn: '25/04/2025 08:22:10AM',
    status: 'failed',
    obsfucationControlName: 'HC Provider TestDB Obfuscation',
    progress: 50,
    tasks: [
      {
        taskId: 'TASK-55678190',
        taskDescription: 'Anonymizing addresses',
        status: 'Failed',
        errorMessage:
          'RUN-98763 `SQL Error: ORA-00904: "EMAILID": invalid identifier`',
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
    jobName: 'HC SvcData Obfuscation AUS',
    jobDescription:
      'Obfuscates healthcare service data from Australia for dev/test usage.',
    triggeredOn: '20/04/2025 08:11:09AM',
    status: 'success',
    obsfucationControlName: 'HC SvcData Obfuscation - AUS',

    progress: 100,
    tasks: [
      {
        taskId: 'TASK-55678291',
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
    jobId: 'RUN-98761',
    jobName: 'InsurancePolicy Obf US',
    jobDescription:
      'Obfuscates insurance policyholder details in U.S. policy DBs.',
    triggeredOn: '15/04/2025 09:30:33AM',
    status: 'success',
    obsfucationControlName: 'Insurance Policy Obfuscation - US',
    progress: 100,
    tasks: [
      {
        taskId: 'TASK-55678292',
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
    jobId: 'RUN-98760',
    jobName: 'OutageReports Global Data',
    jobDescription:
      'Global anonymization of outage data for analytics, reporting, and compliance.',
    triggeredOn: '10/04/2025 09:30:33AM',
    status: 'success',
    obsfucationControlName: 'Outage Reports Obfuscation - Global',
    progress: 100,
    tasks: [
      {
        taskId: 'TASK-55675291',
        taskDescription: 'Substituting email addresses',
        status: 'Failed',
        errorMessage: `RUN-98760 'SQL Error: ORA-00904: "EMAILID": invalid identifier https://docs.oracle.com/error-help/db/ora-00904/00904. 00000 - "%s: invalid identifier"'`,
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
    jobId: 'RUN-98759',
    jobName: 'Patient Master Prod EU',
    jobDescription:
      'Patient Master system - Production environment for the EU region',
    triggeredOn: '05/04/2025 09:30:33AM',
    status: 'success',
    obsfucationControlName: 'Patient Master Prod Obfuscation - EU',
    progress: 100,
    tasks: [
      {
        taskId: 'TASK-55678091',
        taskDescription: 'Substituting email addresses',
        status: 'Failed',
        errorMessage: `RUN-98759 'SQL Error: ORA-00904: "EMAILID": invalid identifier https://docs.oracle.com/error-help/db/ora-00904/00904. 00000 - "%s: invalid identifier"'`,
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

const ELEMENT_DATA_JOB_CONTROL_HEALTHCARE: JobDataControlElement[] = [
  {
    jobControlId: 'JC-98765',
    jobControlName: 'HC SvcData Obfuscation EU',
    jobControlDescription:
      'Obfuscates healthcare service records from EU regions for non-production environments.',
    lastTriggeredOn: (() => {
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
    obsfucationControlId: 'HC SvcData Obfuscation - EU',
    obsfucationControlDescription:
      'Obfuscates healthcare service records from EU regions for non-production environments.',
  },
  {
    jobControlId: 'JC-98764',
    jobControlName: 'Insurance Claims Obfuscation',
    jobControlDescription:
      'Masks insurance claims data for safe use in test and development environements.',
    lastTriggeredOn: '28/04/2025 07:33:22AM',
    obsfucationControlId: 'Insurance Claims Obfuscation',
    obsfucationControlDescription:
      'Masks insurance claims data for safe use in test and development environements.',
  },
  {
    jobControlId: 'JC-98763',
    jobControlName: 'HC Provider TestDB',
    jobControlDescription:
      'Anonymizes healthcare provider database for secure pre-production and testing.',
    lastTriggeredOn: '25/04/2025 08:11:09AM',
    obsfucationControlId: 'HC Provider TestDB Obfuscation',
    obsfucationControlDescription:
      'Anonymizes healthcare provider database for secure pre-production and testing.',
  },
  {
    jobControlId: 'JC-98762',
    jobControlName: 'HC SvcData Obfuscation AUS',
    jobControlDescription:
      'Obfuscates healthcare service data from Australia for dev/test usage.',
    lastTriggeredOn: '20/04/2025 08:22:10AM',
    obsfucationControlId: 'HC SvcData Obfuscation - AUS',
    obsfucationControlDescription:
      'Obfuscates healthcare service data from Australia for dev/test usage.',
  },
  {
    jobControlId: 'JC-98761',
    jobControlName: 'InsurancePolicy Obf US',
    jobControlDescription:
      'Obfuscates insurance policyholder details in U.S. policy DBs.',
    lastTriggeredOn: '15/04/2025 09:30:33AM',
    obsfucationControlId: 'Insurance Policy Obfuscation - US',
    obsfucationControlDescription:
      'Obfuscates insurance policyholder details in U.S. policy DBs.',
  },
  {
    jobControlId: 'JC-98760',
    jobControlName: 'OutageReports Global Data',
    jobControlDescription:
      'Global anonymization of outage data for analytics, reporting, and compliance.',
    lastTriggeredOn: '10/04/2025 09:30:33AM',
    obsfucationControlId: 'Outage Reports Obfuscation - Global',
    obsfucationControlDescription:
      'Global anonymization of outage data for analytics, reporting, and compliance.',
  },
  {
    jobControlId: 'JC-98759',
    jobControlName: 'Patient Master Prod EU',
    jobControlDescription:
      'Patient Master system - Production environment for the EU region',
    lastTriggeredOn: '05/04/2025 09:30:33AM',
    obsfucationControlId: 'Patient Master Prod Obfuscation - EU',
    obsfucationControlDescription:
      'Patient Master system - Production environment for the EU region.',
  },
];

@Injectable({
  providedIn: 'root',
})
export class JobsDataService {
  private apiUrl = 'https://do-be.demo.riaproducts.com/api/dih/run-job';
  private jobsDataSubject = new BehaviorSubject<JobElement[]>([]);
  private jobsDataControlData = new BehaviorSubject<JobDataControlElement[]>(
    []
  );

  jobsData$ = this.jobsDataSubject.asObservable();

  constructor(private http: HttpClient) {
    // Initialize with utility data by default
    this.initializeUtilityData();
  }

  initializeUtilityData() {
    this.jobsDataSubject.next(ELEMENT_DATA);
    this.jobsDataControlData.next(ELEMENT_DATA_JOB_CONTROL);
  }

  initializeHealthcareData() {
    this.jobsDataSubject.next(ELEMENT_DATA_HEALTHCARE);
    this.jobsDataControlData.next(ELEMENT_DATA_JOB_CONTROL_HEALTHCARE);
  }

  resetJobData() {
    this.jobsDataSubject.next([]);
  }

  getJobById(jobId: string): any {
    const jobs = this.jobsDataSubject.value;
    return jobs.find((job) => job.jobId === jobId);
  }

  getAllJobs(): JobElement[] {
    return this.jobsDataSubject.value;
  }

  getAllJobControlData(): JobDataControlElement[] {
    return this.jobsDataControlData.value;
  }

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

    const updatedJobs = [...currentJobs];
    const job = { ...updatedJobs[jobIndex] };
    const tasks = [...job.tasks];

    if (taskIndex > 0) {
      const previousTask = tasks[taskIndex - 1];
      if (previousTask.status !== 'Completed') {
        return job;
      }
    }

    const task = { ...tasks[taskIndex] };

    const startDate = new Date();
    task.startTime = this.formatDate(startDate);
    task.status = 'In Progress';

    setTimeout(() => {
      task.status = 'Completed';
      const endDate = new Date(startDate.getTime() + 4000);
      task.endTime = this.formatDate(endDate);

      tasks[taskIndex] = task;

      const completedTasks = tasks.filter(
        (t: any) => t.status === 'Completed'
      ).length;
      job.progress = Math.round((completedTasks / tasks.length) * 100);
      if (completedTasks === tasks.length) {
        job.status = 'success';
      }

      updatedJobs[jobIndex] = job;
      this.jobsDataSubject.next(updatedJobs);
    }, 300);

    tasks[taskIndex] = task;
    job.tasks = tasks;
    updatedJobs[jobIndex] = job;
    this.jobsDataSubject.next(updatedJobs);

    return job;
  }

  updateTasksSequentially(jobId: string): Observable<JobElement | undefined> {
    return this.jobsData$.pipe(
      filter((jobs) => jobs.length > 0),
      take(1), // only take the first non-empty emission
      switchMap(() => {
        const job = this.getJobById(jobId);
        if (!job || !job.tasks || job.tasks.length === 0) {
          return of(undefined);
        }

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

        const taskCount = job.tasks.length;
        const updateObservables: Observable<JobElement | undefined>[] = [];

        for (let i = 0; i < taskCount; i++) {
          const updateObservable = timer(400 * (i + 1)).pipe(
            map(() => this.updateSingleTaskStatus(jobId, i))
          );
          updateObservables.push(updateObservable);
        }

        return concat(...updateObservables);
      })
    );
  }

  runJobByName(jobName: string): Observable<any> {
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
