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
  subsetStrategyPlanName?: string;
  jobDescription: string;
  triggeredOn: string;
  progress: number;
  status: 'success' | 'in-progress' | 'failed';
  obsfucationControlName?: string;
  tasks: any;
  additionalRunIdDetails?: any;
}

export interface JobDataControlElement {
  jobControlId: string;
  jobControlName: any;
  subsetControlId?: string;
  API_NAME?: string;
  jobControlDescription: string;
  subsetPlanStrategyName?: string;
  lastTriggeredOn: string;
  obsfucationControlId?: string;
  obsfucationControlDescription: string;
}

// Utility Data

const ELEMENT_DATA: JobElement[] = [
  {
    jobId: 'RUN-98759',
    jobName: 'Outage Data Anonymization – Global Compliance',
    jobDescription:
      'Obfuscates claim headers and line items, including statuses and adjudication outcomes.',
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
  {
    jobId: 'RUN-98760',
    jobName: 'Support Interaction Data Masking',
    jobDescription: 'Mask support tickets and customer interactions.',
    triggeredOn: '10/04/2025 09:30:33AM',
    status: 'success',
    obsfucationControlName: 'Support Interaction Data Masking',
    progress: 50,
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
        message: [{ name: 'Obfuscating phone numbers successfull' }],
      },
    ],
  },
  {
    jobId: 'RUN-98763',
    jobName: 'Utility Account Obfuscation – Non-Prod',
    jobDescription:
      'Obfuscate utility accounts for non-production environments.',
    subsetStrategyPlanName: 'Utility Account Subset',
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
        taskDescription: 'CreateSubsetScript',
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
        taskDescription: 'CI_ACCT-Based Data Subsetting',
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

        message: [{ name: "Subsetting completed using 'CI_ACCT' root table'" }],
      },

      {
        taskId: 'TASK-55678904',
        taskDescription: "ObfuscateTable-'CI_PER'",
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
        recordsProcessed: 2000,
        message: [
          {
            name: 'FAKER applied on EMAILID column. ',
          },
          { name: 'STARIFY applied on CITY column.' },
          { name: 'FAKER applied on ADDRESS column.' },
          { name: 'REPLACE_WITH_CONSTANT applied on LANGUAGE_CD column.' },
          { name: 'RANDOMIZE applied on POSTAL column.' },
        ],
      },

      {
        taskId: 'TASK-55678905',
        taskDescription: "ObfuscateTable-'CI_PER_ADDR_SEAS'",
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
        recordsProcessed: 100,
        message: [{ name: 'FAKER applied on  ADDRESS1 column.' }],
      },

      {
        taskId: 'TASK-55678906',
        taskDescription: "ObfuscateTable-'CI_PER_CONTDET'",
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
        recordsProcessed: 1500,
        message: [
          {
            name: 'FAKER applied on  PHONE column.',
          },
        ],
      },
      {
        taskId: 'TASK-55678907',
        taskDescription: "ObfuscateTable-'CI_PER_NAME'",
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
        recordsProcessed: 1200,
        message: [{ name: 'FAKER applied on  ENTITY_NAME column.' }],
      },
      {
        taskId: 'TASK-55678908',
        taskDescription: "ObfuscateTable-'CI_PER_ID'",
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
        recordsProcessed: 20,
        message: [{ name: 'FAKER applied on CI_PER_ID column.' }],
      },
      {
        taskId: 'TASK-55678909',
        taskDescription: "ObfuscateTable-'CI_PER_CHAR'",
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
        recordsProcessed: 20,
        message: [
          { name: 'REPLACE_WITH_CONSTANT applied on CHAR_VAL column.' },
          {
            name: 'STARIFY, FAKER applied on ADHOC_CHAR_VAL column',
          },
        ],
      },
      // {
      //   taskId: 'TASK-55678907',
      //   taskDescription: "ObfuscateTable-'CI_PER_PHONE'",
      //   status: 'Pending',
      //   startTime: (() => {
      //     const date = new Date();
      //     const month = (date.getMonth() + 1).toString().padStart(2, '0');
      //     const day = date.getDate().toString().padStart(2, '0');
      //     const year = date.getFullYear();
      //     const hours = date.getHours() % 12 || 12;
      //     const minutes = date.getMinutes().toString().padStart(2, '0');
      //     const seconds = date.getSeconds().toString().padStart(2, '0');
      //     const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

      //     return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${ampm}`;
      //   })(),
      //   endTime: null,
      //   recordsProcessed: 900,
      //   message: [{ name: 'FAKER applied on  PHONE column.' }],
      // },
    ],
  },
  {
    jobId: 'RUN-98764',
    jobName: 'Person Entity Anonymization – Pre-Prod',
    jobDescription: 'Anonymize persons for secure pre-production and testing.',
    triggeredOn: '25/04/2025 08:22:10AM',
    status: 'failed',
    obsfucationControlName: 'Person Entity Anonymization',
    progress: 20,
    additionalRunIdDetails: [
      {
        jobId: 'RUN-98019',
        jobName: 'Person Entity Anonymization – Pre-Prod',
        jobDescription:
          'Anonymize persons for secure pre-production and testing.',
        triggeredOn: '03/04/2025 09:22:10AM',
        status: 'failed',
        obsfucationControlName: 'Person Entity Anonymization',
        progress: 30,

        tasks: [
          {
            taskId: 'TASK-55678904',
            taskDescription: "ObfuscateTable-'CI_PER'",
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
            recordsProcessed: 2000,
            message: [
              {
                name: 'FAKER applied on EMAILID column. ',
              },
              { name: 'STARIFY applied on CITY column.' },
              { name: 'FAKER applied on ADDRESS column.' },
              { name: 'REPLACE_WITH_CONSTANT applied on LANGUAGE_CD column.' },
              { name: 'RANDOMIZE applied on POSTAL column.' },
            ],
          },

          {
            taskId: 'TASK-55678905',
            taskDescription: "ObfuscateTable-'CI_PER_ADDR_SEAS'",
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
            recordsProcessed: 100,
            message: [{ name: 'FAKER applied on  ADDRESS1 column.' }],
          },

          {
            taskId: 'TASK-55678906',
            taskDescription: "ObfuscateTable-'CI_PER_CONTDET'",
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
            recordsProcessed: 1500,
            message: [
              {
                name: 'FAKER applied on  PHONE column.',
              },
            ],
          },
          {
            taskId: 'TASK-55678907',
            taskDescription: "ObfuscateTable-'CI_PER_NAME'",
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
            recordsProcessed: 1200,
            message: [{ name: 'FAKER applied on  ENTITY_NAME column.' }],
          },
          {
            taskId: 'TASK-55678908',
            taskDescription: "ObfuscateTable-'CI_PER_ID'",
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
            recordsProcessed: 20,
            message: [{ name: 'FAKER applied on CI_PER_ID column.' }],
          },
          {
            taskId: 'TASK-55678909',
            taskDescription: "ObfuscateTable-'CI_PER_CHAR'",
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
            recordsProcessed: 20,
            message: [
              { name: 'REPLACE_WITH_CONSTANT applied on CHAR_VAL column.' },
              {
                name: 'STARIFY, FAKER applied on ADHOC_CHAR_VAL column',
              },
            ],
          },
        ],
      },
    ],
    tasks: [
      {
        taskId: 'TASK-78901234',
        taskDescription: 'CopySchemaAndData',
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
        taskId: 'TASK-55678904',
        taskDescription: "ObfuscateTable-'CI_PER'",
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
        recordsProcessed: 2000,
        message: [
          {
            name: 'FAKER applied on EMAILID column. ',
          },
          { name: 'STARIFY applied on CITY column.' },
          { name: 'FAKER applied on ADDRESS column.' },
          { name: 'REPLACE_WITH_CONSTANT applied on LANGUAGE_CD column.' },
          { name: 'RANDOMIZE applied on POSTAL column.' },
        ],
      },

      {
        taskId: 'TASK-55678905',
        taskDescription: "ObfuscateTable-'CI_PER_ADDR_SEAS'",
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
        recordsProcessed: 100,
        message: [{ name: 'FAKER applied on  ADDRESS1 column.' }],
      },

      {
        taskId: 'TASK-55678906',
        taskDescription: "ObfuscateTable-'CI_PER_CONTDET'",
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
        recordsProcessed: 1500,
        message: [
          {
            name: 'FAKER applied on  PHONE column.',
          },
        ],
      },
      {
        taskId: 'TASK-55678907',
        taskDescription: "ObfuscateTable-'CI_PER_NAME'",
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
        recordsProcessed: 1200,
        message: [{ name: 'FAKER applied on  ENTITY_NAME column.' }],
      },
      {
        taskId: 'TASK-55678908',
        taskDescription: "ObfuscateTable-'CI_PER_ID'",
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
        recordsProcessed: 20,
        message: [{ name: 'FAKER applied on CI_PER_ID column.' }],
      },
      {
        taskId: 'TASK-55678909',
        taskDescription: "ObfuscateTable-'CI_PER_CHAR'",
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
        recordsProcessed: 20,
        message: [
          { name: 'REPLACE_WITH_CONSTANT applied on CHAR_VAL column.' },
          {
            name: 'STARIFY, FAKER applied on ADHOC_CHAR_VAL column',
          },
        ],
      },
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
    jobId: 'RUN-98765',
    jobName: 'Financial Data Masking – Utility Systems',
    jobDescription:
      'Mask utility financial data for safe use in test and development environments.',
    triggeredOn: '28/04/2025 07:33:22AM',
    subsetStrategyPlanName:
      'Financial Data Masking – Utility Systems Subset Plan',
    status: 'failed',
    // obsfucationControlName: 'Financial Data Masking',
    progress: 10,
    tasks: [
      {
        taskId: 'TASK-78901234',
        taskDescription: 'CopySchemaAndData',
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
        taskDescription: 'Create Subset Script',
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

        message: [{ name: 'Create Subset Script is Successful' }],
      },
      {
        taskId: 'TASK-55678903',
        taskDescription: 'CI_ACCT-Based Data Subsetting',
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

        message: [{ name: "Subsetting completed using 'CI_ACCT' root table'" }],
      },
    ],
  },
];

