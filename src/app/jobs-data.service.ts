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
  obsfucationControlDescription: string;
}

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
        taskDescription: "MaskTable-'CI_PER_ADDR'",
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
          'Financial Data Masking – Utility Systems `SQL Error: ORA-00904: "EMAILID": invalid identifier`',
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
          'Person Entity Anonymization – Pre-Prod `SQL Error: ORA-00904: "EMAILID": invalid identifier`',
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
    jobControlName: 'Utility Account Obfuscation – Non-Prod',
    jobControlDescription:
      'Obfuscate utility accounts for non-production environments.',
    lastTriggeredOn: '29/04/2025 07:23:12AM',
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

@Injectable({
  providedIn: 'root',
})
export class JobsDataService {
  private apiUrl = 'https://do-be.demo.riaproducts.com/api/dih/run-job';

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
      const endDate = new Date(startDate.getTime() + 4000);
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
    }, 300);

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
      const updateObservable = timer(400 * (i + 1)).pipe(
        map(() => this.updateSingleTaskStatus(jobId, i))
      );
      updateObservables.push(updateObservable);
    }

    return concat(...updateObservables);
  }

  // Move this method to job service where you will have all the REST API
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
