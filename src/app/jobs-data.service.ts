import { Injectable } from '@angular/core';

export interface JobElement {
  jobId: string;
  jobName: any;
  jobDescription: string;
  triggeredOn: string;
  progress: number;
  status: 'success' | 'in-progress' | 'failed';
  tasks: any;
}

const ELEMENT_DATA: JobElement[] = [
  {
    jobId: 'JOB-98765',
    jobName: 'Data Masking - Customer Records',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 08:30:15',
    status: 'success',
    progress: 100,
    tasks: [
      {
        taskId: 'TASK-12345',
        taskDescription: 'Masking customer names',
        status: 'Completed',
        errorMessage: null,
        startTime: '2024-04-01 08:30:15',
        endTime: '2024-04-01 08:45:00',
      },
      {
        taskId: 'TASK-12346',
        taskDescription: 'Encrypting social security numbers',
        status: 'Failed',
        errorMessage: 'Cant upated index data',
        startTime: '2024-04-01 08:45:30',
        endTime: '2024-04-01 09:00:45',
      },
      {
        taskId: 'TASK-12347',
        taskDescription: 'Anonymizing addresses',
        status: 'In Progress',
        errorMessage: null,
        startTime: '2024-04-01 09:01:10',
        endTime: '2024-04-01 09:15:22',
      },
      {
        taskId: 'TASK-12348',
        taskDescription: 'Masking phone numbers',
        status: 'Completed',
        errorMessage: null,
        startTime: '2024-04-01 09:20:00',
        endTime: '2024-04-01 09:30:18',
      },
      {
        taskId: 'TASK-12349',
        taskDescription: 'Shuffling demographic data',
        status: 'Completed',
        errorMessage: null,
        startTime: '2024-04-01 09:35:10',
        endTime: '2024-04-01 10:15:30',
      },
      {
        taskId: 'TASK-12350',
        taskDescription: 'Substituting email addresses',
        status: 'Completed',
        errorMessage: null,
        startTime: '2024-04-01 10:20:00',
        endTime: '2024-04-01 10:25:18',
      },
    ],
  },
  {
    jobId: 'JOB-98766',
    jobName: 'Patient Data Anonymization',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 09:45:22',
    status: 'in-progress',
    progress: 45,
    tasks: [
      {
        taskId: 'TASK-12346',
        taskDescription: 'Encrypting social security numbers',
        status: 'Completed',
        errorMessage: null,
        startTime: '2024-04-01 08:45:30',
        endTime: '2024-04-01 09:00:45',
      },
    ],
  },
  {
    jobId: 'JOB-98767',
    jobName: 'Financial Records Protection',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 10:15:08',
    status: 'failed',
    progress: 50,
    tasks: [
      {
        taskId: 'TASK-12347',
        taskDescription: 'Anonymizing addresses',
        status: 'Failed',
        errorMessage: 'Invalid address format detected',
        startTime: '2024-04-01 09:01:10',
        endTime: '2024-04-01 09:15:22',
      },
    ],
  },
  {
    jobId: 'JOB-98768',
    jobName: 'Employee Data Security',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 11:20:33',
    status: 'failed',
    progress: 50,
    tasks: [
      {
        taskId: 'TASK-12349',
        taskDescription: 'Masking phone numbers',
        status: 'Completed',
        errorMessage: null,
        startTime: '2024-04-01 10:05:12',
        endTime: '2024-04-01 10:30:45',
      },
    ],
  },
  {
    jobId: 'JOB-98769',
    jobName: 'Healthcare Records Masking',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 12:05:47',
    status: 'in-progress',
    progress: 75,
    tasks: [
      {
        taskId: 'TASK-12350',
        taskDescription: 'Shuffling demographic data',
        status: 'Completed',
        errorMessage: null,
        startTime: '2024-04-01 10:35:10',
        endTime: '2024-04-01 11:15:30',
      },
    ],
  },
  {
    jobId: 'JOB-98770',
    jobName: 'Credit Card Data Protection',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 13:30:12',
    status: 'failed',
    progress: 0,
    tasks: [
      {
        taskId: 'TASK-12351',
        taskDescription: 'Substituting email addresses',
        status: 'Failed',
        errorMessage: 'Network connectivity issue',
        startTime: '2024-04-01 11:20:00',
        endTime: '2024-04-01 11:25:18',
      },
    ],
  },
  {
    jobId: 'JOB-98771',
    jobName: 'Social Security Number Masking',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 14:15:28',
    status: 'in-progress',
    progress: 30,
    tasks: [
      {
        taskId: 'TASK-12352',
        taskDescription: 'Redacting medical record numbers',
        status: 'Completed',
        errorMessage: null,
        startTime: '2024-04-01 11:30:00',
        endTime: '2024-04-01 12:15:45',
      },
    ],
  },
  {
    jobId: 'JOB-98772',
    jobName: 'Email Address Protection',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 15:40:55',
    status: 'failed',
    progress: 50,
    tasks: [
      {
        taskId: 'TASK-12353',
        taskDescription: 'Obscuring birth dates',
        status: 'Pending',
        errorMessage: null,
        startTime: null,
        endTime: null,
      },
    ],
  },
  {
    jobId: 'JOB-98773',
    jobName: 'Phone Number Anonymization',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 16:25:19',
    status: 'success',
    progress: 100,
    tasks: [
      {
        taskId: 'TASK-12354',
        taskDescription: 'Generalizing location data',
        status: 'Completed',
        errorMessage: null,
        startTime: '2024-04-01 13:00:10',
        endTime: '2024-04-01 13:45:30',
      },
    ],
  },
  {
    jobId: 'JOB-98774',
    jobName: 'Address Data Security',
    jobDescription: 'DIH UHG Health Care Production 001 data set ',
    triggeredOn: '2024-04-01 17:10:42',
    status: 'failed',
    progress: 50,
    tasks: [
      {
        taskId: 'TASK-12354',
        taskDescription: 'Generalizing location data',
        status: 'Completed',
        errorMessage: null,
        startTime: '2024-04-01 13:00:10',
        endTime: '2024-04-01 13:45:30',
      },
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class JobsDataService {
  private jobsData: JobElement[] = ELEMENT_DATA;

  constructor() {}

  getJobById(jobId: string): JobElement | undefined {
    return this.jobsData.find((job) => job.jobId === jobId);
  }

  getAllJobs(): JobElement[] {
    return this.jobsData;
  }
}