const ELEMENT_DATA_JOB_CONTROL: JobDataControlElement[] = [
  {
    jobControlId: 'JC-98765',
    subsetControlId: 'SP-98765',
    API_NAME: 'DO_EXEC_UTILITY_2_SS_JOB',
    jobControlName: 'Financial Data Masking – Utility Systems',
    jobControlDescription:
      'Mask utility financial data for safe use in test and development environments.',
    lastTriggeredOn: '28/04/2025 07:33:22AM',
    subsetPlanStrategyName: 'Financial Data Masking Subset',
    // obsfucationControlId: 'Financial Data Masking',
    obsfucationControlDescription:
      'Mask utility financial data for safe use in test and development environments.',
  },
  {
    jobControlId: 'JC-98764',
    subsetControlId: 'SP-98764',
    API_NAME: 'DO_EXEC_UTILITY_3_OBF_JOB',
    jobControlName: 'Person Entity Anonymization – Pre-Prod',
    jobControlDescription:
      'Anonymize persons for secure pre-production and testing.',
    lastTriggeredOn: '25/04/2025 08:11:09AM',
    // subsetPlanStrategyName: 'Person Entity Anonymization Subset',
    obsfucationControlId: 'Person Entity Anonymization',
    obsfucationControlDescription:
      'Anonymize persons for secure pre-production and testing.',
  },
  {
    jobControlId: 'JC-98763',
    subsetControlId: 'SP-98763',
    API_NAME: 'DO_EXEC_UTILITY_1_SS_OBF_JOB',
    jobControlName: 'Utility Account Obfuscation – Non-Prod',
    jobControlDescription:
      'Obfuscate utility accounts for non-production environments.',

    subsetPlanStrategyName: 'Utility Account Subset Plan',
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
    jobControlId: 'JC-98762',
    subsetControlId: 'SP-98762',
    API_NAME: 'OBF_EXECUTE_MAIN_JOB_CISADM',
    jobControlName: 'Field Activity Data Obfuscation – Dev/Test',
    jobControlDescription:
      'Obfuscate field activity data for development/test usage.',
    subsetPlanStrategyName: 'Field Activity Data Obfuscation Subset Plan',
    lastTriggeredOn: '20/04/2025 08:22:10AM',
    obsfucationControlId: 'Field Activity Data Obfuscation',
    obsfucationControlDescription:
      'Obfuscate field activity data for development/test usage.',
  },
  {
    jobControlId: 'JC-98761',
    subsetControlId: 'SP-98761',
    API_NAME: 'OBF_EXECUTE_MAIN_JOB_CISADM',
    jobControlName: 'Billing & Financial History Obfuscation',
    jobControlDescription: 'Obfuscates billing and financial history data.',
    lastTriggeredOn: '15/04/2025 09:30:33AM',
    obsfucationControlId: 'Billing & Financial History',
    obsfucationControlDescription:
      'Obfuscates billing and financial history data.',
  },
  {
    jobControlId: 'JC-98760',
    subsetControlId: 'SP-98760',
    API_NAME: 'OBF_EXECUTE_MAIN_JOB_CISADM',
    jobControlName: 'Support Interaction Data Masking',
    jobControlDescription: 'Mask support tickets and customer interactions.',
    lastTriggeredOn: '10/04/2025 09:30:33AM',
    obsfucationControlId: 'Support Interaction Data Masking',
    obsfucationControlDescription:
      'Mask support tickets and customer interactions.',
  },
  {
    jobControlId: 'JC-98759',
    subsetControlId: 'SP-98759',
    API_NAME: 'OBF_EXECUTE_MAIN_JOB_CISADM',
    jobControlName: 'Outage Data Anonymization – Global Compliance',
    jobControlDescription:
      'Obfuscates claim headers and line items, including statuses and adjudication outcomes.',
    lastTriggeredOn: '05/04/2025 09:30:33AM',
    obsfucationControlId: 'Outage Data Anonymization',
    obsfucationControlDescription:
      'Obfuscates claim headers and line items, including statuses and adjudication outcomes.',
  },
];

// Healthcare Data

const ELEMENT_DATA_HEALTHCARE: JobElement[] = [
  {
    jobId: 'RUN-98759',

    jobName: 'Claims Payments & Payouts - AUS ',
    jobDescription:
      'Anonymizes financial disbursements, payment references, and claim resolution info.',
    triggeredOn: '05/04/2025 09:30:33AM',
    status: 'success',
    obsfucationControlName: 'Claims Payments & Payouts - AUS',
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
  {
    jobId: 'RUN-98760',
    jobName: 'Claim Details Obfuscation - EU',
    jobDescription:
      'Obfuscates claim headers and line items, including statuses and adjudication outcomes.',
    triggeredOn: '10/04/2025 09:30:33AM',
    status: 'success',
    obsfucationControlName: 'Claim Details Obfuscation - EU',
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
    jobId: 'RUN-98761',
    jobName: 'Coverage & Benefits Subset',
    jobDescription:
      'Reduce the size of insurance coverage data and associated financial data.',
    triggeredOn: '15/04/2025 09:30:33AM',
    status: 'success',
    subsetStrategyPlanName: 'Coverage & Benefits Obfuscation - Prod',

    // obsfucationControlName: 'Coverage & Benefits Obfuscation - Prod',
    progress: 10,
    tasks: [
      {
        taskId: 'TASK-78901234',
        taskDescription: 'CopySchemaAndData',
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

        message: [{ name: 'Copy Schema And Data is Successful' }],
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

        message: [{ name: 'Create Procedures And Functions is Successful' }],
      },
      {
        taskId: 'TASK-30982345',
        taskDescription: 'CreateSubsetScript',
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

        message: [{ name: 'Create Subset Script is Successful' }],
      },
      {
        taskId: 'TASK-55678903',
        taskDescription: 'CI_ACCT-Based Data Subsetting',
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

        message: [{ name: "Subsetting completed using 'CI_ACCT' root table'" }],
      },
    ],
  },
  {
    jobId: 'RUN-98762',
    jobName: 'Subset Membership Plan Enrolments',
    jobDescription:
      'Extract enrolment details, plan types for list of accounts.',
    triggeredOn: '20/04/2025 08:11:09AM',
    status: 'success',
    subsetStrategyPlanName: 'Membership & Policy Data Subset Strategy Plan',

    // obsfucationControlName: 'Membership Plan Enrollments Obfuscation',

    progress: 10,
    tasks: [
      {
        taskId: 'TASK-78901234',
        taskDescription: 'CopySchemaAndData',
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

        message: [{ name: 'Copy Schema And Data is Successful' }],
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

        message: [{ name: 'Create Procedures And Functions is Successful' }],
      },
      {
        taskId: 'TASK-30982345',
        taskDescription: 'CreateSubsetScript',
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

        message: [{ name: 'Create Subset Script is Successful' }],
      },
      {
        taskId: 'TASK-55678903',
        taskDescription: 'CI_ACCT-Based Data Subsetting',
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

        message: [{ name: "Subsetting completed using 'CI_ACCT' root table'" }],
      },
    ],
  },
  {
    jobId: 'RUN-98763',
    jobName: 'Membership & Policy Data Obfuscation',
    subsetStrategyPlanName: 'Memebership & Policy Data Subset Strategy Plan',
    jobDescription:
      'Masks sensitive details in customer memberships, policies, and eligibility for staging.',
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
    obsfucationControlName: 'Membership & Policy Data Obfuscation',
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
        taskDescription: 'CreateSubsetScript',
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
        taskDescription: 'CI_ACCT-Based Data Subsetting',
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

        message: [{ name: "Subsetting completed using 'CI_ACCT' root table'" }],
      },

      {
        taskId: 'TASK-55678904',
        taskDescription: "ObfuscateTable-'CI_PER'",
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
        recordsProcessed: 500,
        message: [
          { name: 'FAKER applied on EMAILID column.' },
          { name: 'STARIFY applied on CITY column.' },
          { name: 'FAKER applied on ADDRESS column.' },
          { name: 'REPLACE_WITH_CONSTANT applied on LANGUAGE_CD column.' },
          { name: 'RANDOMIZE applied on POSTAL column.' },
        ],
      },

      {
        taskId: 'TASK-55678905',
        taskDescription: "ObfuscateTable-'CI_PER_ADDR_SEAS'",
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
        recordsProcessed: 5,
        message: [{ name: 'FAKER applied on  ADDRESS1 column.' }],
      },
      {
        taskId: 'TASK-55678906',
        taskDescription: "ObfuscateTable-'C1_ADDRESS'",
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
        recordsProcessed: 1400,
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
        taskId: 'TASK-55678907',
        taskDescription: "ObfuscateTable-'CI_PER_NAME'",
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
        recordsProcessed: 20,
        message: [{ name: 'FAKER applied on  FULLNAME column.' }],
      },
      {
        taskId: 'TASK-55678908',
        taskDescription: "ObfuscateTable-'CI_PER_PHONE'",
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
        recordsProcessed: 30,
        message: [{ name: 'FAKER applied on  PHONE column.' }],
      },
      {
        taskId: 'TASK-55678909',
        taskDescription: "ObfuscateTable-'CI_PER_ID'",
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
        recordsProcessed: 20,
        message: [{ name: 'FAKER applied on PER_ID_NBR column.' }],
      },
      {
        taskId: 'TASK-55678910',
        taskDescription: "ObfuscateTable-'CI_PER_CHAR'",
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
        recordsProcessed: 20,
        message: [
          { name: 'REPLACE_WITH_CONSTANT applied on CHAR_VAL column.' },
          {
            name: 'STARIFY, FAKER applied on ADHOC_CHAR_VAL column',
          },
        ],
      },
    ],
  },
  {
    jobId: 'RUN-98764',
    jobName: 'Billing Transactions - US Region',
    jobDescription:
      'Secures billing, adjustments, and payment data for performance testing.',
    triggeredOn: '25/04/2025 08:22:10AM',
    status: 'failed',
    obsfucationControlName: 'Billing Transactions - US Region',
    progress: 20,
    additionalRunIdDetails: [
      {
        jobId: 'RUN-98710',
        jobName: 'Billing Transactions - US Region',
        jobDescription:
          'Secures billing, adjustments, and payment data for performance testing.',
        triggeredOn: '03/04/2025 11:22:10AM',
        status: 'failed',
        obsfucationControlName: 'Billing Transactions - US Region',
        progress: 20,

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
    ],
    tasks: [
      {
        taskId: 'TASK-78901234',
        taskDescription: 'CopySchemaAndData',
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
        taskId: 'TASK-55678904',
        taskDescription: "ObfuscateTable-'CI_PER'",
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
        recordsProcessed: 2000,
        message: [
          {
            name: 'FAKER applied on EMAILID column. ',
          },
          { name: 'STARIFY applied on CITY column.' },
          { name: 'FAKER applied on ADDRESS column.' },
          { name: 'REPLACE_WITH_CONSTANT applied on LANGUAGE_CD column.' },
          { name: 'RANDOMIZE applied on POSTAL column.' },
        ],
      },

      {
        taskId: 'TASK-55678905',
        taskDescription: "ObfuscateTable-'CI_PER_ADDR_SEAS'",
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
        recordsProcessed: 100,
        message: [{ name: 'FAKER applied on  ADDRESS1 column.' }],
      },

      {
        taskId: 'TASK-55678906',
        taskDescription: "ObfuscateTable-'CI_PER_CONTDET'",
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
        recordsProcessed: 1500,
        message: [
          {
            name: 'FAKER applied on  PHONE column.',
          },
        ],
      },
      {
        taskId: 'TASK-55678907',
        taskDescription: "ObfuscateTable-'CI_PER_NAME'",
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
        recordsProcessed: 1200,
        message: [{ name: 'FAKER applied on  ENTITY_NAME column.' }],
      },
      {
        taskId: 'TASK-55678908',
        taskDescription: "ObfuscateTable-'CI_PER_ID'",
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
        recordsProcessed: 20,
        message: [{ name: 'FAKER applied on CI_PER_ID column.' }],
      },
      {
        taskId: 'TASK-55678909',
        taskDescription: "ObfuscateTable-'CI_PER_CHAR'",
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
        recordsProcessed: 20,
        message: [
          { name: 'REPLACE_WITH_CONSTANT applied on CHAR_VAL column.' },
          {
            name: 'STARIFY, FAKER applied on ADHOC_CHAR_VAL column',
          },
        ],
      },
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
    jobId: 'RUN-98765',
    jobName: 'Customer & Account Obfuscation',
    subsetStrategyPlanName: 'Customer & Account Data Subset Plan',
    jobDescription:
      'Obfuscates personally identifiable information (PII) in customer and account entities.',
    triggeredOn: '28/04/2025 07:33:22AM',
    status: 'failed',
    // obsfucationControlName: 'Customer & Account Obfuscation',
    progress: 10,
    tasks: [
      {
        taskId: 'TASK-78901234',
        taskDescription: 'CopySchemaAndData',
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

        message: [{ name: 'Copy Schema And Data is Successful' }],
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

        message: [{ name: 'Create Procedures And Functions is Successful' }],
      },
      {
        taskId: 'TASK-30982345',
        taskDescription: 'CreateSubsetScript',
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

        message: [{ name: 'Create Subset Script is Successful' }],
      },
      {
        taskId: 'TASK-55678903',
        taskDescription: 'CI_ACCT-Based Data Subsetting',
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

        message: [{ name: "Subsetting completed using 'CI_ACCT' root table'" }],
      },
    ],
  },
];

const ELEMENT_DATA_JOB_CONTROL_HEALTHCARE: JobDataControlElement[] = [
  {
    jobControlId: 'JC-98765',
    jobControlName: 'Customer & Account Obfuscation',
    API_NAME: 'DO_EXEC_ARCHDEV_2_SS_JOB',
    subsetControlId: 'SP-98765',
    jobControlDescription:
      'Obfuscates personally identifiable information (PII) in customer and account entities.',
    subsetPlanStrategyName: 'Membership & Policy Subset Plan',
    lastTriggeredOn: '28/04/2025 07:33:22AM',
    // obsfucationControlId: 'Customer & Account Obfuscation',
    obsfucationControlDescription:
      'Obfuscates personally identifiable information (PII) in customer and account entities.',
  },
  {
    jobControlId: 'JC-98764',
    jobControlName: 'Billing Transactions - US Region',
    subsetControlId: 'SP-98764',

    API_NAME: 'DO_EXEC_ARCHDEV_3_OBF_JOB',
    jobControlDescription:
      'Secures billing, adjustments, and payment data for performance testing.',
    // subsetPlanStrategyName: 'Billing Transactions - US Region',
    lastTriggeredOn: '25/04/2025 08:11:09AM',
    obsfucationControlId: 'Billing Transactions - US Region',
    obsfucationControlDescription:
      'Secures billing, adjustments, and payment data for performance testing.',
  },
  {
    jobControlId: 'JC-98763',
    jobControlName: 'Membership & Policy Data Obfuscation',
    subsetControlId: 'SP-98763',

    API_NAME: 'DO_EXEC_ARCHDEV_1_SS_OBF_JOB',
    jobControlDescription:
      'Masks sensitive details in customer memberships, policies, and eligibility for staging.',
    subsetPlanStrategyName: 'Membership & Policy Subset Plan',
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
    obsfucationControlId: 'Membership & Policy Data Obfuscation',
    obsfucationControlDescription:
      'Masks sensitive details in customer memberships, policies, and eligibility for staging.',
  },
  {
    jobControlId: 'JC-98762',
    jobControlName: 'Subset Membership Plan Enrolments',
    subsetControlId: 'SP-98764',

    jobControlDescription:
      'Extract enrolment details, plan types for list of accounts.',
    API_NAME: 'DO_EXEC_ARCHDEV_21_SS_JOB',
    subsetPlanStrategyName: 'Customer & Account Subset Plan',
    lastTriggeredOn: '20/04/2025 08:22:10AM',
    // obsfucationControlId: 'Membership Plan Enrollments Obfuscation',
    obsfucationControlDescription:
      'Anonymizes enrollment details, plan types, and coverage start/end dates.',
  },
  {
    jobControlId: 'JC-98761',
    subsetControlId: 'SP-98763',

    jobControlName: 'Coverage & Benefits Subset',
    jobControlDescription:
      'Reduce the size of insurance coverage data and associated financial data.',
    API_NAME: 'DO_EXEC_ARCHDEV_22_SS_JOB',
    lastTriggeredOn: '15/04/2025 09:30:33AM',
    subsetPlanStrategyName: 'Billing Transactions - US Region',
    // obsfucationControlId: 'Coverage & Benefits Obfuscation - Prod',
    obsfucationControlDescription:
      'Masks insurance coverage data, benefits, and associated financial limits.',
  },
  {
    jobControlId: 'JC-98760',
    subsetControlId: 'SP-98760',

    jobControlName: 'Claim Details Obfuscation - EU',
    jobControlDescription:
      'Obfuscates claim headers and line items, including statuses and adjudication outcomes.',
    lastTriggeredOn: '10/04/2025 09:30:33AM',
    obsfucationControlId: 'Claim Details Obfuscation - EU',
    obsfucationControlDescription:
      'Obfuscates claim headers and line items, including statuses and adjudication outcomes.',
  },
  {
    jobControlId: 'JC-98759',
    subsetControlId: 'SP-98759',

    jobControlName: 'Claims Payments & Payouts - AUS',
    jobControlDescription:
      'Anonymizes financial disbursements, payment references, and claim resolution info.',
    lastTriggeredOn: '05/04/2025 09:30:33AM',
    obsfucationControlId: 'Claims Payments & Payouts - AUS',
    obsfucationControlDescription:
      'Anonymizes financial disbursements, payment references, and claim resolution info.',
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

  getJobByAdditionalRunIdDetails(jobId: string): any {
    const jobs = this.jobsDataSubject.value;
    return jobs.find(
      (job) =>
        job.additionalRunIdDetails &&
        job.additionalRunIdDetails.some(
          (runDetail: any) => runDetail.jobId === jobId
        )
    );
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

        // Special timing for RUN-98764 to complete in 20 seconds
        const delayPerTask =
          jobId === 'RUN-98765' ||
          jobId === 'RUN-98762' ||
          jobId === 'RUN-98761'
            ? 1800
            : 400; // ~1818ms per task for 20 second total

        for (let i = 0; i < taskCount; i++) {
          const updateObservable = timer(delayPerTask * (i + 1)).pipe(
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
